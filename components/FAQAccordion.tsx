export function FAQAccordion({ items }: { items: readonly (readonly [string, string])[] }) {
  return <div className="faq-list">
    {items.map(([question, answer], index) => <details className="faq-item" key={question} open={index === 0}>
      <summary className="faq-question"><span>{question}</span><span className="faq-plus" aria-hidden="true">+</span></summary>
      <div className="faq-answer"><p>{answer}</p></div>
    </details>)}
  </div>;
}
