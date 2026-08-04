'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { FIX, fixtureGroups } from '@/content';
import ProductCard from './ProductCard';

/** Filtro de productos por grupo (§B.5: tres facetas) — misma UX que proyectos. */
export default function ProductFilters() {
  const t = useTranslations('products');
  const groups = fixtureGroups();
  const [fam, setFam] = useState('all');

  const list = useMemo(
    () => (fam === 'all' ? FIX : FIX.filter((f) => f.group === fam)),
    [fam]
  );
  const count =
    list.length === 1
      ? t('countOne', { count: list.length })
      : t('countOther', { count: list.length });

  return (
    <>
      <div className="filters">
        <div className="frow">
          <span className="fl">{t('family')}</span>
          <div className="fset">
            <button
              className={fam === 'all' ? 'on' : ''}
              onClick={() => setFam('all')}
            >
              {t('all')}
            </button>
            {groups.map((g) => (
              <button
                key={g}
                className={fam === g ? 'on' : ''}
                onClick={() => setFam(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fbar">
        <div className="cnt">{count}</div>
      </div>

      <div className="lgrid">
        {list.map((f) => (
          <ProductCard key={f.id} f={f} />
        ))}
      </div>
    </>
  );
}
