import React, { useState } from "react";
import { Link } from "react-router";
import { HelpCircle, ChevronDown, Mail, FileText, Truck } from "lucide-react";

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
      "We have a claims process and insurance options. Contact support with your tracking ID and we'll resolve it as per our policy.",
  },
  {
    question: "How do I become a rider?",
    answer:
      "Visit the Be a Rider section to sign up. Our team will guide you through onboarding and training.",
  },
];

const quickLinks = [
  { label: "Send a parcel", to: "/send-parcel", icon: Truck },
  { label: "Pricing calculator", to: "/pricing-calculator", icon: FileText },
  { label: "Coverage & zones", to: "/coverage", icon: Truck },
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mx-auto ">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
        Help
      </h1>
      <p className="mb-8 text-sm text-[#606060]">
        Find answers and get support for ZapShift delivery.
      </p>

      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <HelpCircle className="size-5 text-[#056873]" />
          Quick links
        </h2>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-[#056873]/30 hover:bg-[#056873]/5 hover:text-[#056873]"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <FileText className="size-5 text-[#056873]" />
          Frequently asked questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                {faq.question}
                <ChevronDown
                  className={`size-4 shrink-0 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-[#056873]/5 border border-[#056873]/10 p-6">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Mail className="size-5 text-[#056873]" />
          Contact support
        </h2>
        <p className="text-sm text-gray-600">
          Need more help? Reach out to our support team for assistance with
          tracking, claims, or account issues.
        </p>
        <a
          href="mailto:support@zapshift.com"
          className="mt-3 inline-block text-sm font-medium text-[#056873] hover:underline"
        >
          support@zapshift.com
        </a>
      </section>
    </div>
  );
}
