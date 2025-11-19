import React from 'react'
import { Link } from 'react-router'
import logo from '/assets/logo.png'

export default function Logo() {
  return (
    <Link to='/' className='flex relative'>
           <img src={logo} alt="" className='absolute -top-2 -left-4 h-8 -rotate-4' />
           <p className='text-[1.1rem] font-bold text-black'>ZapShift</p>
    </Link>
  )
}
