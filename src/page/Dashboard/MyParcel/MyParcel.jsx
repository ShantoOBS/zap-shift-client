import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaMagnifyingGlass, FaTrashCan } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { Link, useSearchParams } from 'react-router';
import ParcelDetailsModal from './Components/ParcelDetailsModal';
import EditParcelModal from './Components/EditParcelModal';

export default function MyParcel() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [viewParcel, setViewParcel] = useState(null);
  const [editParcel, setEditParcel] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (!sessionId) return;
    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then(() => {
        refetch();
        setSearchParams({}, { replace: true });
      })
      .catch(() => {});
  }, [sessionId, axiosSecure, refetch, setSearchParams]);

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res?.data?.deletedCount) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your parcel request has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      trackingId: parcel.trackingId,
    };
    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    if (res?.data?.url) window.location.assign(res.data.url);
  };

  const handleEditSave = (id, payload) => {
    setIsSavingEdit(true);
    axiosSecure
      .patch(`/parcels/${id}`, payload)
      .then(() => {
        refetch();
        setEditParcel(null);
        Swal.fire({ title: 'Updated', text: 'Parcel has been updated.', icon: 'success' });
      })
      .catch(() => {
        Swal.fire({ title: 'Error', text: 'Could not update parcel.', icon: 'error' });
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
          All of my parcels: {parcels.length}
        </h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-white/80 text-left text-sm font-medium text-gray-700">
                <th className="px-4 py-4 md:px-6">#</th>
                <th className="px-4 py-4 md:px-6">Name</th>
                <th className="px-4 py-4 md:px-6">Cost</th>
                <th className="px-4 py-4 md:px-6">Payment</th>
                <th className="px-4 py-4 md:px-6">Tracking Id</th>
                <th className="px-4 py-4 md:px-6">Delivery Status</th>
                <th className="px-4 py-4 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-sm text-gray-500 md:px-6"
                  >
                    No parcels found.
                  </td>
                </tr>
              ) : (
                parcels.map((parcel, index) => (
                  <tr
                    key={parcel._id || index}
                    className="border-b border-gray-100 bg-white transition-colors last:border-0 hover:bg-gray-50/80"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">
                      {parcel.parcelName || '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                      {parcel.cost}
                    </td>
                    <td className="px-4 py-3 text-sm md:px-6">
                      {parcel.paymentStatus === 'paid' ? (
                        <span className="text-green-600 font-medium">Paid</span>
                      ) : (
                        <button
                          onClick={() => handlePayment(parcel)}
                          className="btn btn-sm bg-[#caeb66]  btn-primary text-black"
                        >
                          Pay
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                      {parcel.trackingId ? (
                        <Link
                          to={`/parcel-track/${parcel.trackingId}`}
                          className="text-[#056873] font-medium hover:underline"
                        >
                          {parcel.trackingId}
                        </Link>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                      {parcel.deliveryStatus || '—'}
                    </td>
                    <td className="px-4 py-3 text-right md:px-6">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setViewParcel(parcel)}
                          className="btn btn-square btn-sm hover:bg-primary/10"
                          title="View"
                        >
                          <FaMagnifyingGlass />
                        </button>
                        <button
                          onClick={() => setEditParcel(parcel)}
                          className="btn btn-square btn-sm hover:bg-primary/10"
                          title="Edit"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleParcelDelete(parcel._id)}
                          className="btn btn-square btn-sm hover:bg-error/10"
                          title="Delete"
                        >
                          <FaTrashCan />
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
  );
}
