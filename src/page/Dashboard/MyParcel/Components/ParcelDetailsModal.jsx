import React from "react";
import { X } from "lucide-react";

export default function ParcelDetailsModal({ parcel, onClose }) {
  if (!parcel) return null;

  const rows = [
    { label: "Parcel Name", value: parcel.parcelName || "—" },
    { label: "Cost", value: parcel.cost != null ? String(parcel.cost) : "—" },
    {
      label: "Payment Status",
      value: parcel.paymentStatus
        ? parcel.paymentStatus.charAt(0).toUpperCase() + parcel.paymentStatus.slice(1)
        : "—",
    },
    { label: "Sender Email", value: parcel.senderEmail || "—" },
    { label: "Parcel ID", value: parcel._id || "—" },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-[95vw] sm:max-w-lg md:max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-2 py-3 xs:px-4 xs:py-5 sm:px-6 sm:py-6 shadow-xl overflow-y-auto max-h-[90dvh] md:max-h-[85vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="parcel-details-title"
      >
        <div className="mb-3 xs:mb-4 flex flex-col xs:flex-row items-center justify-between gap-2">
          <h2
            id="parcel-details-title"
            className="text-base xs:text-lg font-semibold text-[#056873]"
          >
            Parcel details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 self-end xs:self-auto"
            aria-label="Close"
          >
            <X className="h-5 w-5 cursor-pointer" />
          </button>
        </div>
        <dl className="space-y-3 xs:space-y-4">
          {rows.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col xs:flex-row xs:items-center gap-0.5 xs:gap-2 border-b border-gray-100 pb-3 xs:pb-2 last:border-0"
            >
              <dt className="w-fit min-w-[9rem] text-xs xs:text-sm font-medium uppercase tracking-wider text-gray-500">
                {label}
              </dt>
              <dd className="text-sm xs:text-base font-medium text-gray-900 break-words max-w-full">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 xs:mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#056873] cursor-pointer px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#04515a] w-full xs:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
