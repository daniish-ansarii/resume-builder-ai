import React from "react";
import Title from "./Title";
import { BookUserIcon } from "lucide-react";
import { motion } from "motion/react";

const Testimonial = () => {
  const cardsData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@briarmartin",
      text: "This resume builder helped me land interviews within a week. The templates are clean, professional, and super easy to customize.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@averywrites",
      text: "I’ve tried many resume tools, but this one is the fastest. The AI suggestions improved my job description bullet points instantly.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      handle: "@jordanlee",
      text: "The ATS-friendly formatting score feature really made a difference. My resume finally passed every company filter.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Sophia Carter",
      handle: "@sophiacodes",
      text: "Simple, clean, and effective. I created my resume in under 10 minutes and got great feedback from recruiters.",
    },
  ];

  // CARD COMPONENT — fully animated
  const CreateCard = ({ card, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
      }}
      className="p-4 rounded-lg mx-4 shadow bg-white hover:shadow-lg transition-all duration-200 w-72 shrink-0"
    >
      <div className="flex gap-2">
        <img className="size-11 rounded-full" src={card.image} alt="User" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1 font-medium">
            <p>{card.name}</p>
            <svg
              className="mt-0.5 fill-green-500"
              width="12"
              height="12"
              viewBox="0 0 12 12"
            >
              <path d="M4.555.72c-.09.067-.18.138-.297.24-.18.12-.38.202-.59.244-.12.025-.24.04-.38.041-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922-.015.14-.026.26-.041.38-.042.21-.125.411-.245.59-.053.078-.114.151-.239.297-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244.12-.018.239-.026.38-.041.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922.015-.14.023-.24.041-.38.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a3.5 3.5 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72c-.292-.313-.475-.47-.667-.56a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" />
            </svg>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-700 leading-relaxed">{card.text}</p>
    </motion.div>
  );

  return (
    <>
      {/* HEADER */}
      <motion.div
        id="testimonials"
        className="flex flex-col items-center my-10 scroll-mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
          <BookUserIcon className="size-4.5 stroke-green-600" />
          <span>Testimonials</span>
        </div>

        <Title
          title="What our users say"
          description="Thousands of job seekers have built interview-ready resumes using our platform. Here’s what real users experienced."
        />
      </motion.div>

      {/* MARQUEE — ROW 1 */}
      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white to-transparent"></div>

        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, i) => (
            <CreateCard key={i} card={card} index={i} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent"></div>
      </div>

      {/* MARQUEE — ROW 2 (REVERSE) */}
      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent"></div>

        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, i) => (
            <CreateCard key={i} card={card} index={i} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent"></div>
      </div>

      {/* STYLES */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </>
  );
};

export default Testimonial;
