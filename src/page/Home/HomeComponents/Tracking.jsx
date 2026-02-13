import React from "react";
import img1 from "/assets/live-tracking.png";
import img2 from "/assets/safe-delivery.png";

const cards = [
  {
    img: img1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    img: img2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    img: img2,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

export default function Tracking() {
  return (
    <section className="mx-auto max-w-4xl space-y-4 md:space-y-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-[0_1px_3px_0_rgb(0_0_0_/_.06)] md:flex-row md:items-center md:gap-8 md:p-6"
        >
          <div className="shrink-0">
            <img src={card.img} alt="" className="h-16 w-auto md:h-20" />
          </div>
          <div className="hidden h-16 w-px shrink-0 bg-gray-200 md:block" />
          <div className="min-w-0 flex-1 space-y-1">
            <h3 className="font-bold text-gray-900 md:text-base">
              {card.title}
            </h3>
            <p className="text-xs text-[#606060] md:text-sm">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
