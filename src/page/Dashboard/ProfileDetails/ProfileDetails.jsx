import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import { Mail, User, Shield } from "lucide-react";

export default function ProfileDetails() {
  const { user } = useAuth() || {};
  const { role } = useRole() || {};

  const infoItems = [
    {
      label: "Display Name",
      value: user?.displayName || "—",
      icon: User,
    },
    {
      label: "Email",
      value: user?.email || "—",
      icon: Mail,
    },
    {
      label: "Role",
      value: role ? role.charAt(0).toUpperCase() + role.slice(1) : "—",
      icon: Shield,
    },
  ];

  return (
    <div className="mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
        Profile
      </h1>

      <div className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_0_rgb(0_0_0/.06)] md:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#056873] text-3xl font-semibold text-white ring-4 ring-gray-100">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              user?.displayName?.[0] || user?.email?.[0] || "U"
            )}
          </div>
          <div className="flex-1 space-y-4 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-gray-900">
              {user?.displayName || "User"}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Account details
          </h3>
          <ul className="space-y-4">
            {infoItems.map(({ label, value, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#056873]/10 text-[#056873]">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                  <p className="truncate text-sm font-medium text-gray-900">
                    {value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
