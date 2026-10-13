'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export function ContactForm({ locale }: { locale: 'de' | 'en' }) {
  const de = locale === 'de';
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setState('loading');
    setError('');
    const formData = new FormData(form);
    const payload = { ...Object.fromEntries(formData.entries()), privacyConsent: formData.get('privacyConsent') === 'yes', locale };
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message || (de ? 'Die Anfrage konnte nicht gesendet werden.' : 'The inquiry could not be sent.'));
      setState('success');
      form.reset();
    } catch (e) {
      setState('error');
      setError(e instanceof Error ? e.message : (de ? 'Unbekannter Fehler.' : 'Unknown error.'));
    }
  }

  if (state === 'success') return <div className="form-status success" role="status"><div className="status-check">✓</div><strong>{de ? 'Anfrage vorbereitet.' : 'Inquiry submitted.'}</strong><p>{de ? 'Die Nachricht wurde vom Server angenommen und zur E-Mail-Zustellung weitergegeben.' : 'The server accepted the message and passed it to the configured email delivery provider.'}</p><button className="text-btn" type="button" onClick={() => setState('idle')}>{de ? 'Weitere Anfrage' : 'Send another inquiry'}</button></div>;

  return <form className="contact-form" onSubmit={onSubmit}>
    <div className="form-grid">
      <label><span>{de ? 'Name' : 'Name'} *</span><input name="name" required minLength={2} autoComplete="name" /></label>
      <label><span>{de ? 'E-Mail' : 'Email'} *</span><input type="email" name="email" required autoComplete="email" /></label>
      <label><span>{de ? 'Unternehmen' : 'Company'}</span><input name="company" autoComplete="organization" /></label>
      <label><span>{de ? 'Telefon' : 'Phone'}</span><input name="phone" autoComplete="tel" /></label>
    </div>
    <label><span>{de ? 'Projekttyp' : 'Project type'}</span><select name="projectType" defaultValue=""><option value="">{de ? 'Noch nicht sicher – kein Problem' : 'Not sure yet — no problem'}</option><option>Website / Web App</option><option>{de ? 'Software' : 'Software'}</option><option>{de ? 'Machine / Data Automation' : 'Machine / Data Automation'}</option><option>{de ? 'Mobile App / Game' : 'Mobile App / Game'}</option><option>AI</option><option>{de ? 'Custom Solution' : 'Custom Solution'}</option><option>{de ? 'Existing System / Modernization' : 'Existing System / Modernization'}</option><option>Other</option></select></label>
    <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label><span>{de ? 'Nachricht' : 'Message'} *</span><textarea name="message" required minLength={10} rows={8} aria-describedby="message-help" placeholder={de ? 'Zum Beispiel: „Unsere Mitarbeiter tragen die Daten noch per Hand zusammen.“ / „Ich brauche eine Website, weiß aber nicht, was dafür nötig ist.“ / „Kann man diesen Ablauf automatisieren?“' : 'For example: “Our team still collects this data by hand.” / “I need a website but do not know what is required.” / “Could this workflow be automated?”'} /><small id="message-help" className="field-help">{de ? 'Mindestens 10 Zeichen. Schreiben Sie einfach, wie Sie es jemandem erzählen würden.' : 'At least 10 characters. Write it the same way you would explain it to another person.'}</small></label>
    <label className="consent-check"><input type="checkbox" name="privacyConsent" value="yes" required /><span>{de ? <>Ich habe die <Link href="/privacy">Datenschutzhinweise</Link> gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.</> : <>I have read the <Link href="/en/privacy">privacy notice</Link> and consent to the processing of my details to handle this inquiry.</>}</span></label>
    <div className="form-actions"><button className="btn btn-primary btn-large" disabled={state === 'loading'} type="submit">{state === 'loading' ? (de ? 'Wird gesendet…' : 'Sending…') : (de ? 'Projektanfrage senden' : 'Send project inquiry')}</button>{state === 'error' && <div className="form-error" role="alert">{error}</div>}</div>
  </form>;
}
