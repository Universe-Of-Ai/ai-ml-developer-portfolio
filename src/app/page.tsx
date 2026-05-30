'use client';

import { useState } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import WorkspaceButton from '@/components/workspace/WorkspaceButton';
import WorkspaceOverlay from '@/components/workspace/WorkspaceOverlay';

export default function HomePage() {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  return (
    <main className="relative overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <WorkspaceButton onClick={() => setWorkspaceOpen(true)} />
      <WorkspaceOverlay isOpen={workspaceOpen} onClose={() => setWorkspaceOpen(false)} />
    </main>
  );
}
