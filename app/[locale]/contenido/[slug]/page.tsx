import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { Link } from '@/i18n/navigation';
import { articleGraph, videoObject, breadcrumbList } from '@/lib/structuredData';
import { social, localizedPath } from '@/lib/metadata';
import { CONTENT_LOCALES } from '@/i18n/routing';
import {
  ARTICLES,
  allVideos,
  getContentItem,
  isTodo,
  isArticleReady,
  isVideoReady,
  displayValue,
  SITE_NAME,
  type Article,
  type Video
} from '@/content';

/**
 * DETALLE DE CONTENIDO · /contenido/[slug] — artículo (molde AEO) o video
 * (transcripción + VideoObject). Editorial ES/EN; PT/RU → 404.
 * Los seeds tienen la estructura llena y el contenido en TODO: se escriben
 * editando content/*.ts, sin tocar este componente. Copy en español.
 */
export function generateStaticParams() {
  return [
    ...ARTICLES.map((a) => ({ slug: a.slug })),
    ...allVideos().map((v) => ({ slug: v.id }))
  ];
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const item = getContentItem(slug);
  if (!item) return {};
  if (item.type === 'article') {
    const a = item.article;
    return {
      ...social({
        title: `${a.title} — ${SITE_NAME}`,
        description: isTodo(a.answer) ? a.question : (a.answer as string),
        path: localizedPath(locale, `/contenido/${a.slug}`),
        type: 'article'
      }),
      robots: isArticleReady(a) ? undefined : { index: false, follow: true }
    };
  }
  const v = item.video;
  const title = isTodo(v.title) ? 'Video' : (v.title as string);
  return {
    ...social({
      title: `${title} — ${SITE_NAME}`,
      description: isTodo(v.transcript) ? v.topic : (v.transcript as string),
      path: localizedPath(locale, `/contenido/${v.id}`),
      type: 'article'
    }),
    robots: isVideoReady(v) ? undefined : { index: false, follow: true }
  };
}

/** Placeholder rojo de contenido pendiente. */
function Pending({ children }: { children: string }) {
  return <span className="flag">{children}</span>;
}

