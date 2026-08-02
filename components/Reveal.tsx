'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Reveal de scroll · v2. UN SOLO IntersectionObserver para los tres gestos
 * (.mask / .rise / .zin), threshold .12, rootMargin -8%, y `unobserve` después
 * de disparar: se anima una vez, no en cada scroll. Re-observa al navegar.
 */
export default function Reveal() {
  const pathname = usePathname();
  const ioRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    ioRef.current = io;
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      document
        .querySelectorAll('.mask:not(.in), .rise:not(.in), .zin:not(.in)')
        .forEach((el) => ioRef.current?.observe(el));
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
