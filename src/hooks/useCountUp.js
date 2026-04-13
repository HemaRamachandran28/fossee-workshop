import { useState, useEffect, useRef } from 'react';

export function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!start) return;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
      else setCount(target);
    };

    raf.current = requestAnimationFrame(step);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [target, duration, start]);

  return count;
}

export function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
