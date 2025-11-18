import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <motion.footer
        className="
          w-full 
          flex flex-col md:flex-row 
          justify-between 
          items-start md:items-center
          gap-12 md:gap-20 
          py-16 px-6 md:px-16 lg:px-24 xl:px-32
          text-[14px] text-gray-600 
          bg-gradient-to-r from-white via-green-200/60 to-white 
          mt-32
        "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* LEFT SECTION */}
        <div className="w-full flex flex-wrap gap-10 justify-center md:justify-start">
          {/* Logo */}
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <img src="/logo.svg" className="h-12 w-auto" />
          </div>

          {/* Link Groups */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 w-full md:w-auto text-center md:text-left">

            {/* Product */}
            <div>
              <h3 className="text-slate-800 font-semibold">Product</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="/" className="hover:text-green-600">Home</a></li>
                <li><a href="/" className="hover:text-green-600">Support</a></li>
                <li><a href="/" className="hover:text-green-600">Pricing</a></li>
                <li><a href="/" className="hover:text-green-600">Affiliate</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-slate-800 font-semibold">Resources</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="/" className="hover:text-green-600">Company</a></li>
                <li><a href="/" className="hover:text-green-600">Blogs</a></li>
                <li><a href="/" className="hover:text-green-600">Community</a></li>
                <li>
                  <a href="/" className="hover:text-green-600">
                    Careers
                    <span className="text-xs text-white bg-green-600 rounded-md ml-2 px-2 py-1">
                      Hiring!
                    </span>
                  </a>
                </li>
                <li><a href="/" className="hover:text-green-600">About</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-slate-800 font-semibold">Legal</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="/" className="hover:text-green-600">Privacy</a></li>
                <li><a href="/" className="hover:text-green-600">Terms</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-auto flex flex-col items-center md:items-end text-center md:text-right">
          <p className="max-w-60">
            Making job hunting easier—helping every user build a resume with impact.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            {[
              {
                href: "https://dribbble.com/",
                svg: (
                  <>
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                    <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
                  </>
                ),
              },
              {
                href: "https://www.linkedin.com/in/daniish-ansarii/",
                svg: (
                  <>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </>
                ),
              },
              {
                href: "https://x.com/",
                svg: (
                  <>
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </>
                ),
              },
              {
                href: "https://www.youtube.com/",
                svg: (
                  <>
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </>
                ),
              },
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                className="hover:text-green-600"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.svg}
                </svg>
              </motion.a>
            ))}
          </div>

          <p className="text-sm mt-4">© 2025 Resume Builder</p>
        </div>
      </motion.footer>

      {/* FONT */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
    </>
  );
};

export default Footer;