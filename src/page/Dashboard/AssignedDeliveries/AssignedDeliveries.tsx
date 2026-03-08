import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

export default function AssignedDeliveries() {
  const auth = useAuth() as { user?: { email?: string } } | null | undefined;
  const user = auth?.user;
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels', user?.email, 'driver_assigned'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDeliveryStatusUpdate = (parcel: { _id: string; riderId?: string; trackingId?: string }, status: string) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    const message = `Parcel status updated to ${status.split('_').join(' ')}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res: { data?: { modifiedCount?: number } }) => {
        if (res?.data?.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Update failed', text: 'Could not update status.' });
      });
  };

  const handleReject = (parcel: { _id: string; riderId?: string; trackingId?: string }) => {
    Swal.fire({
      title: 'Reject delivery?',
      text: 'This will unassign you from this parcel.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Reject',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeliveryStatusUpdate(parcel, 'rider_rejected');
      }
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-[#f4f4f5] shadow-sm">
      <h1 className="p-4 text-2xl font-bold text-[#056873] md:text-3xl">
        Parcels Pending Pickup: {parcels.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-white/80 text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-4 md:px-6">#</th>
              <th className="px-4 py-4 md:px-6">Parcel Name</th>
              <th className="px-4 py-4 md:px-6">Cost</th>
              <th className="px-4 py-4 md:px-6">Tracking ID</th>
              <th className="px-4 py-4 md:px-6">Confirm</th>
              <th className="px-4 py-4 md:px-6 text-right">Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-sm text-gray-500 md:px-6"
                >
                  No assigned parcels found.
                </td>
              </tr>
            ) : (
              parcels.map((parcel: { _id: string; parcelName?: string; cost?: number | string; trackingId?: string; deliveryStatus?: string; riderId?: string }, i: number) => (
                <tr
                  key={parcel._id}
                  className="border-b border-gray-100 bg-white transition-colors last:border-0 hover:bg-gray-50/80"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">
                    {parcel.parcelName || '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                    {parcel.cost ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                    {parcel.trackingId || '—'}
                  </td>
                  <td className="px-4 py-3 text-sm md:px-6">
                    {parcel.deliveryStatus === 'driver_assigned' ? (
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleDeliveryStatusUpdate(parcel, 'rider_arriving')}
                          className="btn btn-primary btn-xs sm:btn-sm md:btn-md text-black"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(parcel)}
                          className="btn btn-warning btn-xs sm:btn-sm md:btn-md text-black"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs font-bold uppercase bg-green-100 text-green-700">
                        Accepted
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right md:px-6">
                    <div className="flex flex-wrap gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_picked_up')}
                        className="btn btn-primary btn-xs sm:btn-sm md:btn-md text-black"
                      >
                        Mark as Picked Up
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_delivered')}
                        className="btn btn-success btn-xs sm:btn-sm md:btn-md text-white"
                      >
                        Mark as Delivered
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
  );
}
