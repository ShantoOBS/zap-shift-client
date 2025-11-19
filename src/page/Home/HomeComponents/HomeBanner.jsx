'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import small from '../../../../public/assets/tiny-deliveryman.png'
import CircleButton from '../../../Compontens/CircleButton';



const items = [
  {
    id: 1,
    url: '../../../../public/assets/delivery-man-1.png',
    title: 'We Make Sure Your Parcel Arrives On Time – No Fuss.',
 
  },
  {
    id: 2,
    url: '../../../../public/assets/delivery_man.png',
    title: 'Fastest Delivery & Easy Pickup',

  },
  {
    id: 3,
    url: '../../../../public/assets/delivery-man-2.png',
    title: 'Delivery in 30 Minutes at your doorstep',
    
  },
];

export default function HomeBanner() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  // Auto slide every 2 seconds
  useEffect(() => {
    timer.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000); // <<< HOLD EACH SLIDE FOR 2 SECONDS

    return () => clearTimeout(timer.current);
  }, [index]);

  return (
    <div className="">
      <div className="relative overflow-hidden rounded-lg bg-white">

        {/* Horizontal Sliding Container */}
        
        <motion.div
          className="flex w-full"
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: 0.7, ease: 'easeInOut' }} // smooth move
        >
          {items.map((item) => (
            <div key={item.id} className="w-full h-full flex-shrink-0  ">

                <div className='flex flex-col md:flex-row items-center gap-5 justify-between p-8 md:p-20'>

                    <div className='md:w-1/2 space-y-6'>

                    <img src={small} alt="" />

                       <p className='text-black font-bold text-4xl md:text-5xl'> {item.title}</p>

                       <p className='text-[#606060] text-sm '> Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>

                           <div className="hidden md:flex gap-3 items-center">
                               <div className="flex">
                                   <button className="btn rounded-full bg-[#caeb66] hover:bg-[#abc758] text-black">Track Your Parcel</button>
                                    <CircleButton></CircleButton>
                               </div>
                                 <button className="btn border-gray-400 bg-white hover:bg-gray-200 text-[#606060]">Be a rider</button>
                            
                               </div>

                    </div>

                
                    
                    <div className='md:w-[40%]'>
                          <img src={item.url} alt="" />
                    </div>
                      
                </div>

               
            
            </div>
          ))}
        </motion.div>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 md:left-30 -translate-x-1/2 flex gap-2">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-4 rounded-2xl transition-all ${
                i === index ? 'w-8 bg-[#056873]' : 'w-2 bg-[#c3dfe2]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
