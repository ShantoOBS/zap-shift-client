"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import customer from "/assets/customer-top.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.", name: "Awlad Hossain", role: "Senior Product Designer" },
  { quote: "This product transformed my daily workflow and reduced pain significantly!", name: "Nasir Uddin", role: "CEO" },
  { quote: "Super helpful for posture correction during long sitting hours.", name: "Rasel Ahamed", role: "CTO" },
  { quote: "Helps maintain proper alignment throughout the day. Works amazingly!", name: "Awlad Hossin", role: "Senior Product Designer" },
  { quote: "Amazing product for long desk work. Great comfort.", name: "Nasir Uddin", role: "CEO" },
  { quote: "Highly recommended for office workers and students.", name: "Rasel Ahamed", role: "CTO" },
];

export default function CustomerReview() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  const getIndex = (offset) => (index + offset + reviews.length) % reviews.length;
  const getSlide = (position) => ({
    scale: position === 1 ? 1 : 0.9,
    opacity: position === 1 ? 1 : 0.6,
    y: position === 1 ? 0 : 20,
  });

  return (
    <section className="">
      <div className="flex justify-center">
        <img src={customer} alt="" className="h-12 w-auto md:h-14" />
      </div>
      <h2 className="mt-4 text-center text-xl font-bold text-gray-900 md:text-3xl">
        What our customers are saying
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-[#606060] md:mb-10">
        Enhance posture, mobility, and well-being effortlessly. Achieve proper
        alignment, reduce pain, and strengthen your body with ease!
      </p>

      <div className="flex items-center justify-center gap-3 overflow-hidden py-6 md:gap-6">
        {[getIndex(-1), getIndex(0), getIndex(1)].map((itemIndex, pos) => (
          <motion.div
            key={itemIndex}
            className="min-h-[200px] min-w-[250px] flex-1 max-w-sm rounded-2xl bg-white p-6 shadow-[0_1px_3px_0_rgb(0_0_0_/_.06)] md:p-8"
            initial={{ opacity: 0 }}
            animate={getSlide(pos)}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-3xl text-[#056873]">❝</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 md:text-base">
              {reviews[itemIndex].quote}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-[#056873]" />
              <div>
                <p className="font-semibold text-gray-900">{reviews[itemIndex].name}</p>
                <p className="text-xs text-gray-500">{reviews[itemIndex].role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={prev}
          className="rounded-full border border-gray-200 p-2.5 text-gray-600 transition-colors hover:bg-gray-50"
          aria-label="Previous review"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <span
              key={i}
              className={`block h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-[#056873]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="rounded-full bg-[#caeb66] p-2.5 text-black transition-colors hover:bg-[#b8d95a]"
          aria-label="Next review"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
