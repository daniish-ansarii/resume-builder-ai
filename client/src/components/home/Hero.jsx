import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function Hero() {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const logos = [
    "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
  ];

  return (
    <>
      <div className="min-h-screen pb-20 overflow-hidden">
        {/* NAV */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm flex items-center justify-between py-4 px-6 md:px-16 lg:px-24 xl:px-40"
        >
          <a href="https://prebuiltui.com">
            <img src="/logo.svg" className="h-11 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8 text-slate-800">
            <a href="#" className="hover:text-green-600 transition">Home</a>
            <a href="#features" className="hover:text-green-600 transition">Features</a>
            <a href="#testimonials" className="hover:text-green-600 transition">Testimonials</a>
            <a href="#cta" className="hover:text-green-600 transition">Contact</a>
          </div>

          <div className="flex gap-2">
            <Link hidden={user} to="/app?state=register" className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-700 rounded-full text-white">Get started</Link>
            <Link hidden={user} to="/app?state=login" className="hidden md:block px-6 py-2 border rounded-full hover:bg-slate-50 text-slate-700">Login</Link>
            <Link hidden={!user} to="/app" className="hidden md:block px-8 py-2 bg-green-500 hover:bg-green-700 rounded-full text-white">Dashboard</Link>
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden">
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </motion.nav>

        {/* MOBILE MENU */}
        <div
          className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur flex flex-col items-center justify-center gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <a className="text-white text-lg" href="#">Home</a>
          <a className="text-white text-lg" href="#features">Features</a>
          <a className="text-white text-lg" href="#testimonials">Testimonials</a>
          <a className="text-white text-lg" href="#cta">Contact</a>

          <button
            onClick={() => setMenuOpen(false)}
            className="size-10 bg-green-600 hover:bg-green-700 rounded-md text-white flex items-center justify-center"
          >
            X
          </button>
        </div>

        {/* HERO ANIMATED SECTION */}
        <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-40 text-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 bg-green-300 blur-[100px] opacity-30"
          />

          {/* Motion Avatar Group */}
          <div className="flex items-center mt-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              className="flex -space-x-3 pr-3"
            >
              {["img1","img2","img3","img4","img5"].map((x,i)=>(
                <motion.img
                  key={i}
                  variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  className="size-8 rounded-full object-cover border-2 border-white hover:-translate-y-1 transition"
                  src={[
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
                    "https://randomuser.me/api/portraits/men/75.jpg",
                  ][i]}
                />
              ))}
            </motion.div>

            <div>
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} width="16" height="16" className="fill-green-600 text-transparent" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M11.5 2.3a.5.5 0 0 1 .9 0l2.3 4.7c.3.6.9 1 1.6 1.1l5.1.7c.5.1.7.7.3 1.1l-3.7 3.6c-.5.4-.7 1-.6 1.7l.8 5c.1.5-.4.9-.9.7l-4.6-2.3c-.6-.3-1.2-.3-1.8 0l-4.6 2.3c-.5.2-1-.2-.9-.7l.8-5c.1-.7-.1-1.3-.6-1.7L2 9.7c-.4-.4-.2-1 .3-1.1l5.1-.7c.7-.1 1.3-.5 1.6-1.1z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-700">Used by 10,000+ users</p>
            </div>
          </div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-6"
          >
            Land your dream job
            <span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent"> AI-powered </span>
            Resumes.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md text-center text-base my-7"
          >
            Create, edit and download professional resumes with AI-powered assistance.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <Link
              to="/app"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 flex items-center"
            >
              Get started
            </Link>
            <button className="flex items-center gap-2 border border-slate-400 hover:bg-green-50 rounded-full px-7 h-12 text-slate-700">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1" className="size-5">
                <path d="m16 13 5 3.4a.5.5 0 0 0 .8-.4V8a.5.5 0 0 0-.8-.4L16 11.5" />
                <rect x="2" y="6" width="14" height="12" rx="2" />
              </svg>
              Try demo
            </button>
          </motion.div>

          <p className="py-6 text-slate-600 mt-14">Trusted by leading brands</p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto"
          >
            {logos.map((logo, i) => (
              <img key={i} src={logo} className="h-6 w-auto" />
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
    </>
  );
}
