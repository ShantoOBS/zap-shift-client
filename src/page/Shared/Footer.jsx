import React from "react";
import Logo from "../../Compontens/Logo";
import { Link } from "react-router";
import facebook from "/assets/facebook.png";
import linkden from "/assets/linkedin-icon 2.png";
import youtube from "/assets/youtube.png";
import twitter from "/assets/twitter-logo-2 3.png";

const footerLinks = [
  { to: "/services", label: "Services" },
  { to: "/coverage", label: "Coverage" },
  { to: "/about", label: "About Us" },
  { to: "/pricing", label: "Pricing" },
  { to: "/rider", label: "Be a Rider" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-[#0f172a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-8 text-center">
          <div className="flex justify-center">
            <Logo color={true} />
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center gap-6">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <img src={facebook} alt="" className="h-6 w-6 md:h-7 md:w-7" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <img src={linkden} alt="" className="h-6 w-6 md:h-7 md:w-7" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <img src={youtube} alt="" className="h-6 w-6 md:h-7 md:w-7" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <img src={twitter} alt="" className="h-6 w-6 md:h-7 md:w-7" />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700/80 pt-8 text-center">
          <p className="text-sm text-slate-500">
            Copyright © {new Date().getFullYear()} ZapShift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
