import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { richTags } from '@/components/rich';
import MaskLines from '@/components/MaskLines';
import HeroVerticals from '@/components/HeroVerticals';
import ProjectCard from '@/components/ProjectCard';
import BuildNote from '@/components/BuildNote';
import { FEATURED, FEATURED_STUDIOS, getProject, type Project } from '@/content';

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const lines = (k: string) => t.raw(k) as string[];

  const featured = FEATURED.map((id) => getProject(id)).filter(
    Boolean
  ) as Project[];

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <header className="hero">
        <div className="ph" data-l="Hero — video loop o still · fase 2"></div>
        <div className="micro rise">{t('hero.kicker')}</div>
        <h1>
          <MaskLines lines={lines('hero.titleLines')} />
        </h1>
        <div className="hero-b">
          <HeroVerticals />
          <div className="scroll rise d3">
            <i>↓</i> {t('hero.scroll')}
          </div>
        </div>
      </header>

      {/* ═══ ATRIBUCIÓN (§4.3) — track record de Karen, KMLS fundado 2023 ═══ */}
      <section className="databand">
        <span className="do">{t('dataOrg')}</span>
        <span className="dk">{t('dataKaren')}</span>
      </section>

      {/* ═══ STATEMENT — una sola idea, la única cursiva de la página ═══ */}
      <section className="stmt">
        <h2>
          <MaskLines lines={lines('statement.titleLines')} />
        </h2>
        <div className="body">
          <p className="rise">{t('statement.p1')}</p>
          <p className="rise d1">{t.rich('statement.p2', richTags)}</p>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section className="split dark">
        <div className="img zin">
          <div className="ph" data-l="Interior cálido · biblioteca o gran salón"></div>
        </div>
        <div className="txt">
          <div className="micro rise">{t('philosophy.micro')}</div>
          <h3>
            <MaskLines lines={lines('philosophy.titleLines')} />
          </h3>
          <p className="rise d2">{t('philosophy.body')}</p>
          <div className="sign rise d3">{t('philosophy.sign')}</div>
        </div>
      </section>

      {/* ═══ SELECTED WORK ═══ */}
      <section className="sec">
        <div className="shead">
          <div>
            <div className="micro rise">{t('selected.micro')}</div>
            <h2>
              <MaskLines lines={lines('selected.titleLines')} />
            </h2>
          </div>
          <div className="side">
            <p className="lead rise d1">{t('selected.side')}</p>
          </div>
        </div>
        <div className="pgrid" data-d="4">
          {featured.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
        <div style={{ marginTop: 'clamp(36px,5vh,60px)' }}>
          <Link
            className="lnk"
            href="/proyectos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              border: '1px solid var(--rule)',
              borderRadius: 100,
              padding: '16px 30px'
            }}
          >
            {t('selected.cta')}
          </Link>
        </div>
      </section>

      {/* ═══ TRUSTED BY ═══ (§6.1) — sube junto a Obra seleccionada: el arquitecto
           que valida quiere ver a sus pares antes de leer filosofía. Título a --t2
           (§7.1). Los pares estudio+proyecto con foto y link son §6.3 (assets). */}
      <section className="sec">
        <div className="shead">
          <div>
            <div className="micro rise">{t('trusted.micro')}</div>
            <h2 className="sm">
              <MaskLines lines={lines('trusted.titleLines')} />
            </h2>
          </div>
        </div>
        {/* §7 · cuatro destacados en pares estudio + proyecto, con link a la ficha.
             Un nombre con proyecto al lado es prueba, no claim. (Fotos: assets.) */}
        <div className="pairs" style={{ marginTop: 'clamp(30px,4vh,52px)' }}>
          {FEATURED_STUDIOS.map((s) => (
            <Link className="pair rise" key={s.projectId} href={`/proyectos/${s.projectId}`}>
              <div className="ph" data-l={`${s.studio} · ${s.label}`}></div>
              <div className="pair-st">
                {s.studio}
                {s.desc && <span>{s.desc}</span>}
              </div>
              <div className="pair-pj">
                {s.label} <i>→</i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="rule"></div>

      {/* ═══ RANGE ═══ */}
      <section className="sec">
        <div className="shead">
          <div>
            <div className="micro rise">{t('range.micro')}</div>
            <h2 className="sm">
              <MaskLines lines={lines('range.titleLines')} />
            </h2>
          </div>
          <div className="side">
            <p className="lead rise d1">{t('range.side')}</p>
          </div>
        </div>
        <div className="vgrid">
          <div className="vcard rise">
            <div className="ph" data-l="RAMSA · fachada clásica"></div>
            <span className="n">{t('range.ramsaName')}</span>
            <h3>{t('range.ramsaTitle')}</h3>
            <span className="go">
              {t('range.ramsaGo')} <i>→</i>
            </span>
          </div>
          <div className="vcard rise d1">
            <div className="ph" data-l="Elicyon London · contemporáneo"></div>
            <span className="n">{t('range.elicyonName')}</span>
            <h3>{t('range.elicyonTitle')}</h3>
            <span className="go">
              {t('range.elicyonGo')} <i>→</i>
            </span>
          </div>
        </div>
      </section>

      {/* La sección "Sociedad"/PARTNERSHIP se eliminó (brief 02 §A.6): su capa
          emocional se trasladó a la apertura de /servicios, donde el arquitecto
          la lee con intención de contratar. No se duplica. */}

      {/* ═══ TECHNOLOGY ═══ */}
      <section className="sec">
        <div className="shead">
          <div>
            <div className="micro rise">{t('tech.micro')}</div>
            <h2>
              <MaskLines lines={lines('tech.titleLines')} />
            </h2>
          </div>
          <div className="side">
            <p className="lead rise d1">{t('tech.side')}</p>
          </div>
        </div>
        <div className="tri">
          <div className="rise">
            <div className="micro">{t('tech.c1Label')}</div>
            <h4>{t('tech.c1Title')}</h4>
            <p>{t('tech.c1Body')}</p>
          </div>
          <div className="rise d1">
            <div className="micro">{t('tech.c2Label')}</div>
            <h4>{t('tech.c2Title')}</h4>
            <p>{t('tech.c2Body')}</p>
          </div>
          <div className="rise d2">
            <div className="micro">{t('tech.c3Label')}</div>
            <h4>{t('tech.c3Title')}</h4>
            <p>{t('tech.c3Body')}</p>
          </div>
        </div>
        {/* §4 brief 06 · la home ahora sí linkea a /tecnologia */}
        <div style={{ marginTop: 'clamp(30px,4vh,52px)' }}>
          <Link
            className="lnk"
            href="/tecnologia"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              border: '1px solid var(--rule)',
              borderRadius: 100,
              padding: '16px 30px'
            }}
          >
            {t('tech.link')}
          </Link>
        </div>
      </section>

      {/* ═══ STATEMENT LINE (§7.2) — estático, sin scroll horizontal ═══ */}
      <div className="marq-w">
        <div className="marq-static">
          {t('marquee1')} {t('marquee2')}
        </div>
      </div>

      {/* ═══ WHERE WE WORK ═══ */}
      <section className="sec">
        <div className="shead">
          <div>
            <div className="micro rise">{t('where.micro')}</div>
            <h2 className="sm">
              <MaskLines lines={lines('where.titleLines')} />
            </h2>
          </div>
          <div className="side">
            <p className="lead rise d1">{t('where.side')}</p>
          </div>
        </div>
        {/* §C.4 · el placeholder del mapa (fase 2) es andamiaje: solo en dev,
            para no dejar una caja vacía en producción. */}
        {process.env.NODE_ENV !== 'production' && (
          <div
            className="rise d1"
            style={{
              marginTop: 'clamp(40px,6vh,80px)',
              border: '1px solid var(--rule)',
              minHeight: 'clamp(280px,42vh,440px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40
            }}
          >
            <BuildNote title="Mapa mundial · fase 2">
              Ciudades con obra entregada sobre proyección con grilla. Seis países
              con obra: Perú · Estados Unidos · España · EAU · Aruba · República
              Dominicana. Ciudades: Lima · Miami · Madrid · Marbella · Abu Dhabi ·
              Palm Beach · Golden Beach · Coral Gables · Key Biscayne · Fisher
              Island · Aruba.
            </BuildNote>
          </div>
        )}
      </section>

    </div>
  );
}
