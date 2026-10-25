import { Plus, Trash2 } from 'lucide-react'
import React from 'react'

const PublicationsForm = ({data = [], onChange}) => {
  const addPublication = () => onChange([...data, {title: '', authors: '', publisher: '', date: '', url: '', description: ''}])
  const updatePublication = (index, field, value) => onChange(data.map((item, itemIndex) => itemIndex === index ? {...item, [field]: value} : item))
  const removePublication = (index) => onChange(data.filter((_, itemIndex) => itemIndex !== index))

  return <div className="space-y-5">
    <div className="flex items-start justify-between gap-3">
      <div><h3 className="text-lg font-semibold text-gray-900">Publications</h3><p className="text-sm text-gray-500">Add papers, articles, conference talks, or other published work.</p></div>
      <button type="button" onClick={addPublication} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-sm text-green-700 transition hover:bg-green-200"><Plus className="size-4"/> Add</button>
    </div>

    {data.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">No publications yet. Imported publications from your PDF will appear here.</div> : <div className="space-y-4">
      {data.map((publication, index) => <article key={`${publication.title}-${index}`} className="space-y-3 rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between"><h4 className="text-sm font-medium text-slate-700">Publication #{index + 1}</h4><button type="button" aria-label={`Remove publication ${index + 1}`} onClick={() => removePublication(index)} className="rounded p-1 text-red-500 hover:bg-red-50"><Trash2 className="size-4"/></button></div>
        <input value={publication.title || ''} onChange={event => updatePublication(index, 'title', event.target.value)} placeholder="Publication title" className="w-full px-3 py-2 text-sm"/>
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={publication.authors || ''} onChange={event => updatePublication(index, 'authors', event.target.value)} placeholder="Authors" className="w-full px-3 py-2 text-sm"/>
          <input value={publication.publisher || ''} onChange={event => updatePublication(index, 'publisher', event.target.value)} placeholder="Journal, conference, or publisher" className="w-full px-3 py-2 text-sm"/>
          <input value={publication.date || ''} onChange={event => updatePublication(index, 'date', event.target.value)} placeholder="Publication date or year" className="w-full px-3 py-2 text-sm"/>
          <input type="url" value={publication.url || ''} onChange={event => updatePublication(index, 'url', event.target.value)} placeholder="Publication link (optional)" className="w-full px-3 py-2 text-sm"/>
        </div>
        <textarea rows={2} value={publication.description || ''} onChange={event => updatePublication(index, 'description', event.target.value)} placeholder="Short description (optional)" className="w-full px-3 py-2 text-sm"/>
      </article>)}
    </div>}
  </div>
}

export default PublicationsForm
