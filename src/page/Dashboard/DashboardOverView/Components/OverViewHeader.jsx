import React from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";

export default function OverViewHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          You can access all your data and information from anywhere.
        </p>
      </div>
      <Link
        to="/send-parcel"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#caeb66] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#b8d95a]"
      >
        <Plus className="size-5" />
        Create Shipment
      </Link>
    </div>
  );
}
