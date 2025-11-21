"use client";
import { motion } from "framer-motion";
import img1 from '../../../../public/assets/brands/amazon.png'
import img2 from '../../../../public/assets/brands/casio.png'
import img3 from '../../../../public/assets/brands/moonstar.png'
import img4 from '../../../../public/assets/brands/randstad.png'
import img5 from '../../../../public/assets/brands/star.png'
import img6 from '../../../../public/assets/brands/start_people.png'

export default function Sponser() {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full my-10 md:my-20 ">

      <p className="text-center text-lg md:text-2xl font-bold my-4">We've helped thousands of sales teams</p>
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-10"
      >
         <img src={img1} alt="" />
         <img src={img2} alt="" />
         <img src={img3} alt="" />
         <img src={img4} alt="" />
         <img src={img5} alt="" />
         <img src={img6} alt="" />
         <img src={img1} alt="" />
         <img src={img2} alt="" />
         <img src={img3} alt="" />
         <img src={img4} alt="" />
         <img src={img5} alt="" />
         <img src={img6} alt="" />
         <img src={img1} alt="" />
         <img src={img2} alt="" />
         <img src={img3} alt="" />
         <img src={img4} alt="" />
         <img src={img5} alt="" />
         <img src={img6} alt="" />
      </motion.div>
    </div>
  );
}
