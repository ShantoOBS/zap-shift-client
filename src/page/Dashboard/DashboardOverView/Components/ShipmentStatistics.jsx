import React, { useState, useId } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Calendar,
  ChevronDown,
  MoreVertical,
} from "lucide-react";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function normalizeChartData(apiData, mode) {
  if (!apiData) return [];
  const series = mode === "packages" ? apiData.packages : apiData.income;
  if (Array.isArray(series) && series.length > 0) {
    return series.map((item, i) => ({
      day: item.day ?? DAY_LABELS[i] ?? `Day ${i + 1}`,
      value: Number(item.value ?? 0),
      date: item.date ?? null,
    }));
  }
  if (Array.isArray(apiData.data)) {
    return apiData.data.map((item) => ({
      day: item.day ?? item.name,
      value: Number(mode === "packages" ? item.packages ?? item.value : item.income ?? item.value ?? 0),
      date: item.date ?? null,
    }));
  }
  return [];
}

function formatYAxis(value) {
  if (value >= 1000) return `$${value / 1000}k`;
  return `$${value}`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;
  const value = item.value;
  const displayValue =
    typeof value === "number" && value >= 1000
      ? `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
      : `$${Number(value).toLocaleString()}`;
  let dateStr = label;
  if (item.date) {
    try {
      dateStr = new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      dateStr = String(item.date);
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs text-gray-500">{dateStr}</p>
      <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-gray-900">
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        {displayValue}
      </p>
    </div>
  );
}

export default function ShipmentStatistics() {
  const [mode, setMode] = useState("income");
  const dateRangeLabel = "This Week";
  const axiosSecure = useAxiosSecure();
  const gradientId = useId().replace(/:/g, "-");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", "shipment-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/shipment-stats", {
        params: { period: "this-week" },
      });
      return res?.data ?? null;
    },
    retry: 1,
  });

  const changePercent = data?.changePercent ?? data?.change ?? 0;
  const chartData = normalizeChartData(data, mode);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_1px_3px_0_rgb(0_0_0/.06)] md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900">
            Shipment Statistics
          </h2>
          <span className="inline-flex items-center gap-0.5 text-sm font-medium text-green-600">
            <TrendingUp className="size-4" />
            +{Number(changePercent).toFixed(0)}%
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 bg-gray-50/50 p-0.5">
            <button
              type="button"
              onClick={() => setMode("income")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === "income"
                  ? "bg-[#caeb66] text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setMode("packages")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === "packages"
                  ? "bg-[#caeb66] text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Packages
            </button>
          </div>

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
            aria-label="More options"
            className="rounded-lg border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50"
          >
            <MoreVertical className="size-5" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full">
        {isError && (
          <div className="flex h-full items-center justify-center rounded-xl bg-red-50 text-sm text-red-700">
            Failed to load shipment statistics.
          </div>
        )}
        {isLoading && (
          <div className="flex h-full items-center justify-center rounded-xl bg-gray-50">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#056873] border-t-transparent" />
          </div>
        )}
        {!isLoading && !isError && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#caeb66"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="#caeb66"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={true}
                horizontal={true}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                domain={["auto", "auto"]}
                ticks={[1000, 5000, 10000, 15000, 20000, 25000]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "4 4", stroke: "#9ca3af" }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#86b34a"
                strokeWidth={2}
                fill={`url(#${gradientId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
        {!isLoading && !isError && chartData.length === 0 && (
          <div className="flex h-full items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-500">
            No data for this period.
          </div>
        )}
      </div>
    </div>
  );
}
