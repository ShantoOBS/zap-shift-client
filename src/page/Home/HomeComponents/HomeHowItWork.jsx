import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Booking Pick & Drop",
    subTittle:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: "/assets/bookingIcon.png",
  },
  {
    title: "Cash On Delivery",
    subTittle:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: "/assets/bookingIcon.png",
  },
  {
    title: "Delivery Hub",
    subTittle:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: "/assets/bookingIcon.png",
  },
  {
    title: "Booking SME & Corporate",
    subTittle:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: "/assets/bookingIcon.png",
  },
];

export default function HomeHowItWork() {
  return (
    <section className="mx-auto max-w-5xl">
      <h2 className="mb-8 text-2xl font-bold text-gray-900">How it Works</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {steps.map((item, index) => (
          <motion.article
            key={index}
            className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_0_rgb(0_0_0_/_.06)] transition-shadow hover:shadow-md md:p-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <img src={item.icon} alt="" className="h-10 w-auto" />
            <h3 className="mt-4 font-bold text-gray-900 md:text-base">
              {item.title}
            </h3>
            <p className="mt-2 text-xs text-[#606060] md:text-sm">
              {item.subTittle}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
