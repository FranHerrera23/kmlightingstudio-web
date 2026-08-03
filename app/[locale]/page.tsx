import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { richTags } from '@/components/rich';
import MaskLines from '@/components/MaskLines';
import HeroVerticals from '@/components/HeroVerticals';
import ProjectCard from '@/components/ProjectCard';
import BuildNote from '@/components/BuildNote';
import { FEATURED, FIRMS, getProject, type Project } from '@/content';

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

      {/* ═══ PARTNERSHIP ═══ */}
      <section className="split rev dark">
        <div className="img zin">
          <div className="ph" data-l="Terraza o rooftop nocturno"></div>
        </div>
        <div className="txt">
          <div className="micro rise">{t('partnership.micro')}</div>
          <h3>
            <MaskLines lines={lines('partnership.titleLines')} />
          </h3>
          <p className="rise d2">{t('partnership.p1')}</p>
          <p className="rise d3">{t('partnership.p2')}</p>
        </div>
      </section>

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
            Ciudades con obra entregada sobre proyección con grilla. Siete países
            con obra: Perú · Estados Unidos · España · EAU · Aruba · República
            Dominicana. Ciudades: Lima · Miami · Madrid · Marbella · Abu Dhabi ·
            Palm Beach · Golden Beach · Coral Gables · Key Biscayne · Fisher
            Island · Aruba.
          </BuildNote>
        </div>
      </section>

      <div className="rule"></div>

      {/* ═══ TRUSTED BY ═══ */}
      <section className="sec">
        <div className="shead">
          <div>
            <div className="micro rise">{t('trusted.micro')}</div>
            <h2>
              <MaskLines lines={lines('trusted.titleLines')} />
            </h2>
          </div>
        </div>
        <div className="firms">
          {FIRMS.map(([name, descriptor]) => (
            <div className="rise" key={name}>
              <div className="nm">{name}</div>
              <div className="ty">{descriptor}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
