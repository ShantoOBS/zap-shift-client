import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { TbBikeFilled } from "react-icons/tb";
import { FaUserShield } from "react-icons/fa";
import useRole from "../Hooks/useRole";

import {
  LayoutDashboard,
  Truck,
  FileText,
  Store,
  Tag,
  MapPin,
  Settings,
  Key,
  HelpCircle,
  LogOut,
  Bell,
  ChevronDown,
  Plus,
  Menu,
} from "lucide-react";
import useAuth from "../Hooks/useAuth";
import Logo from "../Compontens/Logo";

export default function DashBoardLayout() {
  const { user, logOut } = useAuth() || {};
  const navigate = useNavigate();
  const { role } = useRole();
  const handleLogout = () => {
    logOut?.();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive ? "bg-[#056873] text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen bg-[#eaeced]">
      {/* Sidebar - hidden on mobile, shown on lg */}
      <aside className="fixed left-0 top-0 z-30 hidden h-full w-64 flex-col border-r border-gray-200 bg-[#f4f4f5] lg:flex">
        <div className="flex flex-col gap-6 overflow-y-auto px-4 py-6">
          <div className="flex items-center gap-2 px-2">
            <Logo />
          </div>

          <nav className="flex flex-col gap-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Menu
            </p>
            <NavLink to="/dashboard" end className={navLinkClass}>
              <LayoutDashboard className="size-5 shrink-0" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/dashboard/my-parcels" className={navLinkClass}>
              <Truck className="size-5 shrink-0" />
              <span>All Deliveries</span>
              <Plus className="ml-auto size-4 shrink-0" />
            </NavLink>
            <NavLink to="/dashboard/payment-history" className={navLinkClass}>
              <FileText className="size-5 shrink-0" />
              <span>Payment History</span>
            </NavLink>
           
              {
                role === 'admin' && (
                  <>
                    <NavLink to="/dashboard/approve-riders" className={navLinkClass}>
                      <TbBikeFilled className="size-5 shrink-0" />
                      <span>Approve Riders</span>
                    </NavLink>
                    <NavLink to="/dashboard/users-management" className={navLinkClass}>
                      <FaUserShield className="size-5 shrink-0" />
                      <span>Users Management</span>
                    </NavLink>
                  </>
                )
              }
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <Tag className="size-5 shrink-0" />
              <span>Pricing Plan</span>
            </Link>
            <Link
              to="/coverage"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <MapPin className="size-5 shrink-0" />
              <span>Coverage Zone</span>
            </Link>
          </nav>

          <div className="my-2 h-px bg-gray-200" />

          <nav className="flex flex-col gap-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              General
            </p>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <Settings className="size-5 shrink-0" />
              <span>Settings</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <Key className="size-5 shrink-0" />
              <span>Change Password</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <HelpCircle className="size-5 shrink-0" />
              <span>Help</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <LogOut className="size-5 shrink-0" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main: drawer toggle for mobile + content */}
      <div className="drawer drawer-end lg:drawer-open flex-1">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex min-h-screen flex-col lg:ml-64">
          {/* Top navbar */}
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm lg:px-8">
            <label
              htmlFor="dashboard-drawer"
              aria-label="Open sidebar"
              className="btn btn-ghost btn-square lg:hidden"
            >
              <Menu className="size-6" />
            </label>
            <div className="flex flex-1 justify-end items-center gap-4">
              <button
                type="button"
                className="btn btn-ghost btn-circle"
                aria-label="Notifications"
              >
                <Bell className="size-5 text-gray-600" />
              </button>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-1.5 hover:bg-gray-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#056873] text-sm font-semibold text-white">
                    {user?.displayName?.[0] || user?.email?.[0] || "U"}
                  </div>
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                  <ChevronDown className="size-4 text-gray-500" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box z-50 mt-2 w-52 bg-white p-2 shadow-lg ring-1 ring-black/5"
                >
                  <li>
                    <Link to="/dashboard">Profile</Link>
                  </li>
                  <li>
                    <button type="button" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-2 lg:p-4">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side z-40 lg:hidden">
          <label
            htmlFor="dashboard-drawer"
            aria-label="Close sidebar"
            className="drawer-overlay"
          />
          <aside className="flex h-full w-64 flex-col gap-6 overflow-y-auto border-r border-gray-200 bg-[#f4f4f5] px-4 py-6">
            <div className="flex items-center gap-2 px-2">
              <Logo />
            </div>
            <nav className="flex flex-col gap-1">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Menu
              </p>
              <NavLink to="/dashboard" end className={navLinkClass}>
                <LayoutDashboard className="size-5 shrink-0" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/dashboard/my-parcels" className={navLinkClass}>
                <Truck className="size-5 shrink-0" />
                <span>All Deliveries</span>
                <Plus className="ml-auto size-4 shrink-0" />
              </NavLink>
              <NavLink to="/dashboard/payment-history" className={navLinkClass}>
                <FileText className="size-5 shrink-0" />
                <span>Invoices</span>
              </NavLink>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Store className="size-5 shrink-0" />
                <span>Stores</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Tag className="size-5 shrink-0" />
                <span>Pricing Plan</span>
              </Link>
              <Link
                to="/coverage"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <MapPin className="size-5 shrink-0" />
                <span>Coverage Zone</span>
              </Link>
            </nav>
            <div className="my-2 h-px bg-gray-200" />
            <nav className="flex flex-col gap-1">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                General
              </p>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Settings className="size-5 shrink-0" />
                <span>Settings</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Key className="size-5 shrink-0" />
                <span>Change Password</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <HelpCircle className="size-5 shrink-0" />
                <span>Help</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="size-5 shrink-0" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
