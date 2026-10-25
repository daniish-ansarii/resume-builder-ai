import React from 'react'
import { ArrowRight, Check, FileText, LayoutTemplate, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const templateStyles = [
  { name: 'Modern', label: 'Clean & confident', accent: '#16a34a', style: 'modern' },
  { name: 'Executive', label: 'Structured & sharp', accent: '#0f766e', style: 'executive' },
  { name: 'Creative', label: 'Expressive & clear', accent: '#65a30d', style: 'creative' },
  { name: 'Minimal', label: 'Simple & focused', accent: '#15803d', style: 'minimal' },
]

const questions = [
  { question: 'Can I import a resume I already have?', answer: 'Yes. Upload a text-based PDF and the builder will extract its content into editable resume sections. Review the imported details before saving.' },
  { question: 'How does Gemini help with writing?', answer: 'Gemini can help refine your professional summary and experience descriptions. You can review and edit every suggestion.' },
  { question: 'Can I change the design after I start?', answer: 'Yes. Choose another template or accent color in the editor and preview the changes as you work.' },
  { question: 'How do I save a copy of my resume?', answer: 'Open the resume preview and use the print option in your browser to print or save it as a PDF.' },
]

const MiniResume = ({ accent, style }) => <div className={`h-36 overflow-hidden rounded-lg border border-slate-200 bg-white p-3 ${style === 'creative' ? 'grid grid-cols-[28%_1fr] gap-2' : ''}`}>
  {style === 'creative' && <div className="rounded-sm bg-slate-100 p-1.5"><div className="h-1 w-7 rounded" style={{backgroundColor: accent}}/><div className="mt-3 h-1 w-8 rounded bg-slate-300"/><div className="mt-1 h-1 w-6 rounded bg-slate-200"/><div className="mt-3 h-1 w-7 rounded bg-slate-200"/></div>}
  <div className={style === 'creative' ? '' : ''}>
    <div className={`mb-2 ${style === 'executive' ? 'border-l-2 pl-2' : style === 'minimal' ? 'border-b pb-2 text-center' : ''}`} style={{borderColor: accent}}>
      <div className="h-2.5 w-20 rounded-sm bg-slate-800"/><div className="mt-1.5 h-1 w-14 rounded" style={{backgroundColor: accent}}/>
    </div>
    <div className="mb-2 flex gap-1"><span className="h-1 w-8 rounded bg-slate-200"/><span className="h-1 w-10 rounded bg-slate-200"/><span className="h-1 w-7 rounded bg-slate-200"/></div>
    {[0, 1, 2].map(row => <div key={row} className="mb-2"><div className="mb-1 h-1 w-12 rounded" style={{backgroundColor: accent}}/><div className="h-1 w-full rounded bg-slate-200"/><div className="mt-1 h-1 w-4/5 rounded bg-slate-100"/></div>)}
  </div>
</div>

const ShowcaseAndFaq = () => {
  const { user } = useSelector(state => state.auth)
  const ctaPath = user ? '/app' : '/app?state=register'

  return <>
    <section id="templates" className="scroll-mt-24 bg-[#f8fcf8] px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100/70 px-3 py-1 text-xs font-semibold text-green-800"><LayoutTemplate className="size-3.5"/> Find your format</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">A layout that lets your experience lead.</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">Explore different resume styles, then choose the one that fits the role and your way of working.</p>
          </div>
          <Link to={ctaPath} className="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-800 transition hover:border-green-400 hover:bg-green-50">Explore in the editor <ArrowRight className="size-4"/></Link>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templateStyles.map(template => <article key={template.name} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <MiniResume accent={template.accent} style={template.style}/>
            <div className="mt-4 flex items-center justify-between gap-2"><div><h3 className="font-semibold text-slate-900">{template.name}</h3><p className="mt-0.5 text-xs text-slate-500">{template.label}</p></div><span className="size-3 rounded-full" style={{backgroundColor: template.accent}}/></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="bg-white px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-lime-50 px-3 py-1 text-xs font-semibold text-green-800"><Sparkles className="size-3.5"/> Keep your story yours</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">A little structure. Room to make it your own.</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">Start with the details you already have, organize them into clear sections, and refine the wording as you go. Your resume stays editable throughout.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            {['Bring in details from a PDF or start fresh', 'Edit experience, skills, education, projects, and publications', 'Preview your resume while you work'].map(item => <li key={item} className="flex items-start gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-green-600"/>{item}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-lime-50 p-5 sm:p-8">
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-green-950/[0.06] sm:p-7">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4"><div><div className="h-4 w-36 rounded bg-slate-800"/><div className="mt-2 h-2 w-24 rounded bg-green-600"/></div><FileText className="size-5 text-green-600"/></div>
            <div className="mt-5"><div className="mb-2 h-2 w-16 rounded bg-green-700"/><div className="h-1.5 w-full rounded bg-slate-200"/><div className="mt-1.5 h-1.5 w-5/6 rounded bg-slate-100"/></div>
            <div className="mt-5"><div className="mb-3 h-2 w-20 rounded bg-green-700"/>{[0, 1].map(item => <div key={item} className="mb-3 border-l-2 border-green-200 pl-3"><div className="h-2 w-28 rounded bg-slate-700"/><div className="mt-2 h-1.5 w-full rounded bg-slate-200"/><div className="mt-1.5 h-1.5 w-4/5 rounded bg-slate-100"/></div>)}</div>
            <div className="mt-5"><div className="mb-2 h-2 w-12 rounded bg-green-700"/><div className="flex flex-wrap gap-1.5">{['Research', 'Planning', 'Writing'].map(tag => <span key={tag} className="rounded-full bg-green-50 px-2 py-1 text-[9px] font-medium text-green-800">{tag}</span>)}</div></div>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" className="scroll-mt-24 bg-[#f8fcf8] px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center"><span className="inline-flex rounded-full bg-green-100/70 px-3 py-1 text-xs font-semibold text-green-800">A few helpful answers</span><h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Questions before you begin?</h2><p className="mt-3 text-sm text-slate-600 sm:text-base">Here’s what to expect from the resume builder.</p></div>
        <div className="mt-8 space-y-3">{questions.map(({question, answer}) => <details key={question} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 open:border-green-200 open:shadow-sm"><summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-slate-900 marker:hidden">{question}<span className="float-right text-lg leading-4 text-green-700 transition group-open:rotate-45">+</span></summary><p className="pt-3 text-sm leading-relaxed text-slate-600">{answer}</p></details>)}</div>
      </div>
    </section>
  </>
}

export default ShowcaseAndFaq
