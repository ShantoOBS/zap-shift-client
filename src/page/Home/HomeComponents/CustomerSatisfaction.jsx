import React from "react";
import { Link } from "react-router";
import locationMerchant from "/assets/location-merchant.png";
import bgMix from "/assets/be-a-merchant-bg.png";

export default function CustomerSatisfaction() {
  return (
    <div className="relative mx-auto flex max-w-5xl flex-col-reverse gap-6 overflow-hidden rounded-2xl bg-[#03373d] p-8 text-white shadow-lg md:flex-row md:gap-8 md:p-12 lg:p-16">
      <img
        src={bgMix}
        alt=""
        className="pointer-events-none absolute left-4 top-0 max-h-24 opacity-80"
        aria-hidden
      />
      <div className="relative z-10 flex-1 space-y-6 md:w-[70%]">
        <h2 className="text-2xl font-bold md:text-3xl">
          Merchant and Customer Satisfaction is Our First Priority
        </h2>
        <p className="text-sm text-slate-300">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. ZapShift delivers your parcels in every
          corner of Bangladesh right on time.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/send-parcel">
            <span className="inline-block rounded-xl bg-[#caeb66] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#b8d95a]">
              Become a Merchant
            </span>
          </Link>
          <Link to="/rider">
            <span className="inline-block rounded-xl border border-white/40 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10">
              Earn with ZapShift Courier
            </span>
          </Link>
        </div>
      </div>
      <div className="relative z-10 shrink-0">
        <img src={locationMerchant} alt="" className="max-h-64 w-auto md:max-h-80" />
      </div>
    </div>
  );
}
