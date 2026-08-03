import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Masthead from '@/components/Masthead';
import MaskLines from '@/components/MaskLines';
import { TEAM, FIRMS } from '@/content';
import { social, localizedPath } from '@/lib/metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return social({
    title: t('title'),
    description: t('description'),
    path: localizedPath(locale, '/estudio')
  });
}

export default async function AboutPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const stats = [
    { n: t('stat1Num'), sup: t('stat1Sup'), l: t('stat1Label') },
    { n: t('stat2Num'), sup: t('stat2Sup'), l: t('stat2Label') },
    { n: t('stat3Num'), sup: t('stat3Sup'), l: t('stat3Label') },
    { n: t('stat4Num'), sup: t('stat4Sup'), l: t('stat4Label') }
  ];

  return (
    <div>
      <Masthead
        kicker={t('kicker')}
        titleLines={t.raw('titleLines') as string[]}
        lead={t('introLead')}
        note={t('introNote')}
      />

      <section className="sec-s">
        <div className="shead">
          <div>
            <p className="lead">{t('lead')}</p>
          </div>
          <div className="side">
            <p className="rise d1">{t('throughline')}</p>
          </div>
        </div>
        <div
          className="stats rise d1"
          style={{ marginTop: 'clamp(44px,7vh,88px)' }}
        >
          {stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="n">
                {s.n}
                {s.sup && <sup>{s.sup}</sup>}
              </div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="founder">
        <div className="img zin">
          <div className="ph" data-l="Karen Mannheim · retrato"></div>
        </div>
        <div className="txt">
          <div className="micro rise">{t('founderMicro')}</div>
          <h3 className="rise d1">{t('founderName')}</h3>
          <div className="role rise d1">{t('founderRole')}</div>
          <p className="q rise d2">{t('founderQuote')}</p>
          <p className="rise d3">{t('founderBody')}</p>
        </div>
      </section>

      <section className="sec">
        <div className="shead">
          <div>
            <div className="micro rise">{t('teamMicro')}</div>
            <h2>
              <MaskLines lines={[t('teamTitle')]} />
            </h2>
          </div>
          <div className="side">
            <p className="lead rise d1">{t('teamSide')}</p>
          </div>
        </div>
        <div className="team">
          {TEAM.map(([name, role]) => (
            <div className="tm rise" key={name}>
              <div className="iw zin">
                <div className="ph" data-l={name}></div>
              </div>
              <h4>{name}</h4>
              <div className="r">{role}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="rule"></div>

      <section className="sec">
        <div className="shead">
          <div>
            <div className="micro rise">{t('trustedMicro')}</div>
            <h2>
              <MaskLines lines={[t('trustedTitle1'), t('trustedTitle2')]} />
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
