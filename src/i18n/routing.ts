import type { Locale } from './translations';

export const localizedPath = (locale: Locale, path = '/') => {
  if (locale === 'en') {
    return path === '/' ? '/' : path;
  }

  if (path === '/') {
    return `/${locale}`;
  }

  return `/${locale}${path}`;
};
