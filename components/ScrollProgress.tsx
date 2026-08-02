'use client';

import { useEffect, useRef } from 'react';

/** Barra de progreso de scroll (.prog). Global. Replica el #prog de la maqueta. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (ref.current) ref.current.style.width = (pct || 0) + '%';
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return <div className="prog" ref={ref} />;
}
