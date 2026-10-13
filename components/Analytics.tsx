'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export function Analytics() {
  const id = 'G-5HK9RTXSSH';
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setEnabled(localStorage.getItem('wesercode-analytics-consent') === 'granted');
    };

    syncConsent();
    window.addEventListener('wesercode-consent', syncConsent);
    return () => window.removeEventListener('wesercode-consent', syncConsent);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
