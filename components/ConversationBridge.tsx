import Link from 'next/link';
import { Icon } from './Icon';
import { HomeVisualModule } from './HomeVisualModule';
import type { Locale } from '@/lib/i18n';

type Mode = 'home' | 'compact';

export function ConversationBridge({ locale, mode = 'home' }: { locale: Locale; mode?: Mode }) {
  const de = locale === 'de';
  const target = de ? '/contact' : '/en/contact';

  if (mode === 'compact') {
    return (
      <div className="conversation-bridge conversation-bridge-compact">
        <div className="conversation-bridge-mark" aria-hidden="true"><Icon name="mail" /></div>
        <div className="conversation-bridge-copy">
          <span className="eyebrow">{de ? 'KEIN TECHNISCHES VORWISSEN NÖTIG' : 'NO TECHNICAL KNOWLEDGE REQUIRED'}</span>
          <h3>{de ? 'Sie müssen nicht wissen, was Sie brauchen.' : 'You do not need to know what you need yet.'}</h3>
          <p>{de ? 'Ein Problem, eine Idee oder ein grober Gedanke reicht. Wir helfen dabei, daraus einen sinnvollen nächsten Schritt zu machen.' : 'A problem, an idea or a rough thought is enough. We help turn it into a sensible next step.'}</p>
        </div>
        <Link className="btn btn-secondary" href={target}>{de ? 'Einfach sprechen' : 'Just talk to us'} <Icon name="arrow" /></Link>
      </div>
    );
  }

  return (
    <section className="section conversation-section home-visual-stage">
      <HomeVisualModule kind="conversation" />
      <div className="container">
        <div className="conversation-intro">
          <div>
            <span className="eyebrow"><span className="live-dot" />{de ? '01 / EINFACH ANFANGEN' : '01 / START SIMPLE'}</span>
            <h2>{de ? 'Sie müssen kein IT-Experte sein, um zu uns zu kommen.' : 'You do not have to be an IT expert to talk to us.'}</h2>
          </div>
          <p>{de ? 'Vielleicht wissen Sie nur, dass etwas zu langsam, zu kompliziert, zu manuell oder noch gar nicht vorhanden ist. Genau damit können Sie zu WeserCode kommen.' : 'Maybe you only know that something is too slow, too complicated, too manual or simply does not exist yet. That is enough to start with WeserCode.'}</p>
        </div>

        <div className="conversation-grid">
          <article className="conversation-card">
            <span className="conversation-number">01</span>
            <h3>{de ? 'Sie erzählen es so, wie Sie es sehen.' : 'You describe it in your own words.'}</h3>
            <p>{de ? 'Keine Fachbegriffe und kein fertiges Lastenheft nötig. Ein Satz, ein Beispiel oder ein Screenshot reicht für den Anfang.' : 'No technical vocabulary and no finished specification required. A sentence, an example or a screenshot is enough to begin.'}</p>
          </article>
          <article className="conversation-card">
            <span className="conversation-number">02</span>
            <h3>{de ? 'Wir stellen die richtigen Fragen.' : 'We ask the right questions.'}</h3>
            <p>{de ? 'Wir helfen beim Einordnen: Was soll besser werden? Wer nutzt es? Was gibt es schon? Was muss wirklich gebaut werden?' : 'We help put things into focus: What should improve? Who uses it? What already exists? What actually needs to be built?'}</p>
          </article>
          <article className="conversation-card">
            <span className="conversation-number">03</span>
            <h3>{de ? 'Dann wird aus Unsicherheit ein nächster Schritt.' : 'Then uncertainty becomes a next step.'}</h3>
            <p>{de ? 'Sie bekommen eine verständliche Einschätzung und einen klaren Weg nach vorne – Technologie erst dann, wenn sie relevant ist.' : 'You get an understandable assessment and a clear way forward — technology only when it becomes relevant.'}</p>
          </article>
        </div>

        <div className="conversation-footer">
          <div>
            <strong>{de ? 'Sie können sogar so anfangen:' : 'You can even start like this:'}</strong>
            <span>{de ? '„Ich weiß nicht genau, was ich brauche, aber …“' : '“I am not exactly sure what I need, but …”'}</span>
          </div>
          <Link className="btn btn-primary" href={target}>{de ? 'Unverbindlich sprechen' : 'Talk to us' } <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>
  );
}
