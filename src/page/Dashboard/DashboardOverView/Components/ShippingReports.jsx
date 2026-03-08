import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
  Calendar,
  ChevronDown,
  Filter,
  MoreVertical,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const STATUS_STYLES = {
  delivered: "bg-green-100 text-green-800",
  transit: "bg-blue-100 text-blue-800",
  intransit: "bg-blue-100 text-blue-800",
  waiting: "bg-red-100 text-red-800",
  pending: "bg-amber-100 text-amber-800",
};

function getStatusLabel(status) {
  if (!status) return "—";
  const s = String(status).trim();
  if (!s) return "—";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase().replace(/intransit/i, "Transit");
}

function formatDate(val) {
  if (!val) return "—";
  try {
    const d = new Date(val);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return String(val);
  }
}

function normalizeReports(apiData) {
  if (!apiData) return { list: [], total: 0 };
  const list = Array.isArray(apiData.data)
    ? apiData.data
    : Array.isArray(apiData.reports)
      ? apiData.reports
      : Array.isArray(apiData)
        ? apiData
        : [];
  const total = apiData.total ?? apiData.totalCount ?? list.length;
  return { list, total };
}

const PER_PAGE = 6;
const MAX_VISIBLE_PAGES = 5;

export default function ShippingReports() {
  const [page, setPage] = useState(1);
  const [dateRangeLabel] = useState("This Week");
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", "shipping-reports", page],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/shipping-reports", {
        params: { page, limit: PER_PAGE, period: "this-week" },
      });
      return res?.data ?? null;
    },
    retry: 1,
  });

  const { list: rawList, total } = normalizeReports(data);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE) || Math.ceil(rawList.length / PER_PAGE));
  const list = rawList.map((row) => ({
    id: row.id ?? row._id ?? row.reportId ?? `#RQ${String(row.id ?? row._id ?? "").slice(-5)}`,
    client: row.client ?? row.clientName ?? row.customer ?? "—",
    date: row.date ?? row.createdAt ?? row.shipDate,
    weight: row.weight != null ? `${row.weight} kg` : row.weightKg != null ? `${row.weightKg} kg` : "—",
    shipper: row.shipper ?? row.shipperName ?? row.carrier ?? "—",
    price: row.price != null ? Number(row.price).toFixed(2) : row.cost != null ? Number(row.cost).toFixed(2) : "—",
    status: (row.status ?? "").toLowerCase().replace(/\s+/g, ""),
  }));

  const displayId = (row) => {
    const id = row.id ?? row._id ?? "";
    if (String(id).startsWith("#")) return id;
    return `#RQ${String(id).slice(-5)}`;
  };

  const paginationPages = () => {
    const pages = [];
    if (totalPages <= MAX_VISIBLE_PAGES + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      pages.push("ellipsis");
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    }
    return pages;
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_0_rgb(0_0_0/.06)]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
        <h2 className="text-lg font-bold text-gray-900">Shipping Reports</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Calendar className="size-4 text-gray-500" />
            {dateRangeLabel}
            <ChevronDown className="size-4 text-gray-500" />
          </button>
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
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/80 text-gray-600">
              <th className="px-4 py-3 font-medium md:px-5">ID</th>
              <th className="px-4 py-3 font-medium md:px-5">Client</th>
              <th className="px-4 py-3 font-medium md:px-5">Date</th>
              <th className="px-4 py-3 font-medium md:px-5">Weight</th>
              <th className="px-4 py-3 font-medium md:px-5">Shipper</th>
              <th className="px-4 py-3 font-medium md:px-5">Price</th>
              <th className="px-4 py-3 font-medium md:px-5">Status</th>
              <th className="px-4 py-3 font-medium md:px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-gray-500 md:px-5">
                  <div className="flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#056873] border-t-transparent" />
                  </div>
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-red-600 md:px-5">
                  Failed to load shipping reports.
                </td>
              </tr>
            )}
            {!isLoading && !isError && list.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-gray-500 md:px-5">
                  No reports found.
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
                    {displayId(row)}
                  </td>
                  <td className="px-4 py-3 text-gray-700 md:px-5">{row.client}</td>
                  <td className="px-4 py-3 text-gray-700 md:px-5">
                    {formatDate(row.date)}
                  </td>
                  <td className="px-4 py-3 text-gray-700 md:px-5">{row.weight}</td>
                  <td className="px-4 py-3 text-gray-700 md:px-5">{row.shipper}</td>
                  <td className="px-4 py-3 text-gray-700 md:px-5">{row.price}</td>
                  <td className="px-4 py-3 md:px-5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        STATUS_STYLES[row.status] ?? "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {getStatusLabel(row.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 md:px-5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                      >
                        <Pencil className="size-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        aria-label="More actions"
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                      >
                        <MoreVertical className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-4 py-3 md:px-5">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="inline-flex items-center cursor-pointer gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          <ChevronLeft className="size-4" />
          Previous
        </button>
        <div className="flex items-center gap-1">
          {paginationPages().map((p, i) =>
            p === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`flex h-9 w-9 items-center justify-center rounded-full cursor-pointer text-sm font-medium transition-colors ${
                  page === p
                    ? "bg-[#caeb66] text-gray-900"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="inline-flex items-center cursor-pointer gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          Next
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
