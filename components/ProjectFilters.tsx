'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  PROJECTS,
  TYPOLOGIES,
  LOCATIONS,
  STATUSES,
  type Project
} from '@/content';
import ProjectCard from './ProjectCard';

export type Filters = { typ: string; loc: string; sta: string };

function FilterRow({
  legend,
  list,
  active,
  onPick
}: {
  legend: string;
  list: Array<[string, string]>;
  active: string;
  onPick: (k: string) => void;
}) {
  return (
    <div className="frow">
      <span className="fl">{legend}</span>
      <div className="fset">
        {list.map(([k, l]) => (
          <button
            key={k}
            className={k === active ? 'on' : ''}
            onClick={() => onPick(k)}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProjectFilters({
  initial
}: {
  // Estado inicial desde el query de la página (server), para que los redirects
  // del dominio viejo (/proyectos?typ=residences) filtren y el grid quede en el
  // HTML del servidor (indexable).
  initial?: Filters;
}) {
  const t = useTranslations('projects');
  const [f, setF] = useState<Filters>(
    initial ?? { typ: 'all', loc: 'all', sta: 'all' }
  );
  const [dens, setDens] = useState<'2' | '4'>('4');

  const list = useMemo(
    () =>
      PROJECTS.filter(
        (p: Project) =>
          (f.typ === 'all' || p.typ === f.typ) &&
          (f.loc === 'all' || p.loc === f.loc) &&
          (f.sta === 'all' || p.sta === f.sta)
      ),
    [f]
  );

  const count =
    list.length === 1
      ? t('countOne', { count: list.length })
      : t('countOther', { count: list.length });

  return (
    <>
      <div className="filters">
        <FilterRow
          legend={t('typology')}
          list={TYPOLOGIES}
          active={f.typ}
          onPick={(k) => setF((s) => ({ ...s, typ: k }))}
        />
        <FilterRow
          legend={t('location')}
          list={LOCATIONS}
          active={f.loc}
          onPick={(k) => setF((s) => ({ ...s, loc: k }))}
        />
        <FilterRow
          legend={t('status')}
          list={STATUSES}
          active={f.sta}
          onPick={(k) => setF((s) => ({ ...s, sta: k }))}
        />
      </div>

      <div className="fbar">
        <div className="cnt">{count}</div>
        <div className="dens">
          <span>{t('density')}</span>
          <button className={dens === '2' ? 'on' : ''} onClick={() => setDens('2')}>
            2
          </button>
          <button className={dens === '4' ? 'on' : ''} onClick={() => setDens('4')}>
            4
          </button>
        </div>
      </div>

      <div className="pgrid" data-d={dens}>
        {list.length === 0 ? (
          <div className="empty">{t('empty')}</div>
        ) : (
          list.map((p) => <ProjectCard key={p.id} p={p} />)
        )}
      </div>
    </>
  );
}
