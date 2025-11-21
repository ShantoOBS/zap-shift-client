import React from 'react'
import locationMerchant from '/assets/location-merchant.png'
import bgMix from '/assets/be-a-merchant-bg.png'
export default function CustomerSatisfaction() {
    return (
        <div className='bg-[#03373d] max-w-5xl rounded-2xl
         mx-auto text-white p-10 md:p-15 flex flex-col-reverse md:flex-row gap-5 relative'>


            <div className='md:w-[70%] space-y-5 z-2'>
                <p className='text-2xl md:text-3xl font-bold'>Merchant and Customer Satisfaction is Our First Priority</p>
                <p className='text-xs md:text-sm text-[#dadada]'>We offer the lowest delivery charge with the highest value along with 100% safety of your product.
                    Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>

                <div className='flex flex-col md:flex-row gap-2'>
                    <button className='btn '>Become a Merchant</button>
                    <button className='btn '>Earn with ZapShift Courier</button>
                </div>
            </div>

            <div className='z-2'>
                  <img src={locationMerchant} alt="" />
            </div>

            <img src={bgMix} alt="" className='absolute top-0 left-5 overflow-hidden' />

        </div>
    )
}
