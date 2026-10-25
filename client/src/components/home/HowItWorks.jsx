import React from 'react'
import { FilePlus2, PenLine, Printer } from 'lucide-react'
import { motion } from 'motion/react'

const MotionArticle = motion.article;

const steps = [
  {number: '01', icon: FilePlus2, title: 'Add your experience', description: 'Start with a blank resume or import a PDF to bring your details into the editor.'},
  {number: '02', icon: PenLine, title: 'Make it yours', description: 'Refine each section, ask Gemini to improve wording, and choose a layout that fits.'},
  {number: '03', icon: Printer, title: 'Review and save', description: 'Preview the finished page and print it or save it as a PDF.'},
]

const Testimonial = () => <section id="how-it-works" className="scroll-mt-24 bg-[#f8fcf8] px-5 py-12 sm:px-8 sm:py-16">
  <div className="mx-auto max-w-6xl">
    <div className="max-w-xl">
      <span className="inline-flex rounded-full bg-green-100/70 px-3 py-1 text-xs font-semibold tracking-wide text-green-800">Simple by design</span>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">From first draft to ready to share.</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">A guided process keeps the work clear, while you stay in control of every detail.</p>
    </div>
    <div className="mt-8 grid gap-3 md:grid-cols-3">
      {steps.map(({number, icon, title, description}, index) => <MotionArticle key={number} initial={{opacity: 0, y: 12}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.4, delay: index * 0.08}} className="relative rounded-2xl border border-green-900/[0.06] bg-white p-5 shadow-sm shadow-green-950/[0.02] sm:p-6">
        <div className="flex items-center justify-between"><span className="text-xs font-semibold tracking-[0.18em] text-green-700">{number}</span><span className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-green-700">{React.createElement(icon, {className: "size-5"})}</span></div>
        <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      </MotionArticle>)}
    </div>
  </div>
</section>

export default Testimonial
