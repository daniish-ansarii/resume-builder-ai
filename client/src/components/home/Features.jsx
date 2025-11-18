import React from 'react'
import { Zap } from 'lucide-react'
import Title from './Title'
import { motion } from "motion/react"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: "easeOut",
    },
  }),
}

const Features = () => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div id='features' className='flex flex-col items-center my-10 scroll-mt-14'>

      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
        <Zap width={14} />
        <span>Simple Process</span>
      </div>

      <Title
        title='Build your resume'
        description='Create a professional, polished resume in minutes using smart, AI-powered tools designed to improve clarity, impact, and ATS performance.'
      />

      <div className="flex flex-col md:flex-row items-center justify-center xl:-mt-10">

        <motion.img
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl w-full xl:-ml-32"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt="Resume Builder Illustration"
        />

        <div
          className="px-4 md:px-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >

          {/* CARD 1 – AI Resume Writing */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            whileHover={{ scale: 1.03, y: -4 }}
            className="flex items-center justify-center gap-6 max-w-md group cursor-pointer"
          >
            <div
              className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-4 rounded-xl transition-all duration-200 ${
                !isHover ? 'border-violet-300 bg-violet-100' : ''
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 stroke-violet-600"
              >
                <path d="M3 3h12l6 6v12a2 2 0 0 1-2 2H3z" />
                <path d="M8 12h8" />
                <path d="M8 16h6" />
              </svg>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  AI-Powered Resume Writing
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Improve clarity, rewrite bullet points, and tailor your resume instantly with AI.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CARD 2 – ATS Optimization */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            whileHover={{ scale: 1.03, y: -4 }}
            className="flex items-center justify-center gap-6 max-w-md group cursor-pointer"
          >
            <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-6 stroke-green-600"
              >
                <path d="M12 3l9 4.5v2c0 5.25-3.75 10.5-9 12-5.25-1.5-9-6.75-9-12v-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  ATS Optimization
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Improve your resume’s ATS score with keyword suggestions and formatting fixes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CARD 3 – Export Options */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            whileHover={{ scale: 1.03, y: -4 }}
            className="flex items-center justify-center gap-6 max-w-md group cursor-pointer"
          >
            <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-all duration-200">
              <svg
                className="size-6 stroke-orange-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v12" />
                <path d="M8 11l4 4 4-4" />
                <path d="M5 21h14" />
              </svg>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Instant Export Options
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Download your resume as PDF, DOCX, or TXT — ready for submission anywhere.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default Features;