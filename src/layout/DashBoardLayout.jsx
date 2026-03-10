import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { TbBikeFilled } from "react-icons/tb";
import { FaUserShield, FaTasks } from "react-icons/fa";
import useRole from "../Hooks/useRole";
import Profile from "../page/Shared/Profile";
import { MdAssignmentAdd } from "react-icons/md";
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
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import useAuth from "../Hooks/useAuth";
import Logo from "../Compontens/Logo";
import { SiGoogletasks } from "react-icons/si";
export default function DashBoardLayout() {
  const { user, logOut } = useAuth() || {};
  const navigate = useNavigate();
  const { role } = useRole();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logOut?.();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors shrink-0 ${
      isActive ? "bg-[#caeb66]  text-black" : "text-gray-700 hover:bg-gray-100"
    } ${isCollapsed ? "justify-center px-2" : ""}`;

  return (
    <div className="flex min-h-screen bg-[#eaeced]">
      {/* Sidebar - hidden on mobile, collapsible on lg */}
      <aside
        className={`fixed left-0 top-0 z-30 hidden h-full flex-col border-r border-gray-200 bg-[#f4f4f5] transition-[width] duration-200 ease-in-out lg:flex ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex flex-col gap-6 overflow-y-auto overflow-x-hidden px-3 py-6">
          <div className={`flex items-center justify-around gap-2 ${isCollapsed ? "justify-center px-0" : "px-2"}`}>
            {
              isCollapsed ?<></> : <> <Logo /></>
            }
         
            <button
            type="button"
            onClick={() => setIsCollapsed((c) => !c)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeft className="size-5 shrink-0" /> : <PanelLeftClose className="size-5 shrink-0" />}
           
          </button>
          </div>

      
          <nav className="flex flex-col gap-1">
            {!isCollapsed && (
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Menu
              </p>
            )}
            <NavLink to="/dashboard/overview" end className={navLinkClass}>
              <LayoutDashboard className="size-5 shrink-0" />
              {!isCollapsed && <span>Dashboard</span>}
            </NavLink>
            <NavLink to="/dashboard/my-parcels" className={navLinkClass}>
              <Truck className="size-5 shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1">All Deliveries</span>
                 
                </>
              )}
            </NavLink>
            <NavLink to="/dashboard/payment-history" className={navLinkClass}>
              <FileText className="size-5 shrink-0" />
              {!isCollapsed && <span>Payment History</span>}
            </NavLink>

            {role === "rider" && (
              <>
                <NavLink className={navLinkClass} to="/dashboard/assigned-deliveries">
                  <FaTasks className="size-5 shrink-0" />
                  {!isCollapsed && <span>Assigned Deliveries</span>}
                </NavLink>
                <NavLink className={navLinkClass} to="/dashboard/completed-deliveries">
                  <SiGoogletasks className="size-5 shrink-0" />
                  {!isCollapsed && <span>Completed Deliveries</span>}
                </NavLink>
              </>
            )}

            {role === "admin" && (
              <>
                <NavLink to="/dashboard/approve-riders" className={navLinkClass}>
                  <TbBikeFilled className="size-5 shrink-0" />
                  {!isCollapsed && <span>Approve Riders</span>}
                </NavLink>
                <NavLink to="/dashboard/assign-riders" className={navLinkClass}>
                  <MdAssignmentAdd  className="size-5 shrink-0" />
                  {!isCollapsed && <span>Assign Riders</span>}
                </NavLink>
                <NavLink to="/dashboard/users-management" className={navLinkClass}>
                  <FaUserShield className="size-5 shrink-0" />
                  {!isCollapsed && <span>Users Management</span>}
                </NavLink>
              </>
            )}

            <Link
              to="/pricing-calculator"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 ${
                isCollapsed ? "justify-center px-2" : ""
              }`}
            >
              <Tag className="size-5 shrink-0" />
              {!isCollapsed && <span>Pricing Plan</span>}
            </Link>
            <Link
              to="/coverage"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 ${
                isCollapsed ? "justify-center px-2" : ""
              }`}
            >
              <MapPin className="size-5 shrink-0" />
              {!isCollapsed && <span>Coverage Zone</span>}
            </Link>
          </nav>

          <div className="my-2 h-px bg-gray-200" />

          <nav className="flex flex-col gap-1">
            {!isCollapsed && (
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                General
              </p>
            )}
            <NavLink
              to="/dashboard/settings"
              className={navLinkClass}
            >
              <Settings className="size-5 shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </NavLink>
       
            <NavLink
              to="/dashboard/help"
              className={navLinkClass}
            >
              <HelpCircle className="size-5 shrink-0" />
              {!isCollapsed && <span>Help</span>}
            </NavLink>
            <button
              type="button"
              onClick={handleLogout}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer ${
                isCollapsed ? "justify-center px-2" : ""
              }`}
            >
              <LogOut className="size-5 shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </nav>
        </div>
      </aside>

      {/* Main: drawer toggle for mobile + content */}
      <div className="drawer drawer-end lg:drawer-open flex-1">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className={`drawer-content flex min-h-screen flex-col transition-[margin] duration-200 ease-in-out ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
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
             <Profile />
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
              <NavLink to="/dashboard/overview" end className={navLinkClass}>
                <LayoutDashboard className="size-5 shrink-0" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/dashboard/my-parcels" className={navLinkClass}>
                <Truck className="size-5 shrink-0" />
                <span>All Deliveries</span>
                <Plus className="ml-auto size-4 shrink-0" />
              </NavLink>
              {role === "rider" && (
              <>
                <NavLink className={navLinkClass} to="/dashboard/assigned-deliveries">
                  <FaTasks className="size-5 shrink-0" />
                  {!isCollapsed && <span>Assigned Deliveries</span>}
                </NavLink>
                <NavLink className={navLinkClass} to="/dashboard/completed-deliveries">
                  <SiGoogletasks className="size-5 shrink-0" />
                  {!isCollapsed && <span>Completed Deliveries</span>}
                </NavLink>
              </>
            )}

            {role === "admin" && (
              <>
                <NavLink to="/dashboard/approve-riders" className={navLinkClass}>
                  <TbBikeFilled className="size-5 shrink-0" />
                  {!isCollapsed && <span>Approve Riders</span>}
                </NavLink>
                <NavLink to="/dashboard/assign-riders" className={navLinkClass}>
                  <MdAssignmentAdd  className="size-5 shrink-0" />
                  {!isCollapsed && <span>Assign Riders</span>}
                </NavLink>
                <NavLink to="/dashboard/users-management" className={navLinkClass}>
                  <FaUserShield className="size-5 shrink-0" />
                  {!isCollapsed && <span>Users Management</span>}
                </NavLink>
              </>
            )}
              <Link
                to="/pricing-calculator"
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
              <NavLink
                to="/dashboard/settings"
                className={navLinkClass}
              >
                <Settings className="size-5 shrink-0" />
                <span>Settings</span>
              </NavLink>
              <NavLink
                to="/dashboard/help"
                className={navLinkClass}
              >
                <HelpCircle className="size-5 shrink-0" />
                <span>Help</span>
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
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
