import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL): 'cs' | 'en' {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return defaultLang;
}

export function useTranslations(lang: 'cs' | 'en') {
  return function t(key: string): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}
