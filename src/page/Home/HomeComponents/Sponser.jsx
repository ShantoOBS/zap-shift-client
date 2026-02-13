"use client";
import { motion } from "framer-motion";
import img1 from '/assets/brands/amazon.png'
import img2 from '/assets/brands/casio.png'
import img3 from '/assets/brands/moonstar.png'
import img4 from '/assets/brands/randstad.png'
import img5 from '/assets/brands/star.png'
import img6 from '/assets/brands/start_people.png'

export default function Sponser() {
  return (
    <div className="w-full overflow-hidden py-5">

      <p className="mb-6 text-center text-lg font-bold text-gray-900 md:text-2xl">We've helped thousands of sales teams</p>
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-10"
      >
         <img src={img1} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img2} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img3} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img4} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img5} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img6} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img1} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img2} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img3} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img4} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img5} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img6} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img1} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img2} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img3} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img4} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img5} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
         <img src={img6} alt="" className="h-8 object-contain opacity-80 grayscale md:h-10" />
      </motion.div>
    </div>
  );
}
