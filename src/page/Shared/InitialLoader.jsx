import React from "react";
import logo from "/assets/logo.png";

export default function InitialLoader() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#eaeced]"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-[#056873]/10 opacity-75" style={{ animationDuration: "2s" }} />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-(--shadow-lg) ring-2 ring-[#056873]/10">
            <img
              src={logo}
              alt=""
              className="h-12 w-12 object-contain -rotate-4"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-xl font-bold tracking-tight text-[#056873]">
            ZapShift
          </p>
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#056873]" style={{ animationDelay: "0ms" }} />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#056873]" style={{ animationDelay: "150ms" }} />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#056873]" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 w-32 -translate-x-1/2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-1 w-1/3 rounded-full bg-[#056873] animate-pulse"
          style={{ animationDuration: "1s" }}
        />
      </div>
    </div>
  );
}
