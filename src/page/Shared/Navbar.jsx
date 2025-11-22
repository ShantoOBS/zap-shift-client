import { useState } from "react";
import { NavLink,  } from "react-router"; // NavLink for active detection
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import Logo from "../../Compontens/Logo";
import CircleButton from "../../Compontens/CircleButton";
import useAuth from '../../Hooks/useAuth'

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const {user,logOut}=useAuth();

  const hendleLogOut=()=>{
     
       logOut()
       .then(()=>{
    
       })
       .catch(()=>{})
  }
  // Tailwind classes for active link
  const activeClass =
    "bg-[#caeb66] text-black rounded-full px-3 py-1";

  return (
    <nav className="w-full bg-white rounded-2xl mb-5 shadow-sm relative">
      <div className="px-6 md:px-8 py-3 flex items-center justify-between">
        {/* LEFT LOGO */}
        <Logo color={false} />

        {/* CENTER LINKS (DESKTOP) */}
        <div className="hidden md:flex text-[#606060] text-sm gap-6">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${isActive ? activeClass : "hover:text-black"}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/coverage"
            className={({ isActive }) =>
              `${isActive ? activeClass : "hover:text-black"}`
            }
          >
            Coverage
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? activeClass : "hover:text-black"}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `${isActive ? activeClass : "hover:text-black"}`
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/rider"
            className={({ isActive }) =>
              `${isActive ? activeClass : "hover:text-black"}`
            }
          >
            Be a Rider
          </NavLink>
        </div>

        {/* RIGHT BUTTONS (DESKTOP) */}
        <div className="hidden md:flex gap-3 items-center">
         
          {
             user ?  
                <button onClick={hendleLogOut} className="px-4 py-2 border border-gray-300 rounded-md
                cursor-pointer bg-white hover:bg-gray-100 text-[#606060]">
             Sign Out
            </button>

         :  <Link to='/login'>
            
                <button className="px-4 py-2 border
                cursor-pointer border-gray-300 rounded-md bg-white hover:bg-gray-100 text-[#606060]">
            Sign In
          </button>

         </Link>
          }

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-md bg-[#caeb66] hover:bg-[#abc758] text-black font-bold">
              Be a Rider
            </button>
            <CircleButton />
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-800 text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU WITH ANIMATION */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="md:hidden absolute top-20 left-0 w-full mx-5 bg-white shadow-lg rounded-b-2xl px-6 pb-4 space-y-3 z-50"
          >
            <div className="space-y-2">
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `block py-2 border-b px-3 rounded-full ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/coverage"
                className={({ isActive }) =>
                  `block py-2 border-b px-3 rounded-full ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                Coverage
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-2 border-b px-3 rounded-full ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                About Us
              </NavLink>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `block py-2 border-b px-3 rounded-full ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                Pricing
              </NavLink>
              <NavLink
                to="/rider"
                className={({ isActive }) =>
                  `block py-2 border-b px-3 rounded-full ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                Be a Rider
              </NavLink>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button className="w-full py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-[#606060]">
                Sign In
              </button>

              <button className="w-full py-2 rounded-md bg-[#caeb66] hover:bg-[#abc758] text-black">
                Be a Rider
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
