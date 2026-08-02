'use client';

import { useState, useEffect } from 'react';
import { VERTICALS } from '@/content';

/** Nombres de verticales que rotan en el hero (uno resaltado a la vez). v2. */
export default function HeroVerticals() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setActive((v) => (v + 1) % VERTICALS.length),
      2100
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div className="verts rise d2">
      {VERTICALS.map((v, i) => (
        <span key={v.id} className={i === active ? 'on' : ''}>
          {v.title}
        </span>
      ))}
    </div>
  );
}
