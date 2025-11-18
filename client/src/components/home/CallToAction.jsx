import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <motion.div
      id="cta"
      className="border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-28"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Inner Box */}
      <motion.div
        className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Text */}
        <motion.p
          className="text-xl font-medium max-w-md text-slate-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Build a Professional Resume That Helps You Stand Out and Get Hired.
        </motion.p>

        {/* Button */}
        <motion.a
          href="/"
          className="flex items-center gap-2 rounded py-3 px-8 bg-green-600 hover:bg-green-700 transition text-white"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Get Started</span>

          {/* Arrow Animation */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </motion.svg>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default CallToAction;