export default async function ContentDetailPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  if (!(CONTENT_LOCALES as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const item = getContentItem(slug);
  if (!item) notFound();

  const tc = await getTranslations('content');
  const tn = await getTranslations('nav');

  if (item.type === 'article') {
    const a = item.article;
    const crumbs = breadcrumbList(locale, [
      { name: tn('home'), path: '/' },
      { name: tn('content'), path: '/contenido' },
      { name: tc('tabWritten'), path: '/contenido/articulos' },
      { name: a.title, path: `/contenido/${a.slug}` }
    ]);
    return (
      <>
        <JsonLd data={crumbs} />
        <ArticleView a={a} />
        {/* A.5 brief 05 · captura específica del lector, antes del CTA genérico */}
        <section className="capture">
          <h3>{tc('captureTitle')}</h3>
          <p>{tc('captureBody')}</p>
          <Link className="b" href="/contacto">
            {tc('captureButton')}
          </Link>
        </section>
      </>
    );
  }

  const v = item.video;
  const isConv = v.kind === 'conversation';
  const sectionName = isConv ? tc('tabConversations') : tc('tabWalkthroughs');
  const sectionPath = isConv ? '/contenido/conversaciones' : '/contenido/recorridos';
  const leaf = isConv
    ? isTodo(v.guest)
      ? sectionName
      : (v.guest as string)
    : isTodo(v.project)
      ? sectionName
      : (v.project as string);
  const crumbs = breadcrumbList(locale, [
    { name: tn('home'), path: '/' },
    { name: tn('content'), path: '/contenido' },
    { name: sectionName, path: sectionPath },
    { name: leaf, path: `/contenido/${v.id}` }
  ]);
  return (
    <>
      <JsonLd data={crumbs} />
      <VideoView v={v} />
    </>
  );
}

/* ══════════ ARTÍCULO (molde AEO) ══════════ */
function ArticleView({ a }: { a: Article }) {
  const read = displayValue(a.read);
  const published = displayValue(a.published);
  const takeaways = displayValue(a.takeaways);
  const table = displayValue(a.table);
  const credentials = displayValue(a.credentials);

  return (
    <article className="article">
      <JsonLd data={articleGraph(a)} />

      <header className="arthead">
        <Link className="back" href="/contenido">
          ← Contenido
        </Link>
        <div className="micro">{a.tag}</div>
        <h1>{a.title}</h1>
        <div className="artmeta">
          <span>Por {a.author}</span>
          <span>Revisado por {a.reviewedBy}</span>
          {read && <span>{read} de lectura</span>}
          {published && <span>{published}</span>}
        </div>
      </header>

      {/* En corto — el bloque que la IA levanta */}
      <section className="capsule">
        <div className="micro">En corto</div>
        <p>
          {isTodo(a.answer) ? (
            <Pending>
              Por escribir — 2 a 3 frases autocontenidas con el número adentro.
              Es el fragmento que ChatGPT y Perplexity citan textual.
            </Pending>
          ) : (
            (a.answer as string)
          )}
        </p>
      </section>

      {/* Lo que importa — tres */}
      <section className="takeaways">
        <div className="micro">Lo que importa</div>
        {takeaways ? (
          <ul>
            {takeaways.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        ) : (
          <ul>
            <li>
              <Pending>Dato citable 1 — con un número adentro.</Pending>
            </li>
            <li>
              <Pending>Dato citable 2.</Pending>
            </li>
            <li>
              <Pending>Dato citable 3.</Pending>
            </li>
          </ul>
        )}
      </section>

      {/* Cuerpo · subheaders-afirmación */}
      <div className="artbody">
        {a.sections.map((s, i) => (
          <section className="artsec" key={i}>
            <h3>
              {isTodo(s.heading) ? (
                <Pending>Subtítulo — una afirmación, no una etiqueta.</Pending>
              ) : (
                (s.heading as string)
              )}
            </h3>
            <p>
              {isTodo(s.body) ? (
                <Pending>Cuerpo — necesita el dato técnico que todavía no tenemos.</Pending>
              ) : (
                (s.body as string)
              )}
            </p>
          </section>
        ))}

        {/* Tabla comparativa */}
        <section className="artsec">
          <h3>De un vistazo</h3>
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
                Tabla comparativa — la pieza más citable. Las opciones lado a
                lado, con los números que deciden entre ellas.
              </Pending>
            </p>
          )}
        </section>
      </div>

      {/* Preguntas frecuentes */}
      <section className="faq">
        <div className="micro">Preguntas frecuentes</div>
        <dl>
          {a.faq.map((item, i) => (
            <div className="faq-q" key={i}>
              <dt>{item.q}</dt>
              <dd>
                {isTodo(item.a) ? (
                  <Pending>Respuesta por escribir.</Pending>
                ) : (
                  (item.a as string)
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Autor */}
      <section className="author">
        <div className="micro">Escrito por</div>
        <h4>{a.author}</h4>
        <p>
          {credentials ?? (
            <Pending>
              Credenciales del autor — años de práctica, los proyectos detrás.
            </Pending>
          )}
        </p>
        <div className="reviewed">
          Revisado por <strong>{a.reviewedBy}</strong>
        </div>
      </section>
    </article>
  );
}

/* ══════════ VIDEO (transcripción + VideoObject) ══════════ */
function VideoView({ v }: { v: Video }) {
  const isConv = v.kind === 'conversation';
  const eyebrow = isConv
    ? v.topic
    : isTodo(v.partner)
      ? 'Recorrido'
      : (v.partner as string);
  const title = isConv
    ? isTodo(v.guest)
      ? '[Invitado por definir]'
      : (v.guest as string)
    : isTodo(v.project)
      ? '[Proyecto por definir]'
      : (v.project as string);

  const rows: Array<[string, string | null]> = isConv
    ? [
        ['Invitado', displayValue(v.guest) ?? null],
        ['Estudio', displayValue(v.studio) ?? null],
        ['Tema', v.topic],
        ['Duración', displayValue(v.duration)]
      ]
    : [
        ['Proyecto', displayValue(v.project) ?? null],
        ['Estudio', displayValue(v.partner) ?? null],
        ['Lugar', displayValue(v.place) ?? null],
        ['Duración', displayValue(v.duration)]
      ];

  return (
    <article className="varticle">
      <JsonLd data={videoObject(v)} />

      <header className="vhd">
        <Link className="back" href="/contenido">
          ← Contenido
        </Link>
        <div className="micro">{eyebrow}</div>
        <h1>{title}</h1>
        <div className="sub">
          {isConv
            ? isTodo(v.studio)
              ? ''
              : (v.studio as string)
            : isTodo(v.place)
              ? ''
              : (v.place as string)}
        </div>
      </header>

      <div className="vstage">
        <div className="fr">
          <div className="ph" data-l="Vertical 9:16"></div>
        </div>
        <div className="vinfo">
          <span className="lang-tag">{v.lang}</span>
          <dl>
            {rows.map(([k, val]) => (
              <div className="r" key={k}>
                <dt>{k}</dt>
                {val === null ? (
                  <dd>
                    <Pending>Por confirmar</Pending>
                  </dd>
                ) : (
                  <dd>{val}</dd>
                )}
              </div>
            ))}
          </dl>
          {!isTodo(v.url) && (
            <a
              className="watch"
              href={v.url as string}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en Instagram →
            </a>
          )}
        </div>
      </div>

      {/* La transcripción va en la página — el texto es lo que se indexa */}
      <section className="transcript">
        <div className="micro">Transcripción</div>
        {isTodo(v.transcript) ? (
          <p>
            <Pending>
              Transcripción por cargar — el texto completo en el idioma original.
              Un video no lo indexa nadie; el texto sí.
            </Pending>
          </p>
        ) : (
          <p>{v.transcript as string}</p>
        )}
      </section>
    </article>
  );
}
