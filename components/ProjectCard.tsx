'use client';

import { Link } from '@/i18n/navigation';
import {
  isTodo,
  typologyLabel,
  statusLabel,
  photoUrl,
  type Project
} from '@/content';
import SmartImage from './SmartImage';
import ProjectName from './ProjectName';

/**
 * Tarjeta de proyecto · v3. Enlaza a la página propia e indexable
 * /proyectos/[slug]. El badge usa la etiqueta de estado (taxonomía, en español).
 */
export default function ProjectCard({ p }: { p: Project }) {
  const badge =
    p.sta === 'progress' ? (
      <span className="badge pr">{statusLabel(p.sta)}</span>
    ) : p.sta === 'concept' ? (
      <span className="badge co">{statusLabel(p.sta)}</span>
    ) : null;

  const dataL = isTodo(p.name) ? p.hint || '' : (p.name as string);
  const place = isTodo(p.place) ? p.hint || '—' : (p.place as string);
  const partnerSuffix = isTodo(p.partner) ? '' : ' · ' + p.partner;

  return (
    <Link className="card rise" href={`/proyectos/${p.id}`}>
      <div className="iw zin">
        {p.ph > 0 && <SmartImage src={photoUrl(p, 1)} cover />}
        <div className="ph" data-l={dataL}></div>
        {badge}
      </div>
      <div className="meta">
        <span className="c">
          {typologyLabel(p.typ)}
          {partnerSuffix}
        </span>
        <h4>
          <ProjectName p={p} />
        </h4>
        <span className="loc">{place}</span>
      </div>
    </Link>
  );
}
