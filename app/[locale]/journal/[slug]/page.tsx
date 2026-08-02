import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { articleGraph } from '@/lib/structuredData';
import {
  ARTICLES,
  getArticle,
  isTodo,
  isArticleReady,
  displayValue,
  SITE_NAME,
  type Article
} from '@/content';

/**
 * ARTÍCULO DEL JOURNAL · molde AEO — SOLO EN, fuera del sistema de idiomas.
 * Los tres seeds tienen la estructura llena y el contenido en TODO: se
 * escriben editando content/articles.ts, sin tocar este componente.
 */
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: `${a.title} — ${SITE_NAME}`,
    description: isTodo(a.answer) ? a.question : (a.answer as string),
    // Seeds sin contenido → noindex (tampoco entran al sitemap).
    robots: isArticleReady(a) ? undefined : { index: false, follow: true }
  };
}

/** Placeholder rojo de contenido pendiente (mismo criterio que los proyectos). */
function Pending({ children }: { children: string }) {
  return <span className="flag">{children}</span>;
}

export default async function ArticlePage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  // Journal EN-only: no hay /es, /pt ni /ru.
  if (locale !== 'en') notFound();
  setRequestLocale(locale);

  const a: Article | undefined = getArticle(slug);
  if (!a) notFound();

  const read = displayValue(a.read);
  const published = displayValue(a.published);
  const takeaways = displayValue(a.takeaways);
  const table = displayValue(a.table);
  const credentials = displayValue(a.credentials);

  return (
    <article className="article">
      <JsonLd data={articleGraph(a)} />

      <header className="arthead">
        <a className="back" href="/journal">
          ← Journal
        </a>
        <div className="micro">{a.tag}</div>
        <h1>{a.title}</h1>
        <div className="artmeta">
          <span>By {a.author}</span>
          <span>Reviewed by {a.reviewedBy}</span>
          {read && <span>{read} read</span>}
          {published && <span>{published}</span>}
        </div>
      </header>

      {/* Answer capsule — el bloque que la IA levanta */}
      <section className="capsule">
        <div className="micro">Answer</div>
        <p>
          {isTodo(a.answer) ? (
            <Pending>
              Answer capsule — 2 to 3 self-contained sentences that answer the
              question directly. This is the block an AI assistant lifts.
            </Pending>
          ) : (
            (a.answer as string)
          )}
        </p>
      </section>

      {/* Key takeaways — tres */}
      <section className="takeaways">
        <div className="micro">Key takeaways</div>
        {takeaways ? (
          <ul>
            {takeaways.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        ) : (
          <ul>
            <li>
              <Pending>Takeaway 1 — the single most useful line.</Pending>
            </li>
            <li>
              <Pending>Takeaway 2.</Pending>
            </li>
            <li>
              <Pending>Takeaway 3.</Pending>
            </li>
          </ul>
        )}
      </section>

      {/* Cuerpo en secciones · subheaders-afirmación */}
      <div className="artbody">
        {a.sections.map((s, i) => (
          <section className="artsec" key={i}>
            <h3>
              {isTodo(s.heading) ? (
                <Pending>
                  Section heading — write it as an assertion, not a label.
                </Pending>
              ) : (
                (s.heading as string)
              )}
            </h3>
            <p>
              {isTodo(s.body) ? (
                <Pending>
                  Section body — needs the technical data we don’t have yet.
                </Pending>
              ) : (
                (s.body as string)
              )}
            </p>
          </section>
        ))}

        {/* Tabla comparativa */}
        <section className="artsec">
          <h3>At a glance</h3>
          {table ? (
            <div className="arttable-wrap">
              <table className="arttable">
                <thead>
                  <tr>
                    {table.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => (
                        <td key={c}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {!isTodo(table.caption) && (
                <p className="artcap">{table.caption as string}</p>
              )}
            </div>
          ) : (
            <p>
              <Pending>
                Comparison table — the two or three options side by side, with
                the numbers that decide between them.
              </Pending>
            </p>
          )}
        </section>
      </div>

      {/* FAQ */}
      <section className="faq">
        <div className="micro">Frequently asked</div>
        <dl>
          {a.faq.map((item, i) => (
            <div className="faq-q" key={i}>
              <dt>{item.q}</dt>
              <dd>
                {isTodo(item.a) ? (
                  <Pending>Answer to be written.</Pending>
                ) : (
                  (item.a as string)
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Bloque de autor */}
      <section className="author">
        <div className="micro">Written by</div>
        <h4>{a.author}</h4>
        <p>
          {credentials ?? (
            <Pending>
              Author credentials — years in practice, the projects behind the
              expertise.
            </Pending>
          )}
        </p>
        <div className="reviewed">
          Reviewed by <strong>{a.reviewedBy}</strong>
        </div>
      </section>
    </article>
  );
}
