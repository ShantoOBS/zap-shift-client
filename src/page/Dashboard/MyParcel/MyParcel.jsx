import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import useAuth from '../../../Hooks/useAuth'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2';
import { useSearchParams } from "react-router";
import ParcelDetailsModal from "./Components/ParcelDetailsModal";
import EditParcelModal from "./Components/EditParcelModal";



export default function MyParcel() {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [viewParcel, setViewParcel] = useState(null);
  const [editParcel, setEditParcel] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data: parecl = [], refetch } = useQuery({
    queryKey: ['myParcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`)
      return res.data
    },
  })

  useEffect(() => {
    if (!sessionId) return;
    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then(() => {
        refetch();
        setSearchParams({}, { replace: true });
      })
      .catch(() => {});
  }, [sessionId, axiosSecure, refetch, setSearchParams])


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
          .then(() => {
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

  const handleEditSave = (id, payload) => {
    setIsSavingEdit(true);
    axiosSecure
      .patch(`/parcels/${id}`, payload)
      .then(() => {
        refetch();
        setEditParcel(null);
        Swal.fire({ title: "Updated", text: "Parcel has been updated.", icon: "success" });
      })
      .catch(() => {
        Swal.fire({ title: "Error", text: "Could not update parcel.", icon: "error" });
      })
      .finally(() => setIsSavingEdit(false));
  };

  return (
    <div>
      <ParcelDetailsModal parcel={viewParcel} onClose={() => setViewParcel(null)} />
      <EditParcelModal
        parcel={editParcel}
        onClose={() => setEditParcel(null)}
        onSave={handleEditSave}
        isSaving={isSavingEdit}
      />
      <div className="overflow-hidden rounded-2xl bg-[#f4f4f5] shadow-sm">
        <h1 className="p-4 text-2xl font-bold text-[#056873] md:text-3xl">
          My Parcels: {parecl.length}
        </h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-white/80 text-left text-sm font-medium text-gray-700">
                <th className="px-4 py-4 md:px-6">#</th>
                <th className="px-4 py-4 md:px-6">Parcel Name</th>
                <th className="px-4 py-4 md:px-6">Cost</th>
                <th className="px-4 py-4 md:px-6">Delivery Status</th>
                <th className="px-4 py-4 md:px-6">Tracking ID</th>
                <th className="px-4 py-4 md:px-6">Payment Status</th>
                <th className="px-4 py-4 md:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {parecl.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-sm text-gray-500 md:px-6"
                  >
                    No parcels found.
                  </td>
                </tr>
              ) : (
                parecl.map((ele, index) => (
                  <tr
                    key={ele._id || index}
                    className="border-b border-gray-100 bg-white transition-colors last:border-0 hover:bg-gray-50/80"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">
                      {ele.parcelName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                      {ele.cost}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                      {ele.deliveryStatus}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                      {ele.trackingId}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {ele.paymentStatus === "paid" ? (
                        <span className="px-2 py-1 rounded text-xs font-bold uppercase bg-green-100 text-green-700">
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePayment(ele)}
                          className="btn btn-xs sm:btn-sm md:btn-md btn-success"
                        >
                          Pay
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right md:px-6">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setViewParcel(ele)}
                          className="btn btn-info btn-xs sm:btn-sm md:btn-md"
                          title="View"
                        >
                          <FaMagnifyingGlassPlus />
                          <span className="hidden md:inline">View</span>
                        </button>
                        <button
                          onClick={() => setEditParcel(ele)}
                          className="btn btn-warning btn-xs sm:btn-sm md:btn-md"
                          title="Edit"
                        >
                          <FiEdit />
                          <span className="hidden md:inline">Edit</span>
                        </button>
                        <button
                          className="btn btn-error btn-xs sm:btn-sm md:btn-md"
                          title="Delete"
                          onClick={() => handleParcelDelete(ele._id)}
                        >
                          <FaTrashAlt />
                          <span className="hidden md:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
