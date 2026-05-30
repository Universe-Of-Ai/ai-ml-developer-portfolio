'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize nodes
    const nodeCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    nodesRef.current = nodes;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const connectionDistance = 180;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // Update and draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse repulsion
        if (mouseRef.current) {
          const dx = node.x - mouseRef.current.x;
          const dy = node.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150 * 0.02;
            node.vx += dx * force;
            node.vy += dy * force;
          }
        }

        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Pulse effect
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${node.opacity * pulse})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3 * pulse, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 3 * pulse
        );
        gradient.addColorStop(0, `rgba(6, 182, 212, ${0.15 * pulse})`);
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.25;
            const pulseA = Math.sin(time * 2 + nodes[i].pulsePhase) * 0.3 + 0.7;
            const pulseB = Math.sin(time * 2 + nodes[j].pulsePhase) * 0.3 + 0.7;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * pulseA * pulseB})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      if (mouseRef.current) {
        for (const node of nodes) {
          const dx = node.x - mouseRef.current.x;
          const dy = node.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const opacity = (1 - dist / 200) * 0.4;
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}
