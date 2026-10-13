'use client';

import { useState } from 'react';

export function MapEmbed({ locale }: { locale: 'de' | 'en' }) {
  const [loaded, setLoaded] = useState(false);
  const query = encodeURIComponent('Rotdornpfad 31, 28355 Bremen, Germany');
  const src = `https://www.google.com/maps?q=${query}&output=embed`;
  return <div className="map-frame map-frame-live">
    {loaded ? <iframe
      title={locale === 'de' ? 'WeserCode Standort auf Google Maps' : 'WeserCode location on Google Maps'}
      src={src}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    /> : <div className="map-consent-placeholder">
      <p>{locale === 'de' ? 'Die Karte wird erst nach Ihrer Auswahl von Google Maps geladen.' : 'Google Maps loads only after you choose to view the map.'}</p>
      <button className="btn btn-secondary" type="button" onClick={() => setLoaded(true)}>
        {locale === 'de' ? 'Google Maps laden' : 'Load Google Maps'}
      </button>
    </div>}
  </div>;
}
