import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Clock, FileText } from "lucide-react";

function formatTimeAgo(val) {
  if (!val) return "—";
  try {
    const d = new Date(val);
    const now = new Date();
    const diffMs = now - d;
    const diffMin = Math.floor(diffMs / 60000);
    const diffH = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffH / 24);

    if (diffMin < 60) return diffMin <= 1 ? "1 min ago" : `${diffMin} mins ago`;
    if (diffH < 24) return diffH === 1 ? "1 Hour ago" : `${diffH} Hours ago`;
    if (diffDay === 1) return "1 day ago";
    if (diffDay < 30) return `${diffDay} days ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return String(val);
  }
}

function getAlertIconStyle(type, index) {
  const t = (type ?? "").toLowerCase();
  if (t.includes("damaged")) return index === 1 ? "bg-red-500 text-white" : "bg-[#056873] text-white";
  if (t.includes("weather")) return "bg-amber-500/90 text-white";
  return "bg-gray-200 text-gray-600";
}

function getAlertTypeLabel(type) {
  const t = (type ?? "").toLowerCase();
  if (t.includes("weather")) return "Weather Delays";
  if (t.includes("damaged")) return "Damaged";
  return (type ?? "Alert").charAt(0).toUpperCase() + (type ?? "").slice(1).toLowerCase();
}

function normalizeAlerts(apiData) {
  if (!apiData) return { stats: { damaged: 0, weatherDelays: 0 }, list: [] };
  const list = Array.isArray(apiData.alerts)
    ? apiData.alerts
    : Array.isArray(apiData.data)
      ? apiData.data
      : Array.isArray(apiData)
        ? apiData
        : [];
  const stats = {
    damaged: apiData.damaged ?? apiData.stats?.damaged ?? 0,
    weatherDelays: apiData.weatherDelays ?? apiData.weather_delays ?? apiData.stats?.weatherDelays ?? 0,
  };
  return { stats, list };
}

function displayShipmentId(row) {
  const id = row.shipmentId ?? row.shipment_id ?? row.trackingId ?? row.id ?? row._id ?? "";
  const str = String(id);
  if (str.startsWith("#")) return `Shipment ${str}`;
  return `Shipment #${str}`;
}

export default function ShipmentAlerts() {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", "shipment-alerts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/shipment-alerts");
      return res?.data ?? null;
    },
    retry: 1,
  });

  const { stats, list } = normalizeAlerts(data);
  const alerts = list.map((row) => ({
    type: row.type ?? row.alertType ?? row.status ?? "Damaged",
    shipmentId: displayShipmentId(row),
    time: row.time ?? row.createdAt ?? row.timestamp ?? row.date,
  }));

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_1px_3px_0_rgb(0_0_0/.06)] md:p-5">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-gray-900">Shipment Alerts</h2>
        <Link
          to="/dashboard/payment-history"
          className="rounded-lg bg-[#caeb66] px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#b8d95a]"
        >
          View All Invoices
        </Link>
      </div>

      {/* Statistics */}
      <div className="mb-4 flex rounded-xl bg-gray-100 p-4">
        <div className="flex flex-1 flex-col items-center border-r border-gray-200 pr-4">
          <span className="text-2xl font-bold text-gray-900 md:text-3xl">
            {Number(stats.damaged)}
          </span>
          <span className="mt-1 text-sm font-medium text-gray-600">Damaged</span>
        </div>
        <div className="flex flex-1 flex-col items-center pl-4">
          <span className="text-2xl font-bold text-gray-900 md:text-3xl">
            {Number(stats.weatherDelays)}
          </span>
          <span className="mt-1 text-sm font-medium text-gray-600">Weather Delays</span>
        </div>
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#056873] border-t-transparent" />
          </div>
        )}
        {isError && (
          <div className="rounded-xl bg-red-50 py-4 text-center text-sm text-red-600">
            Failed to load shipment alerts.
          </div>
        )}
        {!isLoading && !isError && alerts.length === 0 && (
          <div className="rounded-xl bg-gray-50 py-6 text-center text-sm text-gray-500">
            No shipment alerts.
          </div>
        )}
        {!isLoading && !isError &&
          alerts.map((alert, index) => (
            <div
              key={alert.shipmentId + index}
              className="flex items-center gap-4 rounded-xl bg-gray-50 p-3"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getAlertIconStyle(alert.type, index)}`}
              >
                <Clock className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">
                  {getAlertTypeLabel(alert.type)}
                </p>
                <p className="text-sm text-gray-700">{alert.shipmentId}</p>
                <p className="text-xs text-gray-500">{formatTimeAgo(alert.time)}</p>
              </div>
              <button
                type="button"
                aria-label="View details"
                className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
              >
                <FileText className="size-5" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
