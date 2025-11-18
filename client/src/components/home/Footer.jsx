import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-gradient-to-r from-white via-green-200/60 to-white mt-40 px-6 md:px-16 lg:px-24 xl:px-32 py-16 text-[13px] text-gray-500 flex flex-col gap-16">

        {/* TOP SECTION */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-16">
          
          {/* Logo */}
          <div className="col-span-2 sm:col-span-1 flex justify-center sm:justify-start">
            <a href="#">
              <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
            </a>
          </div>

          {/* Product */}
          <div>
            <p className="text-slate-800 font-semibold mb-3">Product</p>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-green-600">Home</a></li>
              <li><a href="/" className="hover:text-green-600">Support</a></li>
              <li><a href="/" className="hover:text-green-600">Pricing</a></li>
              <li><a href="/" className="hover:text-green-600">Affiliate</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-slate-800 font-semibold mb-3">Resources</p>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-green-600">Company</a></li>
              <li><a href="/" className="hover:text-green-600">Blogs</a></li>
              <li><a href="/" className="hover:text-green-600">Community</a></li>
              <li>
                <a href="/" className="hover:text-green-600">
                  Careers
                  <span className="text-xs text-white bg-green-600 rounded-md ml-2 px-2 py-0.5">
                    We’re hiring!
                  </span>
                </a>
              </li>
              <li><a href="/" className="hover:text-green-600">About</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-slate-800 font-semibold mb-3">Legal</p>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-green-600">Privacy</a></li>
              <li><a href="/" className="hover:text-green-600">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="w-full flex flex-col items-center lg:items-end text-center lg:text-right gap-3">
          
          <p className="max-w-64">
            Making every customer feel valued—no matter the size of your audience.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center justify-center lg:justify-end gap-4 mt-3 flex-wrap">
            {/* Dribbble */}
            <a href="https://dribbble.com/" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" stroke="currentColor" strokeWidth="2"
                className="size-5 hover:text-green-500">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/daniish-ansarii/"
              target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" stroke="currentColor" strokeWidth="2"
                className="size-5 hover:text-green-500">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2..."></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a href="https://x.com/" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" stroke="currentColor" strokeWidth="2"
                className="size-5 hover:text-green-500">
                <path d="M22 4s-.7 2.1-2 3.4..."></path>
              </svg>
            </a>

            {/* YouTube */}
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" stroke="currentColor" strokeWidth="2"
                className="size-6 hover:text-green-500">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10..."></path>
                <path d="m10 15 5-3-5-3z"></path>
              </svg>
            </a>
          </div>

          <p className="mt-3 text-center">© 2025 Resume Builder</p>
        </div>
      </footer>

      {/* GLOBAL POPPINS FONT */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}
      </style>
    </>
  );
};

export default Footer;