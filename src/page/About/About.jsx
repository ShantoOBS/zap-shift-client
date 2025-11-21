import React from 'react'

export default function About() {
  return (
    <div className=" py-5 md:py-10 bg-white rounded-2xl p-10 md:p-15 mb-10 md:20">
      {/* Header */}
      <div className=" mb-8">
        <h2 className="text-3xl font-bold">About Us</h2>
        <p className="mt-2 text-text-[#606060] text-xs">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <span className='hidden md:inline'> <br /></span> packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed">
        {/* Story Tab */}
        <input type="radio" name="about_tabs" className="tab" aria-label="Story" defaultChecked />
        <div className="tab-content bg-base-100 border border-base-300 p-6 space-y-4 text-[#606060]">
          <h3 className="text-xl font-semibold">Our Story</h3>
          <p>
            We started with a simple but powerful idea: parcel delivery shouldn’t be stressful. In a world where time is precious and expectations are high,
            we saw an opportunity to build something better — a service that values speed, transparency, and care.
          </p>
          <p>
            What began as a small operation with a handful of deliveries has grown into a trusted logistics network serving thousands across the country.
            From the very beginning, we focused on solving real problems: missed deadlines, lost packages, and poor communication.
          </p>
          <p>
            Our solution? Real-time tracking, optimized delivery routes, and a support team that actually listens.
            Every package we deliver carries the weight of someone’s trust — and we never take that lightly.
          </p>
        </div>

        {/* Mission Tab */}
        <input type="radio" name="about_tabs" className="tab" aria-label="Mission" />
        <div className="tab-content bg-base-100 border border-base-300 p-6 space-y-4 text-[#606060]">
          <h3 className="text-xl font-semibold">Our Mission</h3>
          <p>
            Our mission is to redefine what delivery means in the modern age. We believe logistics should be invisible — smooth, fast, and worry-free.
            Whether it’s a birthday gift from a loved one or a critical business shipment, our goal is the same: deliver it safely, quickly, and with full transparency.
          </p>
          <p>
            We’re not just moving parcels — we’re connecting people, powering businesses, and building trust.
            Through smart technology, responsive service, and a relentless focus on reliability, we aim to make delivery feel effortless.
          </p>
          <p>
            Every decision we make is guided by one principle: <strong>put the customer first, always.</strong>
          </p>
        </div>

        {/* Success Tab */}
        <input type="radio" name="about_tabs" className="tab" aria-label="Success" />
        <div className="tab-content bg-base-100 border border-base-300 p-6 space-y-4 text-[#606060]">
          <h3 className="text-xl font-semibold">Our Success</h3>
          <p>
            Success for us isn’t measured in trucks or tracking numbers — it’s measured in smiles, repeat customers, and stories of packages arriving just in time.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Delivered over <strong>2 million parcels</strong> with a 98% on-time rate</li>
            <li>Built a logistics system that scales from local to nationwide</li>
            <li>Partnered with e-commerce platforms, small businesses, and corporate clients</li>
            <li>Maintained a customer satisfaction score above <strong>95%</strong></li>
          </ul>
          <p>
            But beyond the metrics, our greatest achievement is trust. People rely on us during holidays, emergencies, and everyday moments — and we show up, every time.
          </p>
        </div>

        {/* Team & Others Tab */}
        <input type="radio" name="about_tabs" className="tab" aria-label="Team & Others" />
        <div className="tab-content bg-base-100 border border-base-300 p-6 space-y-4 text-[#606060]">
          <h3 className="text-xl font-semibold">Meet the Team</h3>
          <p>Behind every successful delivery is a team of passionate individuals. Our crew includes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Logistics strategists who plan efficient routes and reduce delays</li>
            <li>Tech engineers who build our tracking systems and optimize performance</li>
            <li>Customer support heroes who solve problems with empathy and speed</li>
            <li>Warehouse and field staff who handle packages with care and precision</li>
          </ul>
          <p>
            We foster a culture of collaboration, innovation, and accountability. Everyone here — from interns to executives — shares one goal: <strong>make delivery better.</strong>
          </p>
          <h4 className="text-lg font-medium mt-4">Beyond Logistics</h4>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Sustainability:</strong> eco-friendly packaging and fuel-efficient vehicles</li>
            <li><strong>Community outreach:</strong> supporting local causes and disaster relief</li>
            <li><strong>Employee growth:</strong> training, mentorship, and career development</li>
          </ul>
          <p>
            Because we believe great service starts with great people — and great people deserve a company that believes in them.
          </p>
        </div>
      </div>
    </div>
  )
}