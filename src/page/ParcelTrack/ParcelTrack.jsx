import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams, Link } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import { Package, MapPin, ChevronRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ParcelTrack() {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();
  const [copied, setCopied] = useState(false);

  const { data: trackings = [], isLoading, isError, error } = useQuery({
    queryKey: ['tracking', trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
    enabled: !!trackingId,
  });

  const copyTrackingId = () => {
    if (!trackingId) return;
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-[#056873] border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-500">Loading tracking history...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="rounded-2xl bg-red-50 border border-red-100 p-8 max-w-md">
          <p className="text-red-600 font-medium">Unable to load tracking</p>
          <p className="text-sm text-gray-500 mt-2">{error?.message || 'Please check the tracking ID and try again.'}</p>
          <Link
            to="/dashboard/my-parcels"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#056873] px-4 py-2 text-sm font-medium text-white hover:bg-[#04515a]"
          >
            Back to My Parcels
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-3xl mx-auto">
      {/* Header card */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-[#056873]/5 to-[#056873]/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#056873] text-white">
                <Package className="size-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Track your package
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <code className="text-sm font-mono font-medium text-[#056873] bg-white/80 px-2 py-1 rounded">
                    {trackingId}
                  </code>
                  <button
                    type="button"
                    onClick={copyTrackingId}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-white/60 hover:text-[#056873] transition-colors"
                    title="Copy tracking ID"
                  >
                    {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {trackings.length} {trackings.length === 1 ? 'update' : 'updates'}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {trackings.length === 0 ? (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-10 text-center">
          <MapPin className="size-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">No updates yet</h2>
          <p className="text-sm text-gray-500 mt-2">
            Tracking updates will appear here once your parcel is in the system.
          </p>
          <Link
            to="/dashboard/my-parcels"
            className="mt-6 inline-flex items-center gap-2 text-[#056873] font-medium hover:underline"
          >
            Back to My Parcels
            <ChevronRight className="size-4" />
          </Link>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] sm:left-6 top-2 bottom-2 w-0.5 bg-gray-200 rounded-full" />

          <ul className="space-y-0">
            {trackings.map((log) => (
              <li key={log._id} className="relative flex gap-4 sm:gap-6 pb-8 last:pb-0">
                {/* Dot */}
                <div className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#056873] text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 sm:size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Content card */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-base sm:text-lg font-medium text-gray-900">
                      {log.details || 'Update'}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      {log.createdAt
                        ? new Date(log.createdAt).toLocaleString('en-GB', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })
                        : '—'}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/dashboard/my-parcels"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#056873] transition-colors"
        >
          <ChevronRight className="size-4 rotate-180" />
          Back to My Parcels
        </Link>
      </div>
    </div>
  );
}
