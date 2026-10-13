'use client';

import { useMemo, useState } from 'react';
import { Icon } from './Icon';

const questions = {
  de: [
    'Gibt es einen klaren Prozess, in dem heute Zeit verloren geht?',
    'Sind die benötigten Daten digital verfügbar?',
    'Gibt es ein messbares Ziel?',
    'Kann ein Mensch wichtige Ergebnisse prüfen?',
    'Sind relevante Systeme über Schnittstellen erreichbar?',
  ],
  en: [
    'Is there a clear process where time is currently being lost?',
    'Is the required data digitally available?',
    'Is there a measurable goal?',
    'Can a human review important outputs?',
    'Can relevant systems be accessed through interfaces?',
  ],
};

export function AIReadiness({ locale }: { locale: 'de' | 'en' }) {
  const [answers, setAnswers] = useState<Array<boolean | null>>(Array(5).fill(null));
  const copy = locale === 'de'
    ? { title: 'AI Readiness Check', intro: 'Ein Orientierungswerkzeug, keine Zertifizierung. Es hilft, die Grundlagen für einen sinnvollen AI-Use-Case sichtbar zu machen.', result: 'Bereiche zur Prüfung', reset: 'Zurücksetzen', labels: ['Prozess identifizieren', 'Datenbasis prüfen', 'Zielmetrik definieren', 'Human-in-the-loop einplanen', 'Systemintegration prüfen'] }
    : { title: 'AI Readiness Check', intro: 'An orientation tool, not a certification. It helps make the foundations for a useful AI use case visible.', result: 'Areas to investigate', reset: 'Reset', labels: ['Identify the process', 'Check the data foundation', 'Define the target metric', 'Plan human-in-the-loop', 'Check system integration'] };

  const score = useMemo(() => answers.filter(Boolean).length, [answers]);
  const answered = useMemo(() => answers.filter((value) => value !== null).length, [answers]);
  const percentage = score * 20;
  const progress = `${percentage}%`;
  const activeLabels = copy.labels.filter((_, i) => answers[i] === false || score >= 3);

  function setAnswer(index: number, value: boolean) {
    setAnswers((current) => current.map((item, i) => (i === index ? value : item)));
  }

  return (
    <div className="readiness-card">
      <div className="readiness-head">
        <div>
          <div className="eyebrow">{copy.title}</div>
          <p>{copy.intro}</p>
        </div>
        <span className="readiness-icon"><Icon name="brain" /></span>
      </div>

      <div className="readiness-live-result" aria-live="polite">
        <div className="readiness-score-block">
          <span className="readiness-score-label">{locale === 'de' ? 'Live-Score' : 'Live score'}</span>
          <strong>{percentage}<small>%</small></strong>
        </div>
        <div className="readiness-progress" aria-hidden="true">
          <div className="readiness-progress-track"><span style={{ width: progress }} /></div>
          <div className="readiness-progress-dots">
            {answers.map((answer, index) => <span key={index} className={answer === true ? 'yes' : answer === false ? 'no' : ''} />)}
          </div>
        </div>
        <span className="readiness-answered">{answered}/5 {locale === 'de' ? 'beantwortet' : 'answered'}</span>
      </div>

      <div className="readiness-questions">
        {questions[locale].map((question, i) => (
          <div className="readiness-q" key={question}>
            <div><span className="flow-index">0{i + 1}</span><span>{question}</span></div>
            <div className="yes-no">
              <button className={answers[i] === true ? 'active' : ''} onClick={() => setAnswer(i, true)} type="button">{locale === 'de' ? 'Ja' : 'Yes'}</button>
              <button className={answers[i] === false ? 'active' : ''} onClick={() => setAnswer(i, false)} type="button">{locale === 'de' ? 'Noch nicht' : 'Not yet'}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="readiness-result">
        <div className="result-score"><span>{copy.result}</span><strong>{percentage}%</strong></div>
        <div className="result-list">
          {activeLabels.length > 0 ? activeLabels.map((label) => <div key={label}><Icon name="check" />{label}</div>) : <div className="result-empty"><Icon name="spark" />{locale === 'de' ? 'Antworten auswählen, um die Bereiche live einzuordnen.' : 'Choose answers to classify the areas live.'}</div>}
        </div>
        <button className="text-btn" type="button" onClick={() => setAnswers(Array(5).fill(null) as Array<boolean | null>)}>{copy.reset} <Icon name="arrow" /></button>
      </div>
    </div>
  );
}
