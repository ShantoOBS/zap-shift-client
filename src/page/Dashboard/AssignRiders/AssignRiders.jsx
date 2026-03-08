import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const [selectedParcel, setSelectedParcel] = useState(null);
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();

    const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup');
            return res.data;
        }
    });

    // todo: invalidate query after assigning a rider
    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`);
            return res.data;
        }
    });

    const openAssignRiderModal = parcel => {
        setSelectedParcel(parcel);
        riderModalRef.current.showModal();
    };

    const handleAssignRider = (rider) => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderEmail: rider.email,
            riderName: rider.name,
            parcelId: selectedParcel._id,
            trackingId: selectedParcel.trackingId
        };
        axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
            .then((res) => {
                if (res?.data?.modifiedCount) {
                    riderModalRef.current?.close();
                    parcelsRefetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Rider has been assigned.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Assignment failed",
                        text: "Could not assign rider. Please try again."
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Assignment failed",
                    text: error?.response?.data?.message || "Could not assign rider."
                });
            });
    };

    return (
        <div>
            <div className="overflow-hidden rounded-2xl bg-[#f4f4f5] shadow-sm">
                <h1 className="p-4 text-2xl font-bold text-[#056873] md:text-3xl">
                    Assign Riders: {parcels.length}
                </h1>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-white/80 text-left text-sm font-medium text-gray-700">
                                <th className="px-4 py-4 md:px-6">#</th>
                                <th className="px-4 py-4 md:px-6">Name</th>
                                <th className="px-4 py-4 md:px-6">Cost</th>
                                <th className="px-4 py-4 md:px-6">Created At</th>
                                <th className="px-4 py-4 md:px-6">Pickup District</th>
                                <th className="px-4 py-4 md:px-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
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
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">{index + 1}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">
                                            {parcel.parcelName || "—"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                                            {parcel.cost}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                                            {parcel.createdAt
                                                ? new Date(parcel.createdAt).toLocaleString()
                                                : "—"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                                            {parcel.senderDistrict || "—"}
                                        </td>
                                        <td className="px-4 py-3 text-right md:px-6">
                                            <button
                                                onClick={() => openAssignRiderModal(parcel)}
                                                className="btn btn-primary btn-xs sm:btn-sm md:btn-md text-black"
                                            >
                                                Find Riders
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">Riders: {riders.length}</h3>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-white/80 text-left text-sm font-medium text-gray-700">
                                    <th className="px-4 py-4 md:px-6">#</th>
                                    <th className="px-4 py-4 md:px-6">Name</th>
                                    <th className="px-4 py-4 md:px-6">Email</th>
                                    <th className="px-4 py-4 md:px-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riders.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-12 text-center text-sm text-gray-500 md:px-6"
                                        >
                                            No available riders found.
                                        </td>
                                    </tr>
                                ) : (
                                    riders.map((rider, i) => (
                                        <tr
                                            key={rider._id || i}
                                            className="border-b border-gray-100 bg-white transition-colors last:border-0 hover:bg-gray-50/80"
                                        >
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">{i + 1}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 md:px-6">{rider.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 md:px-6">{rider.email}</td>
                                            <td className="px-4 py-3 text-right md:px-6">
                                                <button
                                                    onClick={() => handleAssignRider(rider)}
                                                    className="btn btn-primary btn-xs sm:btn-sm md:btn-md text-black"
                                                >
                                                    Assign
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;