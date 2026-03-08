import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

type Parcel = {
  _id: string;
  parcelName?: string;
  createdAt?: string;
  senderDistrict?: string;
  receiverDistrict?: string;
  cost?: number;
};

export default function CompletedDeliveries() {
  const auth = useAuth() as { user?: { email?: string } } | null | undefined;
  const user = auth?.user;
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ['parcels', user?.email, 'parcel_delivered'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const calculatePayout = (parcel: Parcel): number => {
    const cost = Number(parcel.cost) || 0;
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return cost * 0.8;
    }
    return cost * 0.6;
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-[#f4f4f5] shadow-sm">
      <h1 className="p-4 text-2xl font-bold text-[#056873] md:text-3xl">
        Completed Deliveries: {parcels.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-white/80 text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-4 md:px-6">#</th>
              <th className="px-4 py-4 md:px-6">Name</th>
              <th className="px-4 py-4 md:px-6">Created At</th>
              <th className="px-4 py-4 md:px-6">Pickup District</th>
              <th className="px-4 py-4 md:px-6">Cost</th>
              <th className="px-4 py-4 md:px-6">Payout</th>
              <th className="px-4 py-4 md:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-gray-500 md:px-6"
                >
                  No completed deliveries found.
                </td>
              </tr>
            ) : (
              parcels.map((parcel: Parcel, index: number) => (
                <tr
                  key={parcel._id}
                  className="border-b border-gray-100 bg-white transition-colors last:border-0 hover:bg-gray-50/80"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">
                    {parcel.parcelName || '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                    {parcel.createdAt
                      ? new Date(parcel.createdAt).toLocaleString()
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                    {parcel.senderDistrict || '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                    {parcel.cost ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">
                    {calculatePayout(parcel).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right md:px-6">
                    <button
                      type="button"
                      className="btn btn-primary btn-xs sm:btn-sm md:btn-md text-black"
                    >
                      Cash out
                    </button>
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
