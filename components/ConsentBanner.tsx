'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function ConsentBanner({ locale }: { locale: 'de' | 'en' }) {
  const pathname = usePathname();
  const activeLocale =
    pathname === '/en' || pathname?.startsWith('/en/') ? 'en' : locale;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const syncVisibility = () => setVisible(!localStorage.getItem('wesercode-analytics-consent'));
    const openSettings = () => setVisible(true);
    syncVisibility();
    window.addEventListener('wesercode-open-consent', openSettings);
    return () => window.removeEventListener('wesercode-open-consent', openSettings);
  }, []);

  if (!visible) return null;

  const de = activeLocale === 'de';

  const setConsent = (value: 'granted' | 'denied') => {
    localStorage.setItem('wesercode-analytics-consent', value);

    const gtag = (
      window as typeof window & {
        gtag?: (...args: unknown[]) => void;
      }
    ).gtag;

    if (gtag) {
      const consentState = value === 'granted' ? 'granted' : 'denied';

      gtag('consent', 'update', {
        ad_storage: consentState,
        analytics_storage: consentState,
        ad_user_data: consentState,
        ad_personalization: consentState,
      });
    }

    window.dispatchEvent(
      new CustomEvent('wesercode-consent', {
        detail: value,
      })
    );

    setVisible(false);
  };

  return (
    <aside
      className="consent-banner"
      aria-label={de ? 'Datenschutzeinstellungen' : 'Privacy settings'}
    >
      <div>
        <strong>
          {de ? 'Datenschutz & Analyse' : 'Privacy & analytics'}
        </strong>

        <p>
          {de
            ? 'Optionale Analyse wird erst nach Ihrer Einwilligung geladen. Notwendige Funktionen bleiben aktiv.'
            : 'Optional analytics loads only after your consent. Necessary functionality remains active.'}
        </p>
      </div>

      <div className="consent-actions">
        <button
          onClick={() => setConsent('denied')}
          className="btn btn-secondary"
          type="button"
        >
          {de ? 'Nur notwendige' : 'Necessary only'}
        </button>

        <button
          onClick={() => setConsent('granted')}
          className="btn btn-primary"
          type="button"
        >
          {de ? 'Analyse erlauben' : 'Accept analytics'}
        </button>
      </div>
    </aside>
  );
}
