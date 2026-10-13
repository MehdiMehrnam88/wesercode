export function SectionHeading({ eyebrow, title, lead, align = 'left' }: { eyebrow?: string; title: string; lead?: string; align?: 'left' | 'center' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'align-center' : ''}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}
