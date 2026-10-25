import React from 'react'
import { ExternalLink } from 'lucide-react'
import { getExternalUrl } from '../../utils/resumeLinks'

const ResumePublications = ({items = [], accentColor, className = 'mb-6', headingClassName = 'mb-4 text-xl font-semibold'}) => {
  if (!items?.length) return null
  return <section className={className}>
    <h2 className={headingClassName} style={{color: accentColor}}>PUBLICATIONS</h2>
    <div className="space-y-4">
      {items.map((publication, index) => {
        const link = getExternalUrl(publication.url)
        return <article key={`${publication.title}-${index}`} className="break-inside-avoid">
          <h3 className="font-semibold text-slate-900">{publication.title || 'Publication'}</h3>
          <p className="mt-0.5 text-sm text-slate-600">{[publication.authors, publication.publisher, publication.date].filter(Boolean).join(' · ')}</p>
          {publication.description && <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-600">{publication.description}</p>}
          {link && <a href={link} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm font-medium hover:underline" style={{color: accentColor}}>View publication <ExternalLink className="size-3.5"/></a>}
        </article>
      })}
    </div>
  </section>
}

export default ResumePublications
