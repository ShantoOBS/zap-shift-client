import React from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

export default function Profile() {
  const auth = useAuth() as { user?: { displayName?: string; email?: string; photoURL?: string | null }; logOut?: () => void } | null | undefined;
  const { user, logOut } = auth ?? {};
  const roleData = useRole() as { role?: string } | null | undefined;
  const { role } = roleData ?? {};

  const handleLogout = () => {
    logOut?.();
  };

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="flex cursor-pointer items-center gap-3 rounded-lg p-1.5 hover:bg-gray-50"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#056873] text-sm font-semibold text-white">
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
        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-gray-900">
            {user?.displayName || "User"}
          </p>
          <p className="text-xs text-gray-500">{role ?? "User"}</p>
        </div>
        <ChevronDown className="size-4 text-gray-500" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box z-50 mt-2 w-52 bg-white p-2 shadow-lg ring-1 ring-black/5"
      >
        <li>
          <Link to="/dashboard/profile">Profile</Link>
        </li>
        <li>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}