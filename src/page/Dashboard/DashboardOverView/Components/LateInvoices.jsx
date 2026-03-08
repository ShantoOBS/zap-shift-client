import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Filter, MoreVertical } from "lucide-react";

function formatRelativeDate(val) {
  if (!val) return "—";
  try {
    const d = new Date(val);
    const now = new Date();
    const diffMs = now - d;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffH = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffH / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffH < 24) return `${diffH}h ago`;
    if (diffDay === 1) return "1 day ago";
    if (diffDay < 30) return `${diffDay} days ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return String(val);
  }
}

function normalizeInvoices(apiData) {
  if (!apiData) return [];
  if (Array.isArray(apiData.data)) return apiData.data;
  if (Array.isArray(apiData.invoices)) return apiData.invoices;
  if (Array.isArray(apiData)) return apiData;
  return [];
}

function displayInvoiceNo(row) {
  const id = row.id ?? row._id ?? row.invoiceId ?? "";
  const str = String(id);
  if (str.startsWith("#PTD") || str.startsWith("#PTD ")) return str;
  return `#PTD ${str.slice(-9)}`;
}

export default function LateInvoices() {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", "late-invoices"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/late-invoices");
      return res?.data ?? null;
    },
    retry: 1,
  });

  const list = normalizeInvoices(data).map((row) => ({
    id: row.id ?? row._id,
    no: displayInvoiceNo(row),
    price: row.price != null ? Number(row.price).toFixed(2) : row.amount != null ? Number(row.amount).toFixed(2) : "—",
    date: row.date ?? row.createdAt ?? row.dueDate ?? row.updatedAt,
  }));

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_0_rgb(0_0_0/.06)]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
        <h2 className="text-lg font-bold text-gray-900">Late Invoices</h2>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard/payment-history"
            className="rounded-lg bg-[#caeb66] px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#b8d95a]"
          >
            View All Invoices
          </Link>
          <button
            type="button"
            aria-label="Filter"
            className="rounded-full border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50"
          >
            <Filter className="size-4" />
          </button>
          <button
            type="button"
            aria-label="More options"
            className="rounded-full border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50"
          >
            <MoreVertical className="size-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/80 text-gray-600">
              <th className="px-4 py-3 font-medium md:px-5">No</th>
              <th className="px-4 py-3 font-medium md:px-5">Price</th>
              <th className="px-4 py-3 font-medium md:px-5">Date</th>
              <th className="px-4 py-3 font-medium md:px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-gray-500 md:px-5">
                  <div className="flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#056873] border-t-transparent" />
                  </div>
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-red-600 md:px-5">
                  Failed to load late invoices.
                </td>
              </tr>
            )}
            {!isLoading && !isError && list.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-gray-500 md:px-5">
                  No late invoices.
                </td>
              </tr>
            )}
            {!isLoading && !isError &&
              list.map((row, index) => (
                <tr
                  key={row.id ?? index}
                  className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/50"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 md:px-5">
                    {row.no}
                  </td>
                  <td className="px-4 py-3 text-gray-700 md:px-5">{row.price}</td>
                  <td className="px-4 py-3 text-gray-700 md:px-5">
                    {formatRelativeDate(row.date)}
                  </td>
                  <td className="px-4 py-3 text-right md:px-5">
                    <button
                      type="button"
                      aria-label="More actions"
                      className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                    >
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
