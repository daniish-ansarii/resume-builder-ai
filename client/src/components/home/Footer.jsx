import React from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => <footer id="contact" className="scroll-mt-20 border-t border-slate-200/80 bg-white px-5 py-8 sm:px-8">
  <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <Link to="/" aria-label="Resume home"><img src="/logo.svg" alt="Resume" className="h-9 w-auto"/></Link>
      <p className="mt-2 text-xs text-slate-500">Thoughtful tools for your next career move.</p>
    </div>
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
      <a href="#features" className="transition hover:text-green-700">Features</a>
      <a href="#templates" className="transition hover:text-green-700">Templates</a>
      <a href="#how-it-works" className="transition hover:text-green-700">How it works</a>
      <a href="#faq" className="transition hover:text-green-700">FAQ</a>
      <a href="mailto:mohddanishansari092@gmail.com" className="inline-flex items-center gap-1.5 font-medium text-green-700 transition hover:text-green-800"><Mail className="size-4"/>mohddanishansari092@gmail.com<ArrowUpRight className="size-3.5"/></a>
    </div>
  </div>
  <div className="mx-auto mt-6 max-w-6xl border-t border-slate-100 pt-4 text-xs text-slate-400">© {new Date().getFullYear()} Resume Builder AI</div>
</footer>

export default Footer
