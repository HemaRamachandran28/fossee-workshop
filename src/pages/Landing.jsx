import Hero from '../components/sections/Hero.jsx';
import Features from '../components/sections/Features.jsx';
import Workshops from '../components/sections/Workshops.jsx';
import Stats from '../components/sections/Stats.jsx';
import HowItWorks from '../components/sections/HowItWorks.jsx';
import Testimonials from '../components/sections/Testimonials.jsx';
import CTA from '../components/sections/CTA.jsx';
import Footer from '../components/layout/Footer.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import { useEffect } from 'react';

export default function Landing() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="relative min-h-screen bg-ink-950 overflow-x-hidden">
      {/* Persistent ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <Workshops />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
