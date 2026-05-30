'use client';

import { useRef, useMemo, useCallback, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Shared scene state (module-level, read in useFrame)               */
/* ------------------------------------------------------------------ */
export const sceneState = {
  mouseNDC: new THREE.Vector2(0, 0),
  mouseWorld: new THREE.Vector3(0, 0, 0),
  clickPoint: null as THREE.Vector3 | null,
  clickTime: 0,
  scrollY: 0,
};

const NUM_PARTICLES = 2500;
const PARTICLE_ATTRACT_RADIUS = 2.5;
const PARTICLE_ATTRACT_FORCE = 0.015;
const PARTICLE_RETURN_FORCE = 0.02;
const RIPPLE_DURATION = 2.5;
const RIPPLE_SPEED = 4;

/* ------------------------------------------------------------------ */
/*  Shader for iridescent crystal                                      */
/* ------------------------------------------------------------------ */
const crystalVertexShader = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;
varying float vFresnel;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vViewPosition = -mvPosition.xyz;
  vUv = uv;
  vFresnel = pow(1.0 - abs(dot(normalize(vViewPosition), vNormal)), 2.5);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const crystalFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;
varying float vFresnel;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  float mouseInfluence = length(uMouse) * 0.25;
  float hue = fract(vFresnel * 1.8 + vUv.x * 0.6 + vUv.y * 0.4 + uTime * 0.12 + mouseInfluence);
  vec3 iridescent = hsv2rgb(vec3(hue, 0.85, 1.0));

  vec3 base = vec3(0.92, 0.92, 1.0);
  vec3 color = mix(base * 0.25, iridescent, vFresnel * 0.85 + 0.15);

  color += iridescent * vFresnel * 0.6;

  float innerGlow = smoothstep(0.8, 0.0, length(vUv - 0.5));
  color += iridescent * innerGlow * 0.12;

  float alpha = 0.72 + vFresnel * 0.28;
  gl_FragColor = vec4(color, alpha);
}
`;

/* ------------------------------------------------------------------ */
/*  Iridescent Crystal                                                 */
/* ------------------------------------------------------------------ */
const crystalUniforms = {
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0, 0) },
};

function IridescentCrystal() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const rotRef = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    rotRef.current.x += delta * 0.18;
    rotRef.current.y += delta * 0.25;

    const mx = sceneState.mouseNDC.x * 0.45;
    const my = sceneState.mouseNDC.y * 0.45;

    meshRef.current.rotation.x = rotRef.current.x + my;
    meshRef.current.rotation.y = rotRef.current.y + mx;

    crystalUniforms.uTime.value += delta;
    crystalUniforms.uMouse.value.set(sceneState.mouseNDC.x, sceneState.mouseNDC.y);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1.6, 0]} />
        <shaderMaterial
          vertexShader={crystalVertexShader}
          fragmentShader={crystalFragmentShader}
          uniforms={crystalUniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.08} />
      </mesh>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/*  Orbiting Objects                                                   */
/* ------------------------------------------------------------------ */
interface OrbitDef {
  geo: 'sphere' | 'box' | 'torus' | 'torusKnot' | 'octahedron' | 'icosahedron' | 'dodecahedron' | 'ring';
  color: string;
  emissive?: string;
  wireframe?: boolean;
  transparent?: boolean;
  opacity?: number;
  orbitRadius: number;
  speed: number;
  size: number;
  phase: number;
  yAmp: number;
  yFreq: number;
  selfRotSpeed: number;
}

const orbitDefs: OrbitDef[] = [
  { geo: 'sphere', color: '#8b5cf6', emissive: '#8b5cf6', orbitRadius: 3.2, speed: 0.45, size: 0.14, phase: 0, yAmp: 0.6, yFreq: 1.2, selfRotSpeed: 2 },
  { geo: 'box', color: '#06b6d4', wireframe: true, orbitRadius: 3.8, speed: -0.32, size: 0.18, phase: 0.9, yAmp: 0.4, yFreq: 0.8, selfRotSpeed: 3 },
  { geo: 'torus', color: '#ec4899', transparent: true, opacity: 0.5, orbitRadius: 4.3, speed: 0.38, size: 0.18, phase: 1.8, yAmp: 0.7, yFreq: 1.5, selfRotSpeed: 2.5 },
  { geo: 'torusKnot', color: '#a855f7', emissive: '#a855f7', orbitRadius: 4.8, speed: -0.22, size: 0.12, phase: 2.7, yAmp: 0.9, yFreq: 0.6, selfRotSpeed: 1.8 },
  { geo: 'octahedron', color: '#06b6d4', emissive: '#06b6d4', orbitRadius: 3.5, speed: 0.55, size: 0.16, phase: 3.6, yAmp: 0.3, yFreq: 1.1, selfRotSpeed: 4 },
  { geo: 'icosahedron', color: '#ec4899', wireframe: true, orbitRadius: 5.2, speed: 0.18, size: 0.22, phase: 4.5, yAmp: 1.0, yFreq: 0.7, selfRotSpeed: 2 },
  { geo: 'sphere', color: '#8b5cf6', transparent: true, opacity: 0.35, orbitRadius: 2.9, speed: -0.48, size: 0.11, phase: 5.4, yAmp: 0.5, yFreq: 1.4, selfRotSpeed: 3.5 },
  { geo: 'dodecahedron', color: '#06b6d4', emissive: '#06b6d4', orbitRadius: 5.6, speed: 0.14, size: 0.17, phase: 0.5, yAmp: 0.8, yFreq: 0.9, selfRotSpeed: 1.5 },
  { geo: 'box', color: '#ec4899', transparent: true, opacity: 0.45, orbitRadius: 4.0, speed: -0.4, size: 0.15, phase: 1.4, yAmp: 0.6, yFreq: 1.3, selfRotSpeed: 2.8 },
  { geo: 'ring', color: '#c084fc', wireframe: true, orbitRadius: 3.0, speed: 0.6, size: 0.2, phase: 2.3, yAmp: 0.45, yFreq: 1.0, selfRotSpeed: 1.2 },
];

function OrbitingObject({ def }: { def: OrbitDef }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const angleRef = useRef(def.phase);

  useFrame((_, delta) => {
    angleRef.current += def.speed * delta;
    const a = angleRef.current;
    meshRef.current.position.x = Math.cos(a) * def.orbitRadius;
    meshRef.current.position.z = Math.sin(a) * def.orbitRadius;
    meshRef.current.position.y = Math.sin(a * def.yFreq) * def.yAmp;

    meshRef.current.rotation.x += delta * def.selfRotSpeed;
    meshRef.current.rotation.y += delta * def.selfRotSpeed * 0.7;
  });

  const renderGeometry = () => {
    switch (def.geo) {
      case 'sphere':
        return <sphereGeometry args={[def.size, 16, 16]} />;
      case 'box':
        return <boxGeometry args={[def.size * 1.4, def.size * 1.4, def.size * 1.4]} />;
      case 'torus':
        return <torusGeometry args={[def.size, def.size * 0.35, 16, 32]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[def.size, def.size * 0.3, 64, 8]} />;
      case 'octahedron':
        return <octahedronGeometry args={[def.size, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[def.size, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[def.size, 0]} />;
      case 'ring':
        return <torusGeometry args={[def.size * 1.2, def.size * 0.12, 16, 48]} />;
    }
  };

  const materialProps: Record<string, unknown> = {
    color: def.color,
    wireframe: def.wireframe ?? false,
    transparent: def.transparent ?? false,
    opacity: def.opacity ?? 1,
    emissive: def.emissive ?? def.color,
    emissiveIntensity: def.emissive ? 0.6 : 0.15,
    roughness: 0.3,
    metalness: 0.7,
    toneMapped: false,
  };

  return (
    <mesh ref={meshRef} castShadow>
      {renderGeometry()}
      <meshStandardMaterial {...materialProps} />
    </mesh>
  );
}

function OrbitingObjects() {
  return (
    <group>
      {orbitDefs.map((def, i) => (
        <OrbitingObject key={i} def={def} />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Particle Field (galaxy nebula)                                     */
/* ------------------------------------------------------------------ */
const PALETTE = [
  new THREE.Color('#8b5cf6'),
  new THREE.Color('#06b6d4'),
  new THREE.Color('#ec4899'),
  new THREE.Color('#c084fc'),
  new THREE.Color('#22d3ee'),
];

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const { camera } = useThree();
  useEffect(() => { cameraRef.current = camera; });

  // Initialize particle data in refs
  const particleDataRef = useRef<{
    positions: Float32Array;
    colors: Float32Array;
    originalPositions: Float32Array;
    geometry: THREE.BufferGeometry;
  } | null>(null);

  if (!particleDataRef.current) {
    const positions = new Float32Array(NUM_PARTICLES * 3);
    const colors = new Float32Array(NUM_PARTICLES * 3);
    const originalPositions = new Float32Array(NUM_PARTICLES * 3);

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const i3 = i * 3;
      const armCount = 3;
      const arm = Math.floor(Math.random() * armCount);
      const armAngle = (arm / armCount) * Math.PI * 2;
      const dist = Math.random() * 9 + 1.5;
      const spiralAngle = dist * 0.35 + armAngle;
      const spread = (Math.random() - 0.5) * (dist * 0.5 + 0.5);

      positions[i3] = Math.cos(spiralAngle) * dist + spread * 0.5;
      positions[i3 + 1] = (Math.random() - 0.5) * 2.5;
      positions[i3 + 2] = Math.sin(spiralAngle) * dist + spread * 0.5;

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    particleDataRef.current = {
      positions,
      colors,
      originalPositions,
      geometry: geo,
    };
  }

  useFrame((state) => {
    const data = particleDataRef.current;
    if (!data || !cameraRef.current) return;

    const geo = data.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array as Float32Array;
    const rc = raycasterRef.current;
    const cam = cameraRef.current;

    // compute mouse world position
    rc.setFromCamera(sceneState.mouseNDC, cam);
    const target = new THREE.Vector3();
    const hit = rc.ray.intersectPlane(planeRef.current, target);
    if (hit) {
      sceneState.mouseWorld.copy(target);
    }

    // click ripple
    const elapsed = state.clock.elapsedTime - sceneState.clickTime;
    const hasRipple = sceneState.clickPoint !== null && elapsed < RIPPLE_DURATION;

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const i3 = i * 3;
      let x = arr[i3];
      let y = arr[i3 + 1];
      let z = arr[i3 + 2];

      // mouse attraction
      const dx = x - sceneState.mouseWorld.x;
      const dy = y - sceneState.mouseWorld.y;
      const dz = z - sceneState.mouseWorld.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < PARTICLE_ATTRACT_RADIUS && dist > 0.01) {
        const force = (PARTICLE_ATTRACT_RADIUS - dist) / PARTICLE_ATTRACT_RADIUS * PARTICLE_ATTRACT_FORCE;
        x -= dx * force;
        y -= dy * force;
        z -= dz * force;
      }

      // ripple scatter
      if (hasRipple && sceneState.clickPoint) {
        const cx = x - sceneState.clickPoint.x;
        const cy = y - sceneState.clickPoint.y;
        const cz = z - sceneState.clickPoint.z;
        const cd = Math.sqrt(cx * cx + cy * cy + cz * cz);
        const rippleR = elapsed * RIPPLE_SPEED;
        const rippleW = 2.0;
        const rippleForce = Math.exp(-((cd - rippleR) ** 2) / rippleW) * Math.max(0, 1 - elapsed / RIPPLE_DURATION) * 0.6;
        if (cd > 0.01) {
          x += (cx / cd) * rippleForce;
          y += (cy / cd) * rippleForce;
          z += (cz / cd) * rippleForce;
        }
      }

      // spring return
      x += (data.originalPositions[i3] - x) * PARTICLE_RETURN_FORCE;
      y += (data.originalPositions[i3 + 1] - y) * PARTICLE_RETURN_FORCE;
      z += (data.originalPositions[i3 + 2] - z) * PARTICLE_RETURN_FORCE;

      arr[i3] = x;
      arr[i3 + 1] = y;
      arr[i3 + 2] = z;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={particleDataRef.current!.geometry}>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Orbiting Lights                                                    */
/* ------------------------------------------------------------------ */
function SceneLights() {
  const light1 = useRef<THREE.PointLight>(null!);
  const light2 = useRef<THREE.PointLight>(null!);
  const light3 = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    light1.current.position.set(Math.cos(t * 0.4) * 5, Math.sin(t * 0.3) * 3, Math.sin(t * 0.4) * 5);
    light2.current.position.set(Math.cos(t * 0.5 + 2) * 6, Math.sin(t * 0.35 + 1) * 2.5, Math.sin(t * 0.5 + 2) * 6);
    light3.current.position.set(Math.cos(t * 0.3 + 4) * 4.5, Math.sin(t * 0.25 + 3) * 3.5, Math.sin(t * 0.3 + 4) * 4.5);
  });

  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight ref={light1} color="#8b5cf6" intensity={3} distance={15} />
      <pointLight ref={light2} color="#06b6d4" intensity={2.5} distance={15} />
      <pointLight ref={light3} color="#ec4899" intensity={2.5} distance={15} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Camera controller (scroll zoom + mouse parallax)                   */
/* ------------------------------------------------------------------ */
function CameraController() {
  const cameraRef = useRef<THREE.Camera | null>(null);
  const targetZoom = useRef(7);
  const { camera } = useThree();
  useEffect(() => { cameraRef.current = camera; });

  useFrame(() => {
    if (!cameraRef.current) return;
    const scroll = sceneState.scrollY;
    const zoomTarget = Math.max(3, 7 - scroll * 0.003);
    targetZoom.current += (zoomTarget - targetZoom.current) * 0.05;
    cameraRef.current.position.z = targetZoom.current;
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Mouse & click tracking plane                                      */
/* ------------------------------------------------------------------ */
function InteractionPlane() {
  const cameraRef = useRef<THREE.Camera | null>(null);
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const raycasterRef = useRef(new THREE.Raycaster());
  const { camera } = useThree();
  useEffect(() => { cameraRef.current = camera; });

  const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const nx = ((e.nativeEvent.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((e.nativeEvent.clientY - rect.top) / rect.height) * 2 + 1;
    sceneState.mouseNDC.set(nx, ny);
  }, []);

  const handleClick = useCallback(() => {
    const cam = cameraRef.current;
    if (!cam) return;
    raycasterRef.current.setFromCamera(sceneState.mouseNDC, cam);
    const target = new THREE.Vector3();
    const hit = raycasterRef.current.ray.intersectPlane(planeRef.current, target);
    if (hit) {
      sceneState.clickPoint = target.clone();
      sceneState.clickTime = Date.now() / 1000;
    }
  }, []);

  return (
    <mesh
      position={[0, 0, -1]}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      visible={false}
    >
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Chromatic aberration offset constant                               */
/* ------------------------------------------------------------------ */
const CHROMA_OFFSET = new THREE.Vector2(0.001, 0.001);

/* ------------------------------------------------------------------ */
/*  Scene content (all 3D objects + post-processing)                   */
/* ------------------------------------------------------------------ */
function SceneContent() {
  return (
    <>
      <CameraController />
      <SceneLights />
      <InteractionPlane />
      <IridescentCrystal />
      <OrbitingObjects />
      <ParticleField />
      <EffectComposer>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={CHROMA_OFFSET}
          radialModulation
          modulationOffset={0.5}
        />
        <Vignette
          blendFunction={BlendFunction.NORMAL}
          offset={0.3}
          darkness={0.7}
        />
      </EffectComposer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Fallback loader                                                    */
/* ------------------------------------------------------------------ */
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported Canvas wrapper                                            */
/* ------------------------------------------------------------------ */
export default function Hero3DScene() {
  const handleCreated = useCallback((state: { gl: THREE.WebGLRenderer }) => {
    state.gl.setClearColor('#0a0a0f', 1);
  }, []);

  // Track scroll
  useEffect(() => {
    const onScroll = () => {
      sceneState.scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Clear expired click events
  useEffect(() => {
    const id = setInterval(() => {
      if (sceneState.clickPoint && (Date.now() / 1000) - sceneState.clickTime > RIPPLE_DURATION) {
        sceneState.clickPoint = null;
      }
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
          onCreated={handleCreated}
          style={{ background: '#0a0a0f' }}
        >
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}
