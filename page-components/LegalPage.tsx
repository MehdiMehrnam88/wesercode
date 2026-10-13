import { site, type Locale } from '@/lib/i18n';
import type { ReactNode } from 'react';
import { Shell } from './Shell';
import { PageHeroArtwork } from '@/components/PageHeroArtwork';

const UPDATED_DE = '10. Oktober 2026';
const UPDATED_EN = 'October 10, 2026';

function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="legal-section glass-panel">
    <div className="legal-section-kicker">WESERCODE · LEGAL</div>
    <h2>{title}</h2>
    <div className="legal-section-body">{children}</div>
  </section>;
}

export function ImprintPage({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  return <Shell locale={locale}>
    <section className="page-hero section-dark legal-page-hero">
      <div className="legal-page-hero-art" data-parallax="0.1"><PageHeroArtwork kind="imprint" /></div>
      <div className="container narrow page-hero-panel">
        <span className="eyebrow">01 / LEGAL</span>
        <h1>{de ? 'Impressum' : 'Imprint'}</h1>
        <p>{de ? 'Anbieterkennzeichnung und Kontaktangaben für das digitale Angebot von WeserCode.' : 'Provider information and contact details for the WeserCode digital service.'}</p>
      </div>
    </section>

    <section className="section legal-shell">
      <div className="container legal-stack">
        <LegalSection title={de ? 'Anbieter' : 'Provider'}>
          <div className="legal-detail-grid">
            <div><span>{de ? 'Name / Bezeichnung' : 'Name / designation'}</span><strong>{site.legalName} · {site.name}</strong></div>
            <div><span>{de ? 'Anschrift' : 'Address'}</span><strong>{site.address}</strong></div>
            <div><span>{de ? 'Rechtsform' : 'Business type'}</span><strong>{de ? 'Einzelunternehmen' : 'Sole proprietorship'}</strong></div>
            <div><span>{de ? 'E-Mail' : 'Email'}</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
            <div><span>{de ? 'Standort' : 'Location'}</span><strong>Bremen, Deutschland / Germany</strong></div>
          </div>
        </LegalSection>

        <LegalSection title={de ? 'Verantwortlich für den Inhalt' : 'Responsible for content'}>
          <p>{site.legalName}<br />{site.address}<br /><a href={`mailto:${site.email}`}>{site.email}</a></p>
        </LegalSection>

        <LegalSection title={de ? 'Verantwortlichkeit für Inhalte' : 'Responsibility for content'}>
          <p>{de ? 'Die Inhalte dieser Website werden mit dem Ziel bereitgestellt, Leistungen, Arbeitsweise und Kontaktmöglichkeiten von WeserCode verständlich zu beschreiben. Für konkrete rechtliche oder vertragliche Fragen ist die Kontaktaufnahme über die angegebene E-Mail-Adresse vorgesehen.' : 'The contents of this website are provided to explain WeserCode services, working methods and contact options clearly. For specific legal or contractual questions, please contact WeserCode at the email address shown above.'}</p>
        </LegalSection>

        <LegalSection title={de ? 'Haftung für externe Links' : 'Liability for external links'}>
          <p>{de ? 'Diese Website kann auf externe Websites oder Dienste verweisen. Für die Inhalte der jeweils verlinkten Seiten ist grundsätzlich deren jeweiliger Betreiber verantwortlich. Verlinkungen werden soweit möglich mit dem Kontext der jeweiligen Funktion kenntlich gemacht.' : 'This website may link to external websites or services. The respective operator is generally responsible for the content of each linked service. External links are presented in the context of the relevant function wherever practical.'}</p>
        </LegalSection>

        <div className="legal-updated">{de ? 'Stand' : 'Updated'} · {de ? UPDATED_DE : UPDATED_EN}</div>
      </div>
    </section>
  </Shell>;
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  return <Shell locale={locale}>
    <section className="page-hero section-dark legal-page-hero">
      <div className="legal-page-hero-art" data-parallax="0.1"><PageHeroArtwork kind="privacy" /></div>
      <div className="container narrow page-hero-panel">
        <span className="eyebrow">01 / LEGAL</span>
        <h1>{de ? 'Datenschutz' : 'Privacy'}</h1>
        <p>{de ? 'Diese Datenschutzerklärung beschreibt die Datenverarbeitung auf der WeserCode-Website und die hier eingesetzten Datenschutzmechanismen.' : 'This privacy notice explains how personal data is processed on the WeserCode website and how the site handles privacy-related features.'}</p>
      </div>
    </section>

    <section className="section legal-shell">
      <div className="container legal-stack">
        <LegalSection title={de ? '1. Verantwortlicher' : '1. Controller'}>
          <div className="legal-detail-grid">
            <div><span>{de ? 'Name' : 'Name'}</span><strong>{site.legalName} · {site.name}</strong></div>
            <div><span>{de ? 'Anschrift' : 'Address'}</span><strong>{site.address}</strong></div>
            <div><span>{de ? 'E-Mail' : 'Email'}</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
          </div>
        </LegalSection>

        <LegalSection title={de ? '2. Welche Daten verarbeitet die Website?' : '2. What data does the website process?'}>
          <p>{de ? 'Beim Besuch einer Website fallen technisch notwendige Verbindungs- und Nutzungsdaten an. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit, angeforderte URL, übertragene Datenmenge, HTTP-Status, Browser- und Betriebssysteminformationen sowie Referrer-Informationen gehören. Welche Protokolldaten der konkrete Hostingdienst speichert und wie lange, hängt von der eingesetzten Hosting- und Serverkonfiguration ab.' : 'When a website is accessed, technically necessary connection and usage data can be processed. This may include the IP address, date and time, requested URL, transferred data volume, HTTP status, browser and operating-system information and referrer information. The exact log data and retention period depend on the hosting and server configuration used for the deployed site.'}</p>
        </LegalSection>

        <LegalSection title={de ? '3. Kontaktformular' : '3. Contact form'}>
          <p>{de ? 'Wenn Sie das Kontaktformular verwenden, werden die von Ihnen eingegebenen Angaben verarbeitet: Name, E-Mail-Adresse sowie optional Unternehmen und Telefonnummer, Projekttyp und Nachricht. Die Angaben dienen dazu, Ihre Anfrage zu verstehen, zu beantworten und – soweit daraus ein Vertragsverhältnis oder eine vorvertragliche Maßnahme entsteht – weiter zu bearbeiten.' : 'When you use the contact form, the submitted data is processed: name and email address, plus optional company, phone number, project type and message. The information is used to understand and answer the inquiry and, where a contract or pre-contractual step follows, to continue handling the request.'}</p>
          <p>{de ? 'Rechtsgrundlage kann Art. 6 Abs. 1 lit. b DSGVO sein, soweit die Anfrage auf die Anbahnung oder Durchführung eines Vertrags gerichtet ist. Für sonstige Anfragen kommt – abhängig vom konkreten Sachverhalt – insbesondere Art. 6 Abs. 1 lit. f DSGVO in Betracht.' : 'The legal basis may be Art. 6(1)(b) GDPR where the inquiry relates to entering into or performing a contract. For other inquiries, depending on the circumstances, Art. 6(1)(f) GDPR may apply.'}</p>
          <p>{de ? 'Die serverseitige Kontaktverarbeitung validiert Eingaben, schützt den Endpunkt vor missbräuchlichen Anfragen und übergibt die Nachricht nur an den konfigurierten E-Mail-Zustelldienst. Ist keine Zustellung konfiguriert, meldet die Website keinen erfundenen Erfolg.' : 'The server-side contact handler validates input, applies abuse protection and passes the message only to the configured email-delivery service. If no delivery service is configured, the website does not falsely report a successful delivery.'}</p>
        </LegalSection>

        <LegalSection title={de ? '4. Einwilligungen und lokale Einstellungen' : '4. Consent and local settings'}>
          <p>{de ? 'Die Theme-Einstellung und Ihre Auswahl für optionale Analyse werden lokal im Browser gespeichert. Die Sprache richtet sich nach der aufgerufenen URL. Google Analytics wird erst geladen, nachdem Sie der Analyse zugestimmt haben. Ihre Auswahl können Sie jederzeit über „Datenschutzeinstellungen“ im Seitenfuß ändern.' : 'Your theme preference and optional analytics choice are stored locally in your browser. The language follows the URL you visit. Google Analytics loads only after you consent. You can change your choice at any time using “Privacy settings” in the footer.'}</p>
          <p>{de ? 'Die lokale Speicherung notwendiger Einstellungen stellt gewünschte Funktionen der Website bereit. Optionale Analyse bleibt deaktiviert, solange Sie nicht zustimmen.' : 'Local storage of necessary preferences supports requested website functions. Optional analytics stays disabled unless you consent.'}</p>
        </LegalSection>

        <LegalSection title={de ? '5. Google Analytics' : '5. Google Analytics'}>
          <p>{de ? 'Wenn Sie der optionalen Analyse zustimmen, wird Google Analytics mit der auf dieser Website hinterlegten Mess-ID G-5HK9RTXSSH geladen. Ohne Einwilligung bleibt dieser optionale Dienst deaktiviert.' : 'If you consent to optional analytics, Google Analytics is loaded with the measurement ID G-5HK9RTXSSH configured for this website. Without consent, this optional service remains disabled.'}</p>
          <p>{de ? 'Die konkrete Konfiguration und die datenschutzrechtliche Bewertung des eingesetzten Analytics-Setups sollte vor dem produktiven Einsatz anhand der tatsächlich verwendeten Google-Konfiguration und der gewählten Google-Dienstbedingungen geprüft werden.' : 'Before production use, the exact Analytics configuration and its privacy-law assessment should be reviewed against the actual Google configuration and applicable Google service terms.'}</p>
        </LegalSection>

        <LegalSection title={de ? '6. Google Maps' : '6. Google Maps'}>
          <p>{de ? 'Die Kontaktseite lädt Google Maps erst, wenn Sie die Karte ausdrücklich über „Google Maps laden“ öffnen. Danach können Daten, einschließlich Ihrer IP-Adresse, an Google übertragen und Inhalte von Google geladen werden.' : 'The contact page loads Google Maps only after you explicitly choose “Load Google Maps”. After that choice, data including your IP address may be sent to Google and Google content is loaded.'}</p>
          <p><a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">{de ? 'Datenschutzhinweise von Google' : 'Google Privacy Policy'}</a></p>
        </LegalSection>

        <LegalSection title={de ? '7. Videos und externe Inhalte' : '7. Videos and external content'}>
          <p>{de ? 'Hintergrundvideos werden von dieser Website bereitgestellt. Wenn eine lokale Videodatei nicht verfügbar ist, kann der Player auf eine konfigurierte externe Videoquelle zurückgreifen. Bei reduzierter Bewegung oder aktivem Datensparmodus werden die Videos nicht geladen.' : 'Background videos are served by this website. If a local video file is unavailable, the player can fall back to a configured external source. Videos are not loaded when reduced motion or data saving is enabled.'}</p>
        </LegalSection>

        <LegalSection title={de ? '8. Ihre Rechte' : '8. Your rights'}>
          <p>{de ? 'Sie haben – soweit die gesetzlichen Voraussetzungen erfüllt sind – insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch gegen bestimmte Verarbeitungen und Datenübertragbarkeit. Eine erteilte Einwilligung kann mit Wirkung für die Zukunft widerrufen werden.' : 'Subject to the legal requirements, you generally have rights to access, rectification, erasure, restriction of processing, objection to certain processing and data portability. Consent can be withdrawn with effect for the future.'}</p>
          <p>{de ? 'Sie haben außerdem das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren (Art. 77 DSGVO).' : 'You also have the right to lodge a complaint with a competent data-protection supervisory authority (Art. 77 GDPR).'}</p>
        </LegalSection>

        <LegalSection title={de ? '9. Datensicherheit' : '9. Data security'}>
          <p>{de ? 'WeserCode soll die Website mit aktuellen technischen Schutzmaßnahmen betreiben. Dazu gehören insbesondere Transportverschlüsselung per HTTPS/TLS, serverseitige Validierung von Formulareingaben, Schutz vor missbräuchlichen Anfragen sowie der vertrauliche Umgang mit Zugangsdaten und API-Schlüsseln.' : 'WeserCode is intended to operate the website with current technical safeguards, including HTTPS/TLS transport encryption, server-side form validation, abuse protection and careful handling of credentials and API keys.'}</p>
        </LegalSection>

        <LegalSection title={de ? '10. Änderungen dieser Datenschutzerklärung' : '10. Changes to this privacy notice'}>
          <p>{de ? 'Diese Datenschutzerklärung wird angepasst, wenn sich die Website, eingesetzte Dienste oder die rechtlichen Rahmenbedingungen ändern. Entscheidend ist die tatsächlich produktiv eingesetzte technische Konfiguration.' : 'This privacy notice will be updated when the website, the services used or the legal framework changes. The decisive reference is the technical configuration actually deployed in production.'}</p>
        </LegalSection>

        <div className="legal-updated">{de ? 'Stand' : 'Updated'} · {de ? UPDATED_DE : UPDATED_EN}</div>
      </div>
    </section>
  </Shell>;
}
