import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(progress, { stiffness: 200, damping: 30 });
  
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setProgress(isNaN(scrolled) ? 0 : scrolled);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9998] origin-left"
      style={{
        scaleX: spring,
        background: 'linear-gradient(90deg, #7c3aed, #2dd4bf)',
        boxShadow: '0 0 8px rgba(139,92,246,0.6)',
      }}
    />
  );
}
