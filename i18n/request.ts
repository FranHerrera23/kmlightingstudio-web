import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // EN completo. ES/PT/RU tienen las mismas claves con strings vacíos (fase 2).
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
