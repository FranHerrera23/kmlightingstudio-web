import { Link } from '@/i18n/navigation';
import { isTodo, type Video } from '@/content';

const PLAY = (
  <svg viewBox="0 0 14 16" aria-hidden="true">
    <path d="M0 0l14 8-14 8z" />
  </svg>
);

/**
 * Card de video 9:16. SIN embed de Instagram — thumbnail propio + link a la
 * página del video (que tiene la transcripción y el link afuera a IG).
 * Etiqueta ES/EN visible. Copy de placeholders en el catálogo (labels).
 */
export default function VideoCard({
  v,
  labels
}: {
  v: Video;
  labels: {
    source: string;
    verticalLabel: string;
    guestTBD: string;
    studioTBC: string;
    projectTBD: string;
    placeTBC: string;
    walkLabel: string;
  };
}) {
  const isConv = v.kind === 'conversation';
  const eyebrow = isConv
    ? v.topic
    : isTodo(v.partner)
      ? labels.walkLabel
      : (v.partner as string);
  const title = isConv
    ? isTodo(v.guest)
      ? labels.guestTBD
      : (v.guest as string)
    : isTodo(v.project)
      ? labels.projectTBD
      : (v.project as string);
  const sub = isConv
    ? isTodo(v.studio)
      ? { flag: true, text: labels.studioTBC }
      : { flag: false, text: v.studio as string }
    : isTodo(v.place)
      ? { flag: true, text: labels.placeTBC }
      : { flag: false, text: v.place as string };

  return (
    <Link className="vc rise" href={`/contenido/${v.id}`}>
      <div className="fr zin">
        <div className="ph" data-l={labels.verticalLabel}></div>
        <span className="src">{labels.source}</span>
        <span className="tr">
          <span className="tag">{v.lang}</span>
          {!isTodo(v.duration) && <span className="dur">{v.duration as string}</span>}
        </span>
        <span className="play">{PLAY}</span>
        <span className="ov">
          <span className="g">{eyebrow}</span>
          <h4>{title}</h4>
        </span>
      </div>
      <div className="meta">
        <span className={sub.flag ? 'st2 flag' : 'st2'}>{sub.text}</span>
      </div>
    </Link>
  );
}
