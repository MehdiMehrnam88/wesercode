'use client';

export function PrivacySettingsButton({ locale }: { locale: 'de' | 'en' }) {
  return (
    <button
      className="footer-privacy-settings"
      type="button"
      onClick={() => window.dispatchEvent(new Event('wesercode-open-consent'))}
    >
      {locale === 'de' ? 'Datenschutzeinstellungen' : 'Privacy settings'}
    </button>
  );
}
