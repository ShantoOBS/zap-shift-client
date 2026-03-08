import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import OverViewHeader from "./Components/OverViewHeader";
import OverviewCards from "./Components/OverviewCards";
import ShipmentStatistics from "./Components/ShipmentStatistics";
import ShippingReports from "./Components/ShippingReports";
import LateInvoices from "./Components/LateInvoices";
import ShipmentAlerts from "./Components/ShipmentAlerts";

const DEFAULT_METRICS = [
  { title: "New Packages", value: 0, changePercent: 0 },
  { title: "Ready for Shipping", value: 0, changePercent: 0 },
  { title: "Completed", value: 0, changePercent: 0 },
  { title: "New Clients", value: 0, changePercent: 0 },
];

function normalizeOverviewData(data) {
  if (!data) return DEFAULT_METRICS;

  if (Array.isArray(data.metrics)) return data.metrics;
  if (Array.isArray(data)) return data;

  const flat = {
    newPackages: { title: "New Packages", value: 0, changePercent: 0 },
    readyForShipping: {
      title: "Ready for Shipping",
      value: 0,
      changePercent: 0,
    },
    completed: { title: "Completed", value: 0, changePercent: 0 },
    newClients: { title: "New Clients", value: 0, changePercent: 0 },
  };

  if (data.newPackages != null) {
    flat.newPackages.value = data.newPackages;
    flat.newPackages.changePercent = data.newPackagesChange ?? 0;
  }
  if (data.readyForShipping != null) {
    flat.readyForShipping.value = data.readyForShipping;
    flat.readyForShipping.changePercent = data.readyForShippingChange ?? 0;
  }
  if (data.completed != null) {
    flat.completed.value = data.completed;
    flat.completed.changePercent = data.completedChange ?? 0;
  }
  if (data.newClients != null) {
    flat.newClients.value = data.newClients;
    flat.newClients.changePercent = data.newClientsChange ?? 0;
  }

  return Object.values(flat);
}

export default function DashboardOverView() {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/overview");
      return res.data;
    },
  });

  const metrics = normalizeOverviewData(data);

  return (
    <div className="space-y-6">
      <OverViewHeader />

      <div className="border-t border-dashed border-gray-300 " />

      {isError && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load overview. Showing default metrics.
        </div>
      )}

      {isLoading ? (
        <OverviewCards metrics={null} />
      ) : (
        <OverviewCards metrics={metrics} />
      )}

      <ShipmentStatistics />

      <ShippingReports />

      <LateInvoices />

      <ShipmentAlerts />
    </div>
  );
}
