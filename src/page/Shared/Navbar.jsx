import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../../Compontens/Logo";
import CircleButton from "../../Compontens/CircleButton";
import useAuth from "../../Hooks/useAuth";

const navItems = [
  { to: "/services", label: "Services" },
  { to: "/coverage", label: "Coverage" },
  { to: "/about", label: "About Us" },
  { to: "/send-parcel", label: "Send Parcel" },
  { to: "/rider", label: "Be a Rider" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const ticking = useRef(false);

  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut?.()
      .then(() => {})
      .catch(() => {});
  };

  const closeMenu = () => setOpen(false);

  // Scroll handler to hide on scroll down and show on scroll up
  useEffect(() => {
    function handleScroll() {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 32) {
            // Scrolling down
            setShowNavbar(false);
          } else {
            // Scrolling up or at top
            setShowNavbar(true);
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Motion.nav
      initial={false}
      animate={{
        y: showNavbar ? 0 : "-100%",
        opacity: showNavbar ? 1 : 0,
        pointerEvents: showNavbar ? "auto" : "none",
        transition: { type: "tween", duration: 0.24 }
      }}
      className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm"
      style={{
        transitionProperty: "transform, opacity"
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-4">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center" onClick={closeMenu}>
          <Logo color={false} />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-[#caeb66] text-black"
                    : "text-[#606060] hover:bg-gray-100 hover:text-black"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-[#caeb66] text-black"
                    : "text-[#606060] hover:bg-gray-100 hover:text-black"
                }`
              }
            >
              My Parcel
            </NavLink>
          )}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {user ? (
            <button
              type="button"
              onClick={handleLogOut}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#606060] transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-black"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/login">
              <button
                type="button"
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#606060] transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-black"
              >
                Sign In
              </button>
            </Link>
          )}
          <Link to="/rider">
            <button
              type="button"
              className="rounded-full bg-[#caeb66] px-4 py-2 text-sm font-semibold text-black shadow-sm transition-all duration-200 hover:bg-[#b8d95a] hover:shadow"
            >
              Be a Rider
            </button>
          </Link>
          <CircleButton />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <Motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed left-4 right-4 top-20 z-50 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl md:hidden"
            >
              <div className="max-h-[calc(100vh-6rem)] overflow-y-auto py-4">
                {[...navItems, ...(user ? [{ to: "/dashboard", label: "My Parcel" }] : [])].map(
                  ({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block px-5 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-[#caeb66]/20 text-[#056873]"
                            : "text-[#606060] hover:bg-gray-50 hover:text-black"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  )
                )}
                <div className="my-2 border-t border-gray-100 px-2 pt-4">
                  {user ? (
                    <button
                      type="button"
                      onClick={() => {
                        handleLogOut();
                        closeMenu();
                      }}
                      className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-[#606060] hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link to="/login" onClick={closeMenu}>
                      <span className="block w-full rounded-xl border border-gray-200 py-3 text-center text-sm font-medium text-[#606060] hover:bg-gray-50">
                        Sign In
                      </span>
                    </Link>
                  )}
                  <Link to="/rider" onClick={closeMenu} className="mt-2 block">
                    <span className="block w-full rounded-xl bg-[#caeb66] py-3 text-center text-sm font-semibold text-black hover:bg-[#b8d95a]">
                      Be a Rider
                    </span>
                  </Link>
                </div>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </Motion.nav>
  );
}
