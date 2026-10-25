import React from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CallToAction = () => {
  const {user} = useSelector(state => state.auth)
  return <section className="px-5 py-10 sm:px-8 sm:py-14">
    <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 rounded-3xl border border-green-100 bg-gradient-to-r from-lime-100/80 via-green-50 to-white p-6 sm:flex-row sm:items-center sm:p-9">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">A little help goes a long way</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Questions or ideas for a template?</h2>
        <p className="mt-2 text-sm text-slate-600">Email me directly. I’d be glad to hear from you.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href="mailto:mohddanishansari092@gmail.com?subject=Resume%20Builder%20question" className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-green-400 hover:text-green-800"><Mail className="size-4 text-green-700"/> Email Danish</a>
        <Link to={user ? '/app' : '/app?state=register'} className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600">{user ? 'Open dashboard' : 'Build a resume'}<ArrowRight className="size-4"/></Link>
      </div>
    </div>
  </section>
}

export default CallToAction
