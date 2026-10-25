import React from 'react'
import { ArrowUpRight, FileUp, LayoutTemplate, WandSparkles } from 'lucide-react'
import Title from './Title'
import { motion } from 'motion/react'

const MotionArticle = motion.article;

const features = [
  {icon: FileUp, title: 'Start with your story', description: 'Build each section at your own pace, or import a PDF and let Gemini organize the details.', tone: 'bg-lime-50 text-lime-700'},
  {icon: WandSparkles, title: 'Write with more confidence', description: 'Use Gemini to sharpen your professional summary and turn experience into clear, focused copy.', tone: 'bg-emerald-50 text-emerald-700'},
  {icon: LayoutTemplate, title: 'Find your style', description: 'Choose from ten layouts, switch colors, and see your resume update as you edit.', tone: 'bg-green-50 text-green-700'},
]

const Features = () => <section id="features" className="scroll-mt-24 bg-white px-5 py-12 sm:px-8 sm:py-16">
  <div className="mx-auto max-w-6xl">
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold tracking-wide text-green-700">A clearer way to build</span>
      <Title title="Everything you need to get started" description="A focused workspace to shape your experience into a resume that feels like you."/>
    </div>
    <div className="mt-9 grid gap-4 md:grid-cols-3">
      {features.map(({icon, title, description, tone}, index) => <MotionArticle key={title} initial={{opacity: 0, y: 14}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.4, delay: index * 0.08}} className="group rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/70 p-5 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-lg hover:shadow-green-900/[0.04] sm:p-6">
        <div className={`flex size-11 items-center justify-center rounded-xl ${tone}`}>{React.createElement(icon, {className: "size-5"})}</div>
        <h3 className="mt-5 flex items-center gap-2 font-semibold text-slate-900">{title}<ArrowUpRight className="size-4 text-slate-300 transition group-hover:text-green-600"/></h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      </MotionArticle>)}
    </div>
  </div>
</section>

export default Features
