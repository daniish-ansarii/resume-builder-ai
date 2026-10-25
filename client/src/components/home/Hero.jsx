import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check, Menu, Sparkles, X } from "lucide-react";

const MotionNav = motion.nav;
const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionDiv = motion.div;

export default function Hero() {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const ctaPath = user ? "/app" : "/app?state=register";
  const links = [["Features", "#features"], ["Templates", "#templates"], ["How it works", "#how-it-works"], ["FAQ", "#faq"], ["Contact", "#contact"]];

  return (
    <>
      <MotionNav initial={{opacity: 0, y: -12}} animate={{opacity: 1, y: 0}} transition={{duration: 0.45}}
        className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white/85 px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-12">
        <Link to="/" aria-label="Resume home"><img src="/logo.svg" alt="Resume" className="h-10 w-auto" /></Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#home" className="transition hover:text-green-700">Home</a>
          {links.map(([label, href]) => <a key={href} href={href} className="transition hover:text-green-700">{label}</a>)}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {!user && <Link to="/app?state=login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Login</Link>}
          <Link to={ctaPath} className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-600/15 transition hover:bg-green-600">{user ? "Dashboard" : "Get started"}</Link>
        </div>
        <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)} className="rounded-lg p-2 text-slate-700 hover:bg-green-50 md:hidden">
          {menuOpen ? <X className="size-5"/> : <Menu className="size-5"/>}
        </button>
      </MotionNav>

      {menuOpen && <div className="fixed inset-0 z-[60] bg-slate-950/25 md:hidden" onClick={() => setMenuOpen(false)}>
        <div className="absolute left-4 right-4 top-20 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl" onClick={event => event.stopPropagation()}>
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-green-50">{label}</a>)}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 p-2 pt-3">
            {!user && <Link to="/app?state=login" onClick={() => setMenuOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-700">Login</Link>}
            <Link to={ctaPath} onClick={() => setMenuOpen(false)} className="rounded-xl bg-green-500 px-4 py-2.5 text-center text-sm font-semibold text-white">{user ? "Dashboard" : "Get started"}</Link>
          </div>
        </div>
      </div>}

      <section id="home" className="relative isolate scroll-mt-20 overflow-hidden bg-gradient-to-b from-white via-green-50/70 to-white px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-10 -z-10 size-[28rem] -translate-x-1/2 rounded-full bg-green-300/35 blur-[100px]"/>
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-green-800 shadow-sm shadow-green-900/5">
            <Sparkles className="size-3.5 text-green-600"/> Your next chapter starts here
          </div>
          <MotionH1 initial={{opacity: 0, y: 18}} animate={{opacity: 1, y: 0}} transition={{duration: 0.65}}
            className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Make your experience <span className="bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">stand out.</span>
          </MotionH1>
          <MotionP initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.55, delay: 0.12}}
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            Build a polished resume with guided editing, thoughtful templates, and Gemini-powered writing help.
          </MotionP>
          <MotionDiv initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.22}} className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link to={ctaPath} className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/15 transition hover:-translate-y-0.5 hover:bg-green-600">
              Start building <ArrowRight className="size-4"/>
            </Link>
            <a href="#features" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-green-300 hover:bg-green-50">Explore features</a>
          </MotionDiv>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 sm:text-sm">
            {["10 resume templates", "AI writing assistance", "Print-ready PDF"].map(item => <span key={item} className="inline-flex items-center gap-1.5"><Check className="size-3.5 text-green-600"/>{item}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}
