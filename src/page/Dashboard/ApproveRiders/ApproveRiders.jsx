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
              <div className="overflow-hidden rounded-2xl bg-[#f4f4f5] shadow-sm">
      <h1 className="p-4 text-2xl font-bold text-[#056873] md:text-3xl">
      Riders Pending Approval: {riders.length}
      </h1>
            
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="border-b border-gray-200 bg-white/80 text-left text-sm font-medium text-gray-700">
                            <th className="px-4 py-4 md:px-6">#</th>
                            <th className="px-4 py-4 md:px-6">Name</th>
                            <th className="px-4 py-4 md:px-6">Email</th>
                            <th className="px-4 py-4 md:px-6">District</th>
                            <th className="px-4 py-4 md:px-6">Status</th>
                            <th className="px-4 py-4 md:px-6">Work Status</th>
                            <th className="px-4 py-4 md:px-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-12 text-center text-sm text-gray-500 md:px-6"
                                >
                                    No pending rider applications found.
                                </td>
                            </tr>
                        ) : (
                            riders.map((rider, index) => (
                                <tr
                                    key={rider._id || rider.email || index}
                                    className="border-b border-gray-100 bg-white transition-colors last:border-0 hover:bg-gray-50/80"
                                >
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">{index + 1}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">{rider.name}</td>
                                    <td className="px-4 py-3 break-all text-sm text-gray-700 md:px-6">{rider.email}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 md:px-6">{rider.district}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 md:px-6">{rider.workStatus}</td>
                                    <td className="px-4 py-3 text-sm md:px-6">
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
                                    </td>
                                    <td className="px-4 py-3 text-right md:px-6">
                                        <div className="flex gap-2 justify-end">
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
                                                title="Delete"
                                                onClick={() => handleDelete(rider)}
                                            >
                                                <FaTrashCan />
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
    );
};

export default ApproveRiders;