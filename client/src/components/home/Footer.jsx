import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      className="
        w-full
        flex flex-col lg:flex-row
        justify-between
        items-start
        gap-14 lg:gap-20
        py-12 px-6 md:px-12 lg:px-20
        text-[13px] text-gray-600
        bg-gradient-to-r from-white via-green-200/60 to-white
        mt-24
      "
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* LEFT SECTION */}
      <motion.div
        className="
          w-full
          grid grid-cols-2 sm:grid-cols-3
          gap-10
          text-center sm:text-left
        "
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          className="col-span-2 sm:col-span-1 flex justify-center sm:justify-start"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
        </motion.a>

        {/* Features */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <h4 className="font-semibold mb-3 text-gray-800">Features</h4>
          <ul className="space-y-2">
            <li>AI Resume Builder</li>
            <li>Templates</li>
            <li>Cover Letters</li>
            <li>Portfolio Tools</li>
          </ul>
        </motion.div>

        {/* Support */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <h4 className="font-semibold mb-3 text-gray-800">Support</h4>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </motion.div>

        {/* Company — REMOVED */}
      </motion.div>

      {/* RIGHT SECTION */}
      <motion.div
        className="
          w-full
          flex flex-col items-center lg:items-end
          text-center lg:text-right
          gap-3
        "
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h4 className="font-semibold text-gray-800">Stay Updated</h4>
        <p className="max-w-xs">
          Subscribe to get updates on new templates, AI features, and job tips.
        </p>

        {/* Email */}
        <div className="flex w-full max-w-xs gap-2 mt-2">
          <input
            type="email"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
            placeholder="Enter your email"
          />
          <button className="px-4 py-2 bg-black text-white rounded-md text-sm">
            Join
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center lg:justify-end gap-4 mt-3 flex-wrap">
          <a href="#" className="hover:text-black transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-black transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-black transition">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-black transition">
            <Linkedin size={20} />
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          © {new Date().getFullYear()} ResumeBuilderAI — All Rights Reserved
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;