import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from '../../Hooks/useAuth'
import useAxiosSecure from '../../Hooks/useAxiosSecure';

export default function MyParcel() {
 
   const {user}=useAuth();
   const axiosSecure=useAxiosSecure();

  const { data: parecl=[] }=useQuery({
      queryKey:['myParcels', user?.email],
      queryFn:async () => {
       const res = await axiosSecure.get(`/parcels?email=${user.email}`)
       return res.data
  },
  })

  return (
    <div>

         <h1>My parcels{parecl.length}</h1>
      
    </div>
  )
}
