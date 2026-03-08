import React, { useState } from "react";

const parcelTypes = [
  { value: "", label: "Select Parcel type" },
  { value: "document", label: "Document" },
  { value: "parcel", label: "Parcel" },
];

const deliveryOptions = [
  { value: "", label: "Select Delivery Destination" },
  { value: "same", label: "Within same district" },
  { value: "other", label: "To another district" },
];

function calculateCost(parcelType, destination, weightKg) {
  const isDocument = parcelType === "document";
  const isSameDistrict = destination === "same";
  const parcelWeight = parseFloat(weightKg) || 0;

  if (isDocument) {
    return isSameDistrict ? 60 : 80;
  }

  if (parcelWeight < 3) {
    return isSameDistrict ? 110 : 150;
  }

  const minCharge = isSameDistrict ? 110 : 150;
  const extraWeight = parcelWeight - 3;
  const extraCharge = isSameDistrict
    ? extraWeight * 40
    : extraWeight * 40 + 40;
  return minCharge + extraCharge;
}

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-500 focus:border-[#056873] focus:outline-none focus:ring-2 focus:ring-[#056873]/20";
const selectClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black focus:border-[#056873] focus:outline-none focus:ring-2 focus:ring-[#056873]/20";

export default function PricingCalculator() {
  const [parcelType, setParcelType] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!parcelType || !destination) {
      setResult(null);
      return;
    }
    const cost = calculateCost(parcelType, destination, weight);
    setResult(cost);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setParcelType("");
    setDestination("");
    setWeight("");
    setResult(null);
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_0_rgb(0_0_0/.06)] my-5 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#056873] md:text-4xl">
          Pricing Calculator
        </h1>
        <p className="mt-2 text-sm text-[#606060]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <form
          onSubmit={handleCalculate}
          className="flex-1 space-y-5"
        >
          <h2 className="text-xl font-semibold text-[#056873]">
            Calculate Your Cost
          </h2>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Parcel type
            </label>
            <select
              value={parcelType}
              onChange={(e) => setParcelType(e.target.value)}
              className={selectClass}
              required
            >
              {parcelTypes.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={!opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Delivery Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={selectClass}
              required
            >
              {deliveryOptions.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={!opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Weight (KG)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              className={inputClass}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#caeb66] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#b8d95a]"
            >
              Calculate
            </button>
          </div>
        </form>

        <div className="flex flex-1 items-center justify-center lg:justify-start">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 px-8 py-10 text-center min-w-[200px]">
            {result != null ? (
              <p className="text-4xl font-bold text-black md:text-5xl">
                {result} Tk
              </p>
            ) : (
              <p className="text-lg text-gray-400">—</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
