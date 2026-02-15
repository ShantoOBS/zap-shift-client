import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import useAuth from '../../Hooks/useAuth'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2';
import { useSearchParams } from "react-router";



export default function MyParcel() {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

        const [searchParams]=useSearchParams();

        const sessionId=searchParams.get("session_id");

        useEffect(()=>{

          if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>console.log(res.data))
          }

        },[sessionId,axiosSecure])


  const { data: parecl = [], refetch } = useQuery({
    queryKey: ['myParcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`)
      return res.data
    },
  })


  const handleParcelDelete = id => {
   
    Swal.fire({
      title: "Are you sure to delete",
      text: `You will delete the parcels`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!"
    }).then((result) => {
      if (result.isConfirmed) {

        // save the parcel info to the database
        axiosSecure.delete(`/parcels/${id}`)
          .then(res => {

            refetch();

            Swal.fire({
              title: "Success Deleted",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })


      }
    });


  }

  const handlePayment=async(parcel)=>{
      
        //console.log(parcel);

  

        const paymentInfo={
          cost:parcel.cost,
          parcelId:parcel._id,
          senderEmail:parcel.senderEmail,
          parcelName:parcel.parcelName
        }

        const res=await axiosSecure.post('/create-checkout-session',paymentInfo)

        console.log(res.data);
        // eslint-disable-next-line react-hooks/immutability
         window.location.href=res.data.url;

       
       
  }

  return (
    <div>

      <h1 className='text-xl md:text-2xl'>My parcels {parecl.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {

              parecl.map((ele, index) => <tr key={index + 1}>
                <th>{index + 1}</th>
                <td>{ele.parcelName}</td>
                <td>{ele.cost}</td>
                <td>{

                  ele.paymentStatus === "paid" ? <span className='text-green-500'>Paid</span> :

                    <button onClick={()=>handlePayment(ele)} className="btn btn-xs sm:btn-sm md:btn-md ">

                      Pay
                    </button>


                }</td>
                <td className='flex'>

                  <button className="btn btn-xs sm:btn-sm md:btn-md ">

                    <FaMagnifyingGlassPlus />
                  </button>
                  <button className="btn btn-xs sm:btn-sm md:btn-md mx-2">

                    <FiEdit />
                  </button>
                  <button className="btn btn-xs sm:btn-sm md:btn-md " onClick={() => handleParcelDelete(ele._id)}>

                    <FaTrashAlt />
                  </button>

                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}
