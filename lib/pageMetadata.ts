import type { Metadata } from 'next';
import type { Locale } from './i18n';

const image = {
  url: '/og-wesercode.jpg',
  width: 1200,
  height: 630,
  alt: 'WeserCode — digitale Systeme aus Bremen',
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const alternatePath = locale === 'de' ? `/en${path === '/' ? '' : path}` : path.replace(/^\/en(?=\/|$)/, '') || '/';
  const canonicalPath = path;
  const socialLocale = locale === 'de' ? 'de_DE' : 'en_US';
  const alternateLocale = locale === 'de' ? 'en_US' : 'de_DE';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        de: locale === 'de' ? canonicalPath : alternatePath,
        en: locale === 'en' ? canonicalPath : alternatePath,
        'x-default': locale === 'de' ? canonicalPath : alternatePath,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'WeserCode',
      title,
      description,
      url: canonicalPath,
      locale: socialLocale,
      alternateLocale: [alternateLocale],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
