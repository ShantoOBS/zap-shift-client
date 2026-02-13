import React, { useState } from "react";

const tabs = [
  {
    id: "story",
    label: "Story",
    title: "Our Story",
    content: (
      <>
        <p>
          We started with a simple but powerful idea: parcel delivery shouldn’t
          be stressful. In a world where time is precious and expectations are
          high, we saw an opportunity to build something better — a service
          that values speed, transparency, and care.
        </p>
        <p>
          What began as a small operation with a handful of deliveries has
          grown into a trusted logistics network serving thousands across the
          country. From the very beginning, we focused on solving real
          problems: missed deadlines, lost packages, and poor communication.
        </p>
        <p>
          Our solution? Real-time tracking, optimized delivery routes, and a
          support team that actually listens. Every package we deliver carries
          the weight of someone’s trust — and we never take that lightly.
        </p>
      </>
    ),
  },
  {
    id: "mission",
    label: "Mission",
    title: "Our Mission",
    content: (
      <>
        <p>
          Our mission is to redefine what delivery means in the modern age. We
          believe logistics should be invisible — smooth, fast, and worry-free.
          Whether it’s a birthday gift from a loved one or a critical business
          shipment, our goal is the same: deliver it safely, quickly, and with
          full transparency.
        </p>
        <p>
          We’re not just moving parcels — we’re connecting people, powering
          businesses, and building trust. Through smart technology, responsive
          service, and a relentless focus on reliability, we aim to make
          delivery feel effortless.
        </p>
        <p>
          Every decision we make is guided by one principle:{" "}
          <strong>put the customer first, always.</strong>
        </p>
      </>
    ),
  },
  {
    id: "success",
    label: "Success",
    title: "Our Success",
    content: (
      <>
        <p>
          Success for us isn’t measured in trucks or tracking numbers — it’s
          measured in smiles, repeat customers, and stories of packages arriving
          just in time.
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Delivered over <strong>2 million parcels</strong> with a 98% on-time
            rate
          </li>
          <li>Built a logistics system that scales from local to nationwide</li>
          <li>
            Partnered with e-commerce platforms, small businesses, and corporate
            clients
          </li>
          <li>
            Maintained a customer satisfaction score above <strong>95%</strong>
          </li>
        </ul>
        <p>
          But beyond the metrics, our greatest achievement is trust. People rely
          on us during holidays, emergencies, and everyday moments — and we show
          up, every time.
        </p>
      </>
    ),
  },
  {
    id: "team",
    label: "Team & Others",
    title: "Meet the Team",
    content: (
      <>
        <p>
          Behind every successful delivery is a team of passionate individuals.
          Our crew includes:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>Logistics strategists who plan efficient routes and reduce delays</li>
          <li>Tech engineers who build our tracking systems and optimize performance</li>
          <li>Customer support heroes who solve problems with empathy and speed</li>
          <li>Warehouse and field staff who handle packages with care and precision</li>
        </ul>
        <p>
          We foster a culture of collaboration, innovation, and accountability.
          Everyone here — from interns to executives — shares one goal:{" "}
          <strong>make delivery better.</strong>
        </p>
        <h4 className="mt-4 text-lg font-medium">Beyond Logistics</h4>
        <ul className="list-inside list-disc space-y-1">
          <li><strong>Sustainability:</strong> eco-friendly packaging and fuel-efficient vehicles</li>
          <li><strong>Community outreach:</strong> supporting local causes and disaster relief</li>
          <li><strong>Employee growth:</strong> training, mentorship, and career development</li>
        </ul>
        <p>
          Because we believe great service starts with great people — and great
          people deserve a company that believes in them.
        </p>
      </>
    ),
  },
];

export default function About() {
  const [active, setActive] = useState("story");
  const tab = tabs.find((t) => t.id === active) || tabs[0];

  return (
    <div className="rounded-2xl bg-white p-3 my-5 shadow-[0_1px_3px_0_rgb(0_0_0/.06)] md:p-5">
      <div className="my-5">
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        <p className="mt-2 text-sm text-[#606060]">
          Enjoy fast, reliable parcel delivery with real-time tracking and
          zero hassle. From personal packages to business shipments — we
          deliver on time, every time.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              active === t.id
                ? "bg-[#056873] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="prose prose-sm mt-6 max-w-none space-y-4 text-gray-700">
        <h2 className="text-xl font-semibold text-gray-900">{tab.title}</h2>
        {tab.content}
      </div>
    </div>
  );
}
