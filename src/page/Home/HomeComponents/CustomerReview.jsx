"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import customer from "/assets/customer-top.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    quote:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.",
    name: "Awlad Hossain",
    role: "Senior Product Designer",
  },
  {
    quote:
      "This product transformed my daily workflow and reduced pain significantly!",
    name: "Nasir Uddin",
    role: "CEO",
  },
  {
    quote:
      "Super helpful for posture correction during long sitting hours.",
    name: "Rasel Ahamed",
    role: "CTO",
  },
  {
    quote:
      "Helps maintain proper alignment throughout the day. Works amazingly!",
    name: "Awlad Hossin",
    role: "Senior Product Designer",
  },
  {
    quote:
      "Amazing product for long desk work. Great comfort.",
    name: "Nasir Uddin",
    role: "CEO",
  },
  {
    quote:
      "Highly recommended for office workers and students.",
    name: "Rasel Ahamed",
    role: "CTO",
  },
];

export default function CustomerReview() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const getIndex = (offset) => (index + offset + reviews.length) % reviews.length;

  const getSlide = (position) => {
    return {
      scale: position === 1 ? 1 : 0.85,
      opacity: position === 1 ? 1 : 0.5,
      filter: position === 1 ? "blur(0px)" : "blur(2px)",
      y: position === 1 ? 0 : 25,
    };
  };

  return (
    <div className="py-10 md:py-15 ">
      {/* Top icon */}
      <div className="flex justify-center mb-5">
        <img src={customer} alt="" className="" />
      </div>

      {/* Title */}
      <p className="text-xl md:text-3xl font-bold text-center">
        What our customers are saying
      </p>

      <p className="text-xs md:text-sm text-[#606060] mt-2 mb-10 leading-relaxed text-center">
       Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <span className="hidden md:inline"><br /></span>
       pain, and strengthen your body with ease!
      </p>

      {/* 3 Cards */}
      <div className="flex justify-center items-center gap-3 md:gap-6 overflow-hidden">
        {[getIndex(-1), getIndex(0), getIndex(1)].map((itemIndex, pos) => (
          <motion.div
            key={itemIndex}
            className="
              bg-white rounded-2xl 
              shadow-md 
              p-4 md:p-8 
              w-[45%] 
                 min-w-[250px]
              min-h-[200px]
              mb-2
            "
            initial={{ opacity: 0 }}
            animate={getSlide(pos)}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <p className="text-3xl text-[#4db6ac] mb-3">❝</p>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              {reviews[itemIndex].quote}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#053c47] rounded-full" />
              <div>
                <p className="font-bold text-sm">{reviews[itemIndex].name}</p>
                <p className="text-xs text-gray-500">{reviews[itemIndex].role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-5 mt-8">
        <button
          onClick={prev}
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-[#053c47]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full bg-[#c0ff4d] hover:bg-[#aee73f]"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
