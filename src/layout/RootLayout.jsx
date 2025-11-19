import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../page/Shared/Navbar'
import Footer from '../page/Shared/Footer'


export default function RootLayout() {
  return (
    <div className='bg-[#eaeced] text-black max-w-6xl mx-auto p-5 md:-15'>
         
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      
    </div>
  )
}
