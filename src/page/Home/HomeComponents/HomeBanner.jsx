"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import small from "/assets/tiny-deliveryman.png";
import CircleButton from "../../../Compontens/CircleButton";

const items = [
  {
    id: 1,
    url: "/assets/delivery-man-1.png",
    title: "We Make Sure Your Parcel Arrives On Time – No Fuss.",
  },
  {
    id: 2,
    url: "/assets/delivery_man.png",
    title: "Fastest Delivery & Easy Pickup",
  },
  {
    id: 3,
    url: "/assets/delivery-man-2.png",
    title: "Delivery in 30 Minutes at your doorstep",
  },
];

export default function HomeBanner() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearTimeout(timer.current);
  }, [index]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white my-5 shadow-[0_1px_3px_0_rgb(0_0_0_/_.06),0_1px_2px_-1px_rgb(0_0_0_/_.06)]">
      <motion.div
        className="flex w-full"
        animate={{ x: `-${index * 100}%` }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-full flex-shrink-0 md:max-h-[28rem] "
          >
            <div className="flex flex-col items-center gap-6 p-8 md:flex-row md:justify-between md:gap-10 md:p-12 lg:p-16">
              <div className="space-y-4 text-center md:text-left">
                <img
                  src={small}
                  alt=""
                  className="mx-auto max-h-28 max-w-28 md:mx-0 md:max-h-36 md:max-w-36"
                />
                <h2 className="text-2xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                  {item.title}
                </h2>
                <p className="text-sm text-[#606060]">
                  Enjoy fast, reliable parcel delivery with real-time tracking
                  and zero hassle. From personal packages to business shipments
                  — we deliver on time, every time.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <Link to="/send-parcel">
                    <button
                      type="button"
                      className="rounded-full bg-[#caeb66] px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-[#b8d95a]"
                    >
                      Track Your Parcel
                    </button>
                  </Link>
                  <CircleButton />
                  <Link to="/rider">
                    <button
                      type="button"
                      className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-[#606060] transition-colors hover:bg-gray-50"
                    >
                      Be a rider
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative w-full md:w-[55%]">
                <img
                  src={item.url}
                  alt=""
                  className="w-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-[#056873]" : "w-2 bg-[#c3dfe2]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
