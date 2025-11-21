import React from 'react'
import img1 from '/assets/live-tracking.png'
import img2 from '/assets/safe-delivery.png'

export default function Tracking() {
  return (
    <div className='max-w-5xl mx-auto space-y-5 md:my-20 my-10'>
         


         <div className='bg-white rounded-2xl flex  justify-between gap-5 md:gap-10 p-5 items-center'>
            <div>
                <img src={img1} alt="" />
            </div>

            <div className='w-[1px] h-20 md:h-30 bg-black border-dotted' >

            </div>

        <div className='space-y-3'>
             <p className='font-bold text-sm md:text-base'>Live Parcel Tracking</p>
             <p className='text-[10px] md:text-xs text-[#606060]'>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey
                 and get instant status updates for complete peace of mind.</p>
         </div>

         </div>

         <div className='bg-white rounded-2xl flex  justify-between gap-5 md:gap-10 p-5 items-center'>
            <div>
                <img src={img2} alt="" />
            </div>

            <div className='w-[1px] h-20 md:h-30 bg-black border-dotted' >

            </div>

        <div className='space-y-3'>
             <p className='font-bold text-sm md:text-base'>100% Safe Delivery</p>
             <p className='text-[10px] md:text-xs text-[#606060]'>We ensure your parcels are handled with the utmost care and delivered securely
                 to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
         </div>

         </div>
        
         <div className='bg-white rounded-2xl flex  justify-between gap-5 md:gap-10 p-5 items-center'>
            <div>
                <img src={img2} alt="" />
            </div>

            <div className='w-[1px] h-20 md:h-30 bg-black border-dotted' >

            </div>

        <div className='space-y-3'>
             <p className='font-bold text-sm md:text-base'>24/7 Call Center Support</p>
             <p className='text-[10px] md:text-xs text-[#606060]'>Our dedicated support team is available around the clock to assist
                 you with any questions, updates, or delivery concerns—anytime you need us.</p>
         </div>

         </div>


    

      

      
    </div>
  )
}
