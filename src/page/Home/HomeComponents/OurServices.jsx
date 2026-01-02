import React from 'react'
import { motion } from "framer-motion";

const arr = [
    {
        title: "Express  & Standard Delivery",
        subTittle: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: "/assets/service.png",
    },
    {
        title: "Nationwide Delivery",
        subTittle: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: "/assets/service.png",
    },
    {
        title: "Fulfillment Solution",
        subTittle: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support..",
        icon: "/assets/service.png",
    },
    {
        title: "Cash on Home Delivery",
        subTittle: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: "/assets/service.png",
    },
    {
        title: "Corporate Service / Contract In Logistics",
        subTittle: "Customized corporate services which includes warehouse and inventory management support.",
        icon: "/assets/service.png",
    },
    {
        title: "Parcel Return",
        subTittle: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: "/assets/service.png",
    },
];


export default function OurServices() {
  return (
    <div className='bg-[#03373d] text-white text-center rounded-2xl py-15 px-10 '>
        <p className='text-2xl md:text-3xl font-bold'>Our Services</p>
        <p className='text-xs md:text-sm text-[#dadada] my-4'>
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to <span className='hidden md:inline'><br /></span> business shipments — we deliver on time, every time.
        </p>

        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
            {arr.map((item, index) => (
                <motion.div
                    key={index}
                    className='bg-white text-black rounded-2xl p-8 space-y-3 text-center hover:cursor-pointer'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ backgroundColor: "#caeb66" }}
                >
                    <div className='flex justify-center items-center w-full'>
                        <img
                            src={item.icon}
                            alt=""
                            className='p-4 w-15 h-15 bg-gradient-to-b from-[#EEEDFC] to-[#EEEDFC00] rounded-full'
                        />
                    </div>

                    <p className='font-bold text-lg md:text-2xl'>{item.title}</p>
                    <p className='text-xs md:text-sm text-[#606060]'>{item.subTittle}</p>
                </motion.div>
            ))}
        </div>
    </div>
  );
}