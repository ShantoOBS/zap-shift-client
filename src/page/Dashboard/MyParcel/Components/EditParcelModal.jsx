import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#056873] focus:outline-none focus:ring-2 focus:ring-[#056873]/20";

export default function EditParcelModal({ parcel, onClose, onSave, isSaving: parentIsSaving }) {
  const [parcelName, setParcelName] = useState(parcel?.parcelName ?? "");
  const [cost, setCost] = useState(parcel?.cost != null ? String(parcel.cost) : "");
  const [isSaving, setIsSaving] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setParcelName(parcel?.parcelName ?? "");
    setCost(parcel?.cost != null ? String(parcel.cost) : "");
  }, [parcel]);

  if (!parcel) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        parcelName: parcelName.trim() || parcel.parcelName,
        cost: cost.trim() === "" ? parcel.cost : Number(cost)
      };
      // PATCH request to update the parcel
      const { data } = await axiosSecure.patch(`/parcels/${parcel._id}`, payload);
      if (data && (data.modifiedCount || data.matchedCount || data.acknowledged)) {
        Swal.fire({
          title: "Updated",
          text: "Parcel has been updated.",
          icon: "success"
        });
        if (onSave) onSave(parcel._id, payload);
        onClose();
      } else {
        Swal.fire({
          title: "Error",
          text: "No changes were made to the parcel.",
          icon: "warning"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update parcel.",
        icon: "error"
      });
    } finally {
      setIsSaving(false);
    }
  };

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
        aria-labelledby="edit-parcel-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 xs:mb-4 flex flex-col xs:flex-row items-center justify-between gap-2">
          <h2
            id="edit-parcel-title"
            className="text-base xs:text-lg font-semibold text-[#056873]"
          >
            Edit parcel
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 self-end xs:self-auto"
            aria-label="Close"
            disabled={isSaving || parentIsSaving}
          >
            <X className="h-5 w-5 cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-parcelName" className="mb-1 block text-sm font-medium text-gray-700">
              Parcel Name
            </label>
            <input
              id="edit-parcelName"
              type="text"
              value={parcelName}
              onChange={(e) => setParcelName(e.target.value)}
              className={inputClass}
              placeholder="e.g. Documents, Gift box"
              disabled={isSaving || parentIsSaving}
            />
          </div>
          <div>
            <label htmlFor="edit-cost" className="mb-1 block text-sm font-medium text-gray-700">
              Cost
            </label>
            <input
              id="edit-cost"
              type="number"
              min="0"
              step="0.01"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className={inputClass}
              placeholder="0"
              disabled={isSaving || parentIsSaving}
            />
          </div>
          <div className="mt-5 xs:mt-6 flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border cursor-pointer border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 w-full xs:w-auto"
              disabled={isSaving || parentIsSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#056873] cursor-pointer px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#04515a] w-full xs:w-auto disabled:opacity-60"
              disabled={isSaving || parentIsSaving}
            >
              {(isSaving || parentIsSaving) ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
