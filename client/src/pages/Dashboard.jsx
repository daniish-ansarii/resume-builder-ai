import { ArrowRightIcon, Clock3Icon, FilePenIcon, FileTextIcon, LayoutTemplateIcon, LoaderCircleIcon, PencilIcon, PlusIcon, SearchIcon, SparklesIcon, TrashIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { pdfjs } from 'react-pdf'
import { motion } from 'framer-motion'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

const extractPdfText = async (file) => {
  const pdfUrl = URL.createObjectURL(file)
  const loadingTask = pdfjs.getDocument(pdfUrl)
  try {
    const pdf = await loadingTask.promise
    const pages = []
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber)
      const content = await page.getTextContent()
      pages.push(content.items.map(item => ('str' in item ? item.str : '')).join(' '))
    }
    return pages.join('\n\n--- Page break ---\n\n')
  } finally {
    URL.revokeObjectURL(pdfUrl)
    await loadingTask.destroy()
  }
}

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionArticle = motion.article;

const Dashboard = () => {
  const {user, token} = useSelector(state => state.auth)
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [importStage, setImportStage] = useState('')
  const [isLoadingResumes, setIsLoadingResumes] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const navigate = useNavigate()

  const loadAllResumes = useCallback(async () => {
    try {
      const { data } = await api.get('/api/users/resumes', {headers: {Authorization: token}})
      setAllResumes(data?.resumes || [])
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoadingResumes(false)
    }
  }, [token])

  useEffect(() => { loadAllResumes() }, [loadAllResumes])

  const filteredResumes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return allResumes.filter(item => {
      const matchesFilter = activeFilter === 'all' || (activeFilter === 'public' ? item.public : !item.public)
      const matchesSearch = !query || `${item.title || ''} ${item.personal_info?.profession || ''} ${item.personal_info?.full_name || ''}`.toLowerCase().includes(query)
      return matchesFilter && matchesSearch
    }).sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
  }, [allResumes, searchTerm, activeFilter])

  const createResume = async (event) => {
    event.preventDefault()
    try {
      const { data } = await api.post('/api/resumes/create', {title}, {headers: {Authorization: token}})
      setAllResumes(previous => [data.resume, ...previous])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    if (!resume) return toast.error('Choose a PDF resume first.')
    setIsLoading(true)
    setImportStage('reading')
    try {
      const resumeText = await extractPdfText(resume)
      if (!resumeText?.trim()) {
        toast.error('This PDF has no selectable text. Try a text-based PDF instead of a scanned image.')
        return
      }
      setImportStage('extracting')
      const { data } = await api.post('/api/ai/upload-resume', {title, resumeText}, {headers: {Authorization: token}})
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
      setImportStage('')
    }
  }

  const editTitle = async (event) => {
    event.preventDefault()
    try {
      const { data } = await api.put('/api/resumes/update', {resumeId: editResumeId, resumeData: {title}}, {headers: {Authorization: token}})
      setAllResumes(previous => previous.map(item => item._id === editResumeId ? {...item, title} : item))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return
    try {
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {headers: {Authorization: token}})
      setAllResumes(previous => previous.filter(item => item._id !== resumeId))
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const publicCount = allResumes.filter(item => item.public).length
  const privateCount = allResumes.length - publicCount
  const greetingName = user?.name?.trim().split(/\s+/)[0] || 'there'
  const formattedDate = new Intl.DateTimeFormat(undefined, {weekday: 'long', month: 'long', day: 'numeric'}).format(new Date())
  const filters = [
    ['all', `All resumes · ${allResumes.length}`],
    ['private', `Private · ${privateCount}`],
    ['public', `Public · ${publicCount}`],
  ]

  const closeModal = (setter) => (event) => {
    if (event.target === event.currentTarget) setter(false)
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#f7f8fc] px-4 py-7 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <MotionSection initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} className="relative isolate overflow-hidden rounded-[28px] border border-emerald-100 bg-gradient-to-br from-white via-lime-50 to-emerald-100 px-6 py-7 text-slate-900 shadow-xl shadow-emerald-900/5 sm:px-10 sm:py-9">
          <div className="pointer-events-none absolute -right-10 -top-24 -z-10 size-72 rounded-full bg-lime-300/50 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-7rem] right-1/3 -z-10 size-64 rounded-full bg-emerald-300/45 blur-3xl" />
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700"><SparklesIcon className="size-4"/> Resume workspace <span className="text-emerald-300">/</span> {formattedDate}</p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Good to see you, {greetingName}.</h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">Build a resume that opens doors. Pick up where you left off or start a fresh one.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowCreateResume(true)} className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-600"><PlusIcon className="size-4"/> Create resume</button>
              <button onClick={() => setShowUploadResume(true)} className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white/75 px-4 py-3 text-sm font-medium text-emerald-900 transition hover:bg-white"><UploadCloudIcon className="size-4"/> Import PDF</button>
            </div>
          </div>
        </MotionSection>

        <section aria-label="Resume overview" className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            {label: 'Total resumes', value: allResumes.length, icon: FileTextIcon, tint: 'bg-lime-50 text-lime-700'},
            {label: 'Private drafts', value: privateCount, icon: FilePenIcon, tint: 'bg-teal-50 text-teal-700'},
            {label: 'Shared publicly', value: publicCount, icon: LayoutTemplateIcon, tint: 'bg-emerald-50 text-emerald-600'},
          ].map((stat, index) => <MotionDiv key={stat.label} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: index * 0.06}} className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/[0.02]">
            <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${stat.tint}`}><stat.icon className="size-5"/></div>
            <div><p className="text-2xl font-semibold tracking-tight text-slate-900">{stat.value}</p><p className="text-xs text-slate-500">{stat.label}</p></div>
          </MotionDiv>)}
        </section>

        <section className="mt-9">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">Your library</p><h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Your resumes</h2><p className="mt-1 text-sm text-slate-500">Manage and refine every version in one place.</p></div>
            <label className="flex h-11 w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 text-slate-400 shadow-sm sm:max-w-xs">
              <SearchIcon className="size-4 shrink-0"/><input aria-label="Search resumes" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Search by title or role" className="!h-full !w-full !border-0 !bg-transparent !p-0 text-sm text-slate-700 !shadow-none focus:!ring-0"/>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200">
            <div className="flex gap-5 overflow-x-auto">{filters.map(([id, label]) => <button key={id} onClick={() => setActiveFilter(id)} className={`whitespace-nowrap border-b-2 px-0.5 pb-3 text-sm transition ${activeFilter === id ? 'border-emerald-600 font-semibold text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>{label}</button>)}</div>
            <div className="mb-2 hidden items-center gap-1.5 text-xs text-slate-400 sm:flex"><Clock3Icon className="size-3.5"/> Recently updated</div>
          </div>

          {isLoadingResumes ? <div className="flex min-h-48 items-center justify-center text-sm text-slate-400"><LoaderCircleIcon className="mr-2 size-4 animate-spin"/> Loading your resumes…</div> : filteredResumes.length ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResumes.map((item, index) => {
                const colors = ['#00b85a', '#05a86b', '#22c55e', '#00a878', '#65a30d', '#0b9b50']
                const color = colors[index % colors.length]
                return <MotionArticle key={item._id} initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} transition={{delay: Math.min(index * 0.04, 0.2)}} onClick={() => navigate(`/app/builder/${item._id}`)} onKeyDown={event => event.key === 'Enter' && navigate(`/app/builder/${item._id}`)} role="button" tabIndex={0} className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-900/[0.07]">
                  <div className="relative h-28 overflow-hidden px-5 py-4" style={{background: `linear-gradient(135deg, ${color}12, ${color}25)`}}>
                    <div className="absolute -right-5 -top-10 size-36 rounded-full opacity-70 blur-2xl" style={{backgroundColor: `${color}25`}}/>
                    <div className="relative flex items-start justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-white/80 shadow-sm" style={{color}}><FileTextIcon className="size-5"/></span>
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${item.public ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-white/80 bg-white/75 text-slate-500'}`}>{item.public ? 'Public link' : 'Private draft'}</span>
                    </div>
                    <div className="absolute bottom-0 left-5 right-5 h-px bg-white/70"/>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0"><h3 className="truncate font-semibold text-slate-900 group-hover:text-emerald-800">{item.title || 'Untitled resume'}</h3><p className="mt-1 truncate text-xs text-slate-500">{item.personal_info?.profession || 'Add a professional title'}</p></div>
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium capitalize text-slate-600">{(item.template || 'classic').replace('-', ' ')}</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-[11px] text-slate-400">Updated {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'recently'}</span>
                      <div className="flex items-center gap-1" onClick={event => event.stopPropagation()}>
                        <button aria-label={`Rename ${item.title}`} title="Rename" onClick={() => {setEditResumeId(item._id); setTitle(item.title || '')}} className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700"><PencilIcon className="size-4"/></button>
                        <button aria-label={`Delete ${item.title}`} title="Delete" onClick={() => deleteResume(item._id)} className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"><TrashIcon className="size-4"/></button>
                        <span className="ml-1 flex size-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition group-hover:bg-emerald-600 group-hover:text-white"><ArrowRightIcon className="size-4"/></span>
                      </div>
                    </div>
                  </div>
                </MotionArticle>
              })}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><FileTextIcon className="size-6"/></div>
              <h3 className="mt-4 font-semibold text-slate-900">{allResumes.length ? 'No matching resumes' : 'Your next chapter starts here'}</h3>
              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">{allResumes.length ? 'Try another search or choose a different filter.' : 'Create a polished resume from scratch or import a PDF to get started.'}</p>
              {!allResumes.length && <button onClick={() => setShowCreateResume(true)} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"><PlusIcon className="size-4"/> Create your first resume</button>}
            </div>
          )}
        </section>
      </div>

      {showCreateResume && <form onSubmit={createResume} onClick={closeModal(setShowCreateResume)} className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
        <MotionDiv initial={{opacity: 0, scale: 0.96}} animate={{opacity: 1, scale: 1}} className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl" onClick={event => event.stopPropagation()}>
          <button type="button" aria-label="Close" className="absolute right-5 top-5 rounded-lg p-2 text-slate-400 hover:bg-slate-100" onClick={() => {setShowCreateResume(false); setTitle('')}}><XIcon className="size-4"/></button>
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><PlusIcon className="size-5"/></div>
          <h2 className="text-xl font-semibold text-slate-900">Create a resume</h2><p className="mt-1 text-sm text-slate-500">Give this version a name. You can change it later.</p>
          <input autoFocus onChange={event => setTitle(event.target.value)} value={title} type="text" placeholder="e.g. Product Designer 2026" className="mt-5 w-full px-4 py-3 text-sm" required/>
          <button className="mt-4 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">Continue to editor</button>
        </MotionDiv>
      </form>}

      {showUploadResume && <form onSubmit={uploadResume} onClick={closeModal(setShowUploadResume)} className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
        <MotionDiv initial={{opacity: 0, scale: 0.96}} animate={{opacity: 1, scale: 1}} className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl" onClick={event => event.stopPropagation()}>
          <button type="button" aria-label="Close" className="absolute right-5 top-5 rounded-lg p-2 text-slate-400 hover:bg-slate-100" onClick={() => {setShowUploadResume(false); setTitle(''); setResume(null)}}><XIcon className="size-4"/></button>
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-lime-50 text-lime-700"><UploadCloudIcon className="size-5"/></div>
          <h2 className="text-xl font-semibold text-slate-900">Import an existing resume</h2><p className="mt-1 text-sm text-slate-500">A fast Gemini model extracts your details and creates an editable draft.</p>
          <input onChange={event => setTitle(event.target.value)} value={title} type="text" placeholder="Resume title" className="mt-5 w-full px-4 py-3 text-sm" required/>
          <label htmlFor="resume-input" className="mt-4 flex cursor-pointer flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-7 text-center transition hover:border-lime-400 hover:bg-lime-50/50">
            <UploadCloudIcon className="size-7 text-lime-600"/><span className="mt-2 text-sm font-medium text-slate-700">{resume?.name || 'Choose a PDF file'}</span><span className="mt-1 text-xs text-slate-400">PDF format</span>
          </label>
          <input type="file" id="resume-input" accept="application/pdf,.pdf" hidden onChange={event => setResume(event.target.files?.[0] || null)}/>
          {isLoading && <p role="status" className="mt-3 text-center text-xs text-slate-500">{importStage === 'reading' ? 'Reading your PDF…' : 'Gemini is organizing your resume details…'}</p>}
          <button disabled={isLoading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">{isLoading && <LoaderCircleIcon className="size-4 animate-spin"/>}{isLoading ? (importStage === 'reading' ? 'Reading PDF…' : 'Extracting details…') : 'Import and continue'}</button>
        </MotionDiv>
      </form>}

      {editResumeId && <form onSubmit={editTitle} onClick={closeModal(setEditResumeId)} className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
        <MotionDiv initial={{opacity: 0, scale: 0.96}} animate={{opacity: 1, scale: 1}} className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl" onClick={event => event.stopPropagation()}>
          <button type="button" aria-label="Close" className="absolute right-5 top-5 rounded-lg p-2 text-slate-400 hover:bg-slate-100" onClick={() => {setEditResumeId(''); setTitle('')}}><XIcon className="size-4"/></button>
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><PencilIcon className="size-5"/></div>
          <h2 className="text-xl font-semibold text-slate-900">Rename resume</h2><p className="mt-1 text-sm text-slate-500">Use a title that helps you find this version later.</p>
          <input autoFocus onChange={event => setTitle(event.target.value)} value={title} type="text" placeholder="Resume title" className="mt-5 w-full px-4 py-3 text-sm" required/>
          <button className="mt-4 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">Save title</button>
        </MotionDiv>
      </form>}
    </main>
  )
}

export default Dashboard
