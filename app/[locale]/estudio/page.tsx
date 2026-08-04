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

  // §A.3 · barra de datos en dos bloques con sujeto explícito. El de "80+
  // personas" (dato de TRAZZO, no de KMLS) queda eliminado del modelo.
  const statBlocks = [
    { label: t('statsKarenLabel'), rows: t.raw('statsKaren') as string[][] },
    { label: t('statsStudioLabel'), rows: t.raw('statsStudio') as string[][] }
  ];

  return (
    <div>
      <Masthead
        kicker={t('kicker')}
        titleLines={t.raw('titleLines') as string[]}
        lead={t('introLead')}
        note={t('introNote')}
      />

      {/* §B.2 · el origen — la capa emocional que a la página le faltaba */}
      <section className="sec-s">
        <div className="shead">
          <div>
            <div className="micro rise">{t('originMicro')}</div>
            <h2 className="rise d1">
              <MaskLines lines={[t('originTitle')]} />
            </h2>
          </div>
          <div className="side">
            <p className="lead rise d1">{t('originBody1')}</p>
            <p className="rise d2" style={{ marginTop: 16 }}>
              {t('originBody2')}
            </p>
            <p className="rise d3" style={{ marginTop: 16 }}>
              {t('originBody3')}
            </p>
          </div>
        </div>
      </section>

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
          className="statblocks rise d1"
          style={{ marginTop: 'clamp(44px,7vh,88px)' }}
        >
          {statBlocks.map((block, bi) => (
            <div className="statblock" key={bi}>
              <div className="micro">{block.label}</div>
              <div
                className="stats"
                style={{
                  gridTemplateColumns: `repeat(${Math.max(block.rows.length, 1)}, 1fr)`
                }}
              >
                {block.rows.map(([n, sup, l], i) => (
                  <div className="stat" key={i}>
                    <div className="n">
                      {n}
                      {sup && <sup>{sup}</sup>}
                    </div>
                    <div className="l">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* §4.4 · atribución de la obra pre-2023 (KMLS fundado en 2023) */}
        <p className="trazzo-note rise d1">{t('trazzoNote')}</p>
      </section>

      <section className="founder">
        <div className="img zin">
          <div className="ph" data-l="Karen Mannheim · retrato"></div>
        </div>
        <div className="txt">
          <div className="micro rise">{t('founderMicro')}</div>
          <h3 className="rise d1">{t('founderName')}</h3>
          <div className="role rise d1">{t('founderRole')}</div>
          {/* §A.4 · Forbes va pegado al nombre de Karen, nunca suelto */}
          <div className="award rise d1">{t('founderAward')}</div>
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
