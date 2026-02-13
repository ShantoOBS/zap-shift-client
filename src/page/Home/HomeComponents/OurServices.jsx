import React from "react";
import { motion } from "framer-motion";

const arr = [
  {
    title: "Express & Standard Delivery",
    subTittle:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: "/assets/service.png",
  },
  {
    title: "Nationwide Delivery",
    subTittle:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: "/assets/service.png",
  },
  {
    title: "Fulfillment Solution",
    subTittle:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: "/assets/service.png",
  },
  {
    title: "Cash on Home Delivery",
    subTittle:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: "/assets/service.png",
  },
  {
    title: "Corporate Service / Contract In Logistics",
    subTittle:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: "/assets/service.png",
  },
  {
    title: "Parcel Return",
    subTittle:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: "/assets/service.png",
  },
];

export default function OurServices() {
  return (
    <section className="rounded-2xl bg-[#03373d] px-6 py-12 text-white shadow-lg md:px-10 md:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Our Services</h2>
        <p className="mt-3 text-sm text-slate-300 md:text-base">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {arr.map((item, index) => (
          <motion.article
            key={index}
            className="flex flex-col rounded-2xl bg-white p-6 text-black shadow-sm transition-shadow hover:shadow-md md:p-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            whileHover={{ backgroundColor: "#f0fdf4" }}
          >
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#EEEDFC] to-transparent">
                <img src={item.icon} alt="" className="h-8 w-8" />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-bold md:text-xl">{item.title}</h3>
            <p className="mt-2 text-sm text-[#606060]">{item.subTittle}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
