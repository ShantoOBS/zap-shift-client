import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { FaTrashCan } from 'react-icons/fa6';


const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('')

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        const roleInfo = { role: 'admin' }
        //TODO: must ask for confirmation before proceed
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} marked as an Admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' }
        //TODO: must ask for confirmation before proceed
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} removed from Admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleDeleteUser = user => {
        axiosSecure.delete(`/users/${user._id}/role`)
            .then(res => {
                if (res.data.deletedCount) {
                    refetch();
                }
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `${user.displayName} deleted successfully`,
                    showConfirmButton: false,
                    timer: 2000
                });
            })
    }

    return (
        <div className="">
            <div className="overflow-hidden rounded-2xl bg-[#f4f4f5] shadow-sm">
                <h1 className="p-4 text-2xl font-bold text-[#056873] md:text-3xl">
                    Manage Users <span className="text-lg align-middle">({users.length})</span>
                </h1>
                <div className="px-4 pb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="w-full max-w-xs">
                        <label className="relative flex items-center">
                            <svg className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                onChange={(e) => setSearchText(e.target.value)}
                                type="search"
                                className="block w-full pl-10 pr-4 py-2 bg-white rounded-md border border-gray-300 focus:border-[#056873] focus:ring focus:ring-[#056873]/10 text-sm"
                                placeholder="Search users"
                                value={searchText}
                            />
                        </label>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-white/80 text-left text-sm font-medium text-gray-700">
                                <th className="px-4 py-4 md:px-6">#</th>
                                <th className="px-4 py-4 md:px-6">User Info</th>
                                <th className="px-4 py-4 md:px-6">Email</th>
                                <th className="px-4 py-4 md:px-6">Role</th>
                                <th className="px-4 py-4 md:px-6 text-center">Admin Action</th>
                                <th className="px-4 py-4 md:px-6 text-center">Other Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-12 text-center text-sm text-gray-500 md:px-6"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr
                                        key={user._id || index}
                                        className="border-b border-gray-100 bg-white transition-colors last:border-0 hover:bg-gray-50/80"
                                    >
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">
                                            {index + 1}
                                        </td>
                                        <td className="max-w-[220px] px-4 py-3 text-sm text-gray-600 md:px-6">
                                            <span className="flex items-center gap-3">
                                                <span className="avatar">
                                                    <span className="mask mask-squircle h-10 w-10 bg-gray-100 flex items-center justify-center overflow-hidden">
                                                        {user.photoURL ? (
                                                            <img
                                                                src={user.photoURL}
                                                                alt={user.displayName || "User Avatar"}
                                                            />
                                                        ) : (
                                                            <span className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-500">?</span>
                                                        )}
                                                    </span>
                                                </span>
                                                <span>
                                                    <span className="block font-semibold text-gray-900">{user.displayName || "—"}</span>
                                                    {/* <span className="block text-xs text-gray-400">United States</span> */}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-mono text-gray-700 md:px-6">
                                            {user.email || "—"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 md:px-6">
                                            {user.role || "user"}
                                        </td>
                                        <td className="px-4 py-3 text-center md:px-6">
                                            {user.role === "admin" ? (
                                                <button
                                                    type="button"
                                                    className="rounded-md cursor-pointer bg-red-500/80 text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-red-600 flex items-center gap-2"
                                                    title="Remove Admin"
                                                    onClick={() => handleRemoveAdmin(user)}
                                                >
                                                    <FiShieldOff />
                                                    Remove Admin
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="rounded-md cursor-pointer bg-green-600/90 text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-green-700 flex items-center gap-2"
                                                    title="Make Admin"
                                                    onClick={() => handleMakeAdmin(user)}
                                                >
                                                    <FaUserShield />
                                                    Make Admin
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center md:px-6">
                                            <button
                                                type="button"
                                                className="rounded-md cursor-pointer bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 flex items-center gap-2"
                                                title="Delete User"
                                                onClick={() => handleDeleteUser(user)}
                                            >
                                                <FaTrashCan />
                                                Delete
                                            </button>
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

export default UsersManagement;