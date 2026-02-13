import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

function formatPaymentDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  const day = d.getDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getMonth()];
  return `${day} ${month} (Paid)`;
}

export default function PaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="">

      <div className="overflow-hidden rounded-2xl bg-[#f4f4f5] shadow-sm">
      <h1 className="p-4 text-2xl font-bold text-[#056873] md:text-3xl">
        Payment History
      </h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-white/80 text-left text-sm font-medium text-gray-700">
                <th className="px-4 py-4 md:px-6">Parcel Info</th>
                <th className="px-4 py-4 md:px-6">Recipient Info</th>
                <th className="px-4 py-4 md:px-6">Tracking Number</th>
                <th className="px-4 py-4 md:px-6">Payment Date</th>
                <th className="px-4 py-4 md:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-sm text-gray-500 md:px-6"
                  >
                    No payment history yet.
                  </td>
                </tr>
              ) : (
                payments.map((payment, index) => (
                  <tr
                    key={payment._id || index}
                    className="border-b border-gray-100 bg-white transition-colors last:border-0 hover:bg-gray-50/80"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 md:px-6">
                      {payment.parcelName || "—"}
                    </td>
                    <td className="max-w-[200px] px-4 py-3 text-sm text-gray-600 md:px-6">
                      <span className="block truncate" title={payment.senderEmail || payment.recipientName}>
                        {payment.recipientName || payment.senderEmail || "—"}
                      </span>
                      {payment.recipientPhone && (
                        <span className="mt-0.5 block text-xs text-gray-500">
                          {payment.recipientPhone}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-gray-700 md:px-6">
                      {payment.transactionId || payment.trackingNumber || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 md:px-6">
                      {formatPaymentDate(payment.paidAt)}
                    </td>
                    <td className="px-4 py-3 text-right md:px-6">
                      <button
                        type="button"
                        className="rounded-lg bg-[#056873] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#04515a]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
