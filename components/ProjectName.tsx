'use client';

import { useTranslations } from 'next-intl';
import { isTodo, type Project } from '@/content';

/**
 * Nombre de proyecto. Si está pendiente (TODO) se muestra en rojo (.flag).
 * Replica nm() de la maqueta v2. La pista interna (hint) se muestra aparte.
 */
export default function ProjectName({ p }: { p: Project }) {
  const t = useTranslations('project');
  if (!isTodo(p.name)) return <>{p.name}</>;
  return <span className="flag">{t('nameTBD')}</span>;
}
