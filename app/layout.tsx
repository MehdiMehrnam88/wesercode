import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import '@/styles/globals.css';

import { Analytics } from '@/components/Analytics';
import { ConsentBanner } from '@/components/ConsentBanner';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wesercode.de'
  ),
  title: 'WeserCode — Software, Apps, Web & AI aus Bremen',
  description:
    'WeserCode entwickelt Websites, Webanwendungen, individuelle Software, mobile Apps, AI-Lösungen, Automatisierung und Systemintegration aus Bremen.',
  applicationName: 'WeserCode',
  authors: [{ name: 'WeserCode', url: 'https://www.wesercode.de' }],
  creator: 'WeserCode',
  publisher: 'WeserCode',
  category: 'Software Development',
  keywords: [
    'Softwareentwicklung Bremen',
    'Webentwicklung Bremen',
    'Webagentur Bremen',
    'App Entwicklung Bremen',
    'AI Lösungen Bremen',
    'KI Lösungen Bremen',
    'Automatisierung',
    'Systemintegration',
    'individuelle Software',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/wesercode-mark.png', type: 'image/png' },
    ],
    apple: '/brand/wesercode-mark.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'WeserCode',
    title: 'WeserCode — Software, Apps, Web & AI aus Bremen',
    description:
      'Digitale Systeme nach realen Anforderungen: Web, Software, Apps, AI, Automation und Systemintegration.',
    url: '/',
    images: [
      {
        url: '/og-wesercode.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'WeserCode aus Bremen — digitale Systeme, Webentwicklung, Software, Apps, KI und Automatisierung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeserCode — Software, Apps, Web & AI aus Bremen',
    description:
      'Digitale Systeme nach realen Anforderungen: Web, Software, Apps, AI, Automation und Systemintegration.',
    images: [{ url: '/og-wesercode.jpg', width: 1200, height: 630, alt: 'WeserCode — digitale Systeme aus Bremen' }],
  },
  other: {
    'msvalidate.01': '61B34006109DCCDE9896B7432C10588B',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });

            try {
              if (
                localStorage.getItem('wesercode-analytics-consent') === 'granted'
              ) {
                gtag('consent', 'update', {
                  ad_storage: 'granted',
                  analytics_storage: 'granted',
                  ad_user_data: 'granted',
                  ad_personalization: 'granted'
                });
              }
            } catch (e) {}
          `}
        </Script>

        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const s=localStorage.getItem("wesercode-theme");const p=window.matchMedia("(prefers-color-scheme: light)").matches;document.documentElement.dataset.theme=s||(p?"light":"dark");document.documentElement.lang=location.pathname.startsWith("/en")?"en":"de"}catch(e){}})()`,
          }}
        />

        {children}

        <Analytics />

        <ConsentBanner locale="de" />
      </body>
    </html>
  );
}