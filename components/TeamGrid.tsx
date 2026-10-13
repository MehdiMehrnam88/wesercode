import Image from 'next/image';
import { teamMembers } from '@/data/team';
import { Icon } from './Icon';
import type { Locale } from '@/lib/i18n';

export function TeamGrid({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  return (
    <div className="team-grid team-grid-4" aria-label={de ? 'Teamprofile' : 'Team profiles'}>
      {teamMembers.map((member, index) => (
        <article className={`team-card ${member.kind === 'owner' ? 'team-card-owner' : ''}`} key={member.id}>
          <div className="team-card-top">
            <span className="team-index">0{index + 1}</span>
            <span className="team-signal"><i />{member.kind === 'owner' ? (de ? 'INHABER' : 'SOLE PROPRIETOR') : (de ? 'TEAM' : 'TEAM')}</span>
          </div>
          <div className="team-photo-wrap">
            <Image
              className="team-photo"
              src={member.photo}
              alt={`${member.name} — ${de ? member.role.de : member.role.en}`}
              fill
              sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 25vw"
            />
            <span className="team-photo-overlay" aria-hidden="true"><Icon name={member.kind === 'owner' ? 'spark' : 'layers'} /></span>
          </div>
          <div className="team-card-meta">
            <div className="team-name-row">
              <h3>{member.name}</h3>
              <span className="team-status-dot" aria-hidden="true" />
            </div>
            <p className="team-role">{de ? member.role.de : member.role.en}</p>
            <p className="team-bio">{de ? member.bio.de : member.bio.en}</p>
            <div className="team-tags" aria-label={de ? 'Schwerpunkte' : 'Focus areas'}>
              {member.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
          <div className="team-card-footer">
            <span>{member.kind === 'owner' ? (de ? 'WeserCode' : 'WeserCode') : (de ? 'WeserCode Team' : 'WeserCode team')}</span>
            <span aria-hidden="true">↗</span>
          </div>
        </article>
      ))}
    </div>
  );
}
