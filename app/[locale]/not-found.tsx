import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <section className="mast" style={{ paddingBottom: 'var(--sec-s)' }}>
      <div className="micro">404</div>
      <h1>
        Nothing <span className="it">here.</span>
      </h1>
      <div style={{ marginTop: 32 }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            color: 'var(--ink-2)',
            border: '1px solid var(--rule)',
            borderRadius: 100,
            padding: '16px 30px'
          }}
        >
          ← Back to the studio
        </Link>
      </div>
    </section>
  );
}
