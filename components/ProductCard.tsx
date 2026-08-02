'use client';

import { Link } from '@/i18n/navigation';
import { DRAW, type Fixture } from '@/content';

/** Tarjeta de luminaria · enlaza a la página propia /products/[slug]. */
export default function ProductCard({ f }: { f: Fixture }) {
  return (
    <Link className="lc rise" href={`/products/${f.id}`}>
      <div className="st" dangerouslySetInnerHTML={{ __html: DRAW[f.draw] }} />
      <div className="b">
        <span className="fam">{f.family}</span>
        <h4>{f.name}</h4>
        <span className="dia">{f.diameter}</span>
        <p>{f.blurb}</p>
      </div>
    </Link>
  );
}
