import Image from 'next/image';
import { projects } from '@/data/projects';
import { Icon } from './Icon';
import type { Locale } from '@/lib/i18n';

export function ClientProjects({ locale }: { locale: Locale }) {
  const de = locale === 'de';

  return (
    <div className="project-grid" aria-label={de ? 'Ausgewählte Kundenprojekte' : 'Selected client projects'}>
      {projects.map((project, index) => (
        <article className={`project-card project-card-${index + 1}`} key={project.id}>
          <a
            className="project-preview"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} — ${de ? 'Website öffnen' : 'Open website'}`}
          >
            <Image
              src={project.preview}
              alt={`${project.name} — ${project.description[locale]}`}
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
            />
            <span className="project-preview-badge">
              {de ? 'LIVE WEBSITE' : 'LIVE WEBSITE'} <Icon name="arrow" />
            </span>
          </a>

          <div className="project-meta-top">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span>{project.type[locale]}</span>
          </div>

          <div className="project-copy">
            <div className="project-title-row">
              <div>
                <h3>{project.name}</h3>
                <a className="project-domain" href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.domain}
                </a>
              </div>
              <span className="project-arrow" aria-hidden="true"><Icon name="arrow" /></span>
            </div>
            <p>{project.description[locale]}</p>
            <div className="project-tags" aria-label={de ? 'Projekt-Schwerpunkte' : 'Project focus areas'}>
              {project.tags[locale].map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>

          <div className="project-footer">
            <span>{de ? 'Umgesetztes Kundenprojekt' : 'Delivered client project'}</span>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {de ? 'Website besuchen' : 'Visit website'} <Icon name="arrow" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
