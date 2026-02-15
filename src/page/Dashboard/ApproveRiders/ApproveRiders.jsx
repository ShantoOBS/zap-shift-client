import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    });

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `Rider status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    };

    const handleApproval = rider => {
        updateRiderStatus(rider, 'approved');
    };

    const handleRejection = rider => {
        updateRiderStatus(rider, 'rejected')
    };

    const handleDelete = rider => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete ${rider.name}'s application. This action cannot be undone!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/riders/${rider._id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: "Rider has been deleted.",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Delete failed",
                                text: "Failed to delete the rider. Please try again."
                            });
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Delete failed",
                            text: "Failed to delete the rider. Please try again."
                        });
                    });
            }
        });
    };

    // Use same card/list style as PaymentHistory (ul > li)
    return (
        <div>
            <h2 className="text-4xl font-bold mb-6">Riders Pending Approval: {riders.length}</h2>
            <div className="bg-white shadow rounded-lg p-0 md:p-2">
                <ul className="divide-y divide-gray-200">
                    <li className="hidden md:grid grid-cols-6 gap-4 p-4 font-semibold uppercase text-xs text-gray-500 bg-gray-50 rounded-t-lg">
                        <span>#</span>
                        <span>Name</span>
                        <span>Email</span>
                        <span>District</span>
                        <span>Status</span>
                        <span>Actions</span>
                    </li>
                    {riders.length === 0 && (
                        <li className="p-6 text-center text-gray-400 text-lg">No pending rider applications found.</li>
                    )}
                    {riders.map((rider, index) => (
                        <li
                            key={rider._id || rider.email || index}
                            className="flex flex-col md:grid md:grid-cols-6 gap-4 items-center p-4 hover:bg-gray-50 transition"
                        >
                            <span className="font-bold">{index + 1}</span>
                            <span className="font-medium">{rider.name}</span>
                            <span className="break-all">{rider.email}</span>
                            <span>{rider.district}</span>
                            <span>
                                <span
                                    className={`
                                        px-2 py-1 rounded
                                        text-xs font-bold uppercase
                                        ${rider.status === 'approved'
                                            ? 'bg-green-100 text-green-700'
                                            : rider.status === 'rejected'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-yellow-100 text-yellow-700'}
                                    `}
                                >
                                    {rider.status}
                                </span>
                            </span>
                            <span className="flex gap-2">
                                <button
                                    onClick={() => handleApproval(rider)}
                                    className="btn btn-success btn-sm flex items-center gap-1"
                                    title="Approve"
                                    disabled={rider.status === 'approved'}
                                >
                                    <FaUserCheck />
                                    <span className="hidden md:inline">Approve</span>
                                </button>
                                <button
                                    onClick={() => handleRejection(rider)}
                                    className="btn btn-warning btn-sm flex items-center gap-1"
                                    title="Reject"
                                    disabled={rider.status === 'rejected'}
                                >
                                    <IoPersonRemoveSharp />
                                    <span className="hidden md:inline">Reject</span>
                                </button>
                                <button
                                    className="btn btn-error btn-sm flex items-center gap-1 cursor-pointer"
                                    // Remove 'disabled' to allow delete action
                                    title="Delete"
                                    onClick={() => handleDelete(rider)}
                                >
                                    <FaTrashCan />
                                    <span className="hidden md:inline">Delete</span>
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ApproveRiders;