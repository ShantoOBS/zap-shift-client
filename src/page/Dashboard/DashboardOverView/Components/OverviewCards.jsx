import React from "react";
import { Package, TrendingUp, TrendingDown } from "lucide-react";

function MetricCard({ title, value, changePercent }) {
  const isPositive = changePercent >= 0;
  const isNegative = changePercent < 0;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_1px_3px_0_rgb(0_0_0/.06)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
          <Package className="size-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-sm">
            {isPositive && (
              <>
                <TrendingUp className="size-4 text-green-600" />
                <span className="text-green-600">
                  +{Number(changePercent).toFixed(1)}%
                </span>
              </>
            )}
            {isNegative && (
              <>
                <TrendingDown className="size-4 text-red-600" />
                <span className="text-red-600">
                  {Number(changePercent).toFixed(1)}%
                </span>
              </>
            )}
            <span className="text-gray-400">vs last week</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OverviewCards({ metrics }) {
  if (!metrics || metrics.length === 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="h-12 w-12 animate-pulse rounded-full bg-gray-100" />
            <div className="mt-3 h-4 w-24 animate-pulse rounded bg-gray-100" />
            <div className="mt-2 h-8 w-16 animate-pulse rounded bg-gray-100" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.title || index}
          title={metric.title}
          value={metric.value}
          changePercent={metric.changePercent ?? 0}
        />
      ))}
    </div>
  );
}
