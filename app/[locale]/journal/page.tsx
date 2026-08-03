import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import MaskLines from '@/components/MaskLines';
import BuildNote from '@/components/BuildNote';
import { social } from '@/lib/metadata';
import { ARTICLES, isTodo, SITE_NAME } from '@/content';

/**
 * JOURNAL · v2 — SOLO EN, fuera del sistema de idiomas.
 * Solo existe /journal (EN). Cualquier /es|pt|ru/journal → 404 (guard abajo).
 * Los strings van en inglés hardcodeados, no pasan por el catálogo i18n.
 * Los artículos se escriben en fase 3.
 */
export const metadata: Metadata = social({
  title: `Journal — ${SITE_NAME}`,
  description:
    'Everything we know about light. Thirty-three years of specifying and commissioning, written down — the questions architects and interior designers actually ask us.',
  path: '/journal'
});

export default async function JournalPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  // El Journal es EN-only: no hay /es, /pt ni /ru.
  if (locale !== 'en') notFound();
  setRequestLocale(locale);

  return (
    <div>
      <header className="mast">
        <div className="micro rise">Journal</div>
        <h1>
          <MaskLines lines={['Everything we', 'know about light.']} />
        </h1>
        <div className="mast-intro">
          <p className="lead rise d1">
            Thirty-three years of specifying, commissioning and occasionally
            getting it wrong — written down. No product launches, no trend
            reports. Just the questions architects actually ask us.
          </p>
          <div className="note rise d2">
            Published in English only. Every article is anchored to the question
            people type into search or ask an AI assistant.
          </div>
        </div>
      </header>

      <section className="sec-s">
        <div className="jr">
          {ARTICLES.map((a) => (
            // Journal fuera del sistema de idiomas: <a> plano, siempre /journal.
            <a className="jrow rise" key={a.slug} href={`/journal/${a.slug}`}>
              <span>
                <h4>{a.title}</h4>
                <span className="q">
                  <b>Answers</b>
                  {a.question}
                </span>
              </span>
              <span className="t">
                {a.tag}
                <i>{a.author}</i>
              </span>
              <span className="rd">{isTodo(a.read) ? '' : (a.read as string)}</span>
            </a>
          ))}
        </div>
        <BuildNote title="Journal · fase 3" style={{ marginTop: 'clamp(36px,5vh,60px)' }}>
          Backlog definido y priorizado por intención comercial. Se escribe
          después del launch. Sin <code>/es/</code>, <code>/pt/</code> ni{' '}
          <code>/ru/</code> — evita duplicados y traducciones que ensucian la
          autoridad del dominio.
        </BuildNote>
      </section>
    </div>
  );
}
