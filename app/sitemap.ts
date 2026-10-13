import type { MetadataRoute } from 'next';

const ROUTES = ['', 'services', 'process', 'about', 'faq', 'contact'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wesercode.de').replace(/\/$/, '');
  return ROUTES.flatMap((path) => {
    const de = `${base}${path ? `/${path}` : '/'}`;
    const en = `${base}/en${path ? `/${path}` : ''}`;

    return [
      {
        url: de,
        changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
        priority: path === '' ? 1 : path === 'services' || path === 'contact' ? 0.9 : 0.8,
        alternates: { languages: { de, en, 'x-default': de } },
      },
      {
        url: en,
        changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
        priority: path === '' ? 0.9 : path === 'services' || path === 'contact' ? 0.8 : 0.7,
        alternates: { languages: { de, en, 'x-default': de } },
      },
    ];
  });
}
