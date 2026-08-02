'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { FIX, fixtureFamilies } from '@/content';
import ProductCard from './ProductCard';

/** Filtro de productos por familia — misma UX que el de proyectos. */
export default function ProductFilters() {
  const t = useTranslations('products');
  const families = fixtureFamilies();
  const [fam, setFam] = useState('all');

  const list = useMemo(
    () => (fam === 'all' ? FIX : FIX.filter((f) => f.family === fam)),
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
            {families.map((f) => (
              <button
                key={f}
                className={fam === f ? 'on' : ''}
                onClick={() => setFam(f)}
              >
                {f}
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
