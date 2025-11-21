import React from 'react'
import { motion } from "framer-motion";

const arr = [
    {
        title: "Booking Pick & Drop",
        subTittle: "From personal packages to business shipments — we deliver on time, every time.",
        icon: "/assets/bookingIcon.png"
    },
    {
        title: "Cash On Delivery",
        subTittle: "From personal packages to business shipments — we deliver on time, every time.",
        icon: "/assets/bookingIcon.png"
    },
    {
        title: "Delivery Hub",
        subTittle: "From personal packages to business shipments — we deliver on time, every time.",
        icon: "/assets/bookingIcon.png"
    },
    {
        title: "Booking SME & Corporate",
        subTittle: "From personal packages to business shipments — we deliver on time, every time.",
        icon: "/assets/bookingIcon.png"
    },
]

export default function HomeHowItWork() {
    return (
        <div className='max-w-5xl mx-auto my-10 md:my-20'>
            <p className='text-2xl font-bold my-3'>How it Works</p>

            <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-4'>
                {arr.map((item, index) => (
                    <motion.div
                        key={index}
                        className='bg-white p-8 space-y-3 rounded-2xl'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <img src={item.icon} alt="" />
                        <p className='font-bold text-sm md:text-base'>{item.title}</p>
                        <p className='text-xs md:text-sm'>{item.subTittle}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
