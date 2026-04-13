import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const animate = () => {
      // Smooth follow with lerp
      current.current.x += (pos.current.x - current.current.x) * 0.08;
      current.current.y += (pos.current.y - current.current.y) * 0.08;
      el.style.transform = `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-0"
      style={{
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
