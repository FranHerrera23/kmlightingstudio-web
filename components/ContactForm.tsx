'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Field = 'name' | 'email' | 'studio' | 'type' | 'stage' | 'message' | 'company';
type State = 'idle' | 'sending' | 'success' | 'error';

/**
 * Formulario de contacto real. Validación en cliente (y en servidor, ver
 * app/api/contact). Honeypot oculto + rate limit por IP en el endpoint. Sin
 * captcha — agrega fricción a un lead de $40K. Registra origen (referrer +
 * pathname) para el reporte mensual.
 */
export default function ContactForm() {
  const t = useTranslations('contactForm');
  const types = t.raw('types') as Record<string, string>;
  const stages = t.raw('stages') as Record<string, string>;

  const [form, setForm] = useState<Record<Field, string>>({
    name: '', email: '', studio: '', type: '', stage: '', message: '', company: ''
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<State>('idle');

  const set =
    (k: Field) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const err: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) err.name = t('errName');
    if (!EMAIL_RE.test(form.email.trim())) err.email = t('errEmail');
    if (!form.message.trim()) err.message = t('errMessage');
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          referrer: document.referrer,
          pathname: window.location.pathname
        })
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('success');
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="cf-success">
        <h3>{t('successTitle')}</h3>
        <p>{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form className="cf" onSubmit={submit} noValidate>
      <div className="cf-row">
        <label className="cf-field">
          <span>{t('name')}</span>
          <input
            value={form.name}
            onChange={set('name')}
            aria-invalid={!!errors.name}
          />
          {errors.name && <em>{errors.name}</em>}
        </label>
        <label className="cf-field">
          <span>{t('email')}</span>
          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            aria-invalid={!!errors.email}
          />
          {errors.email && <em>{errors.email}</em>}
        </label>
      </div>

      <label className="cf-field">
        <span>{t('studio')}</span>
        <input
          value={form.studio}
          onChange={set('studio')}
          placeholder={t('studioHint')}
        />
      </label>

      <div className="cf-row">
        <label className="cf-field">
          <span>{t('type')}</span>
          <select value={form.type} onChange={set('type')}>
            <option value="">{t('choose')}</option>
            {Object.entries(types).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="cf-field">
          <span>{t('stage')}</span>
          <select value={form.stage} onChange={set('stage')}>
            <option value="">{t('choose')}</option>
            {Object.entries(stages).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="cf-field">
        <span>{t('message')}</span>
        <textarea
          value={form.message}
          onChange={set('message')}
          rows={5}
          aria-invalid={!!errors.message}
        />
        {errors.message && <em>{errors.message}</em>}
      </label>

      {/* honeypot — invisible para humanos, tentador para bots */}
      <input
        className="cf-hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.company}
        onChange={set('company')}
      />

      <button type="submit" className="cf-submit" disabled={state === 'sending'}>
        {state === 'sending' ? t('sending') : t('submit')}
      </button>
      {state === 'error' && <p className="cf-error">{t('error')}</p>}
    </form>
  );
}
