import React, { useState } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does parcel tracking work?",
    answer:
      "Once your parcel is booked, you receive a unique tracking ID. Use it on our website or app to see real-time status from pick-up to delivery.",
  },
  {
    question: "What areas do you deliver to?",
    answer:
      "We deliver nationwide across Bangladesh. Check our Coverage page for district-wise availability and estimated delivery times.",
  },
  {
    question: "How can I pay for my shipment?",
    answer:
      "We support cash on delivery (COD), online payment, and corporate billing. Choose the option that fits you at checkout.",
  },
  {
    question: "What if my parcel is lost or damaged?",
    answer:
      "We have a claims process and insurance options. Contact support with your tracking ID and we’ll resolve it as per our policy.",
  },
  {
    question: "How do I become a rider or merchant partner?",
    answer:
      "Visit the Be a Rider or Send Parcel section to sign up. Our team will guide you through onboarding and training.",
  },
];

export default function FQA() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-5 text-center">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-[#606060]">
          Everything you need to know about sending and tracking parcels with
          ZapShift.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-[0_1px_3px_0_rgb(0_0_0_/_.06)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-gray-900"
            >
              {faq.question}
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="border-t border-gray-100 px-5 pb-4 pt-2">
                <p className="text-sm text-[#606060]">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/coverage">
          <span className="inline-block rounded-xl bg-[#caeb66] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#b8d95a]">
            See more FAQs
          </span>
        </Link>
      </div>
    </section>
  );
}
