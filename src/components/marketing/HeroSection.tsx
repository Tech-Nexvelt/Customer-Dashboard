export default function HeroSection() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            We Apply to <br />
            Jobs <br />
            <span className="text-emerald-500 italic font-semibold">
              On Your Behalf.
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
            DevSphere is your personal job application team. We handle resumes,
            optimization, and applications — so you can focus on cracking interviews.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
              Start for free →
            </button>

            <button className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-xl font-medium text-gray-700 transition">
              See our process
            </button>
          </div>

          {/* TRUST */}
          <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
            <span>⭐ 4.9/5 TrustScore</span>
            <span>✔ ATS-Optimized Resumes</span>
          </div>
        </div>

        {/* RIGHT DASHBOARD */}
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Application Tracker
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Total Applied</p>
                <h2 className="text-2xl font-bold text-gray-900">47</h2>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Interviews</p>
                <h2 className="text-2xl font-bold text-gray-900">08</h2>
              </div>
            </div>

            {/* GRAPH */}
            <div className="h-32 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-xl flex items-end justify-around p-2">
              <div className="w-2 bg-emerald-400 h-10 rounded"></div>
              <div className="w-2 bg-emerald-500 h-16 rounded"></div>
              <div className="w-2 bg-emerald-600 h-24 rounded"></div>
              <div className="w-2 bg-emerald-400 h-12 rounded"></div>
            </div>
          </div>

          {/* FLOAT CARD */}
          <div className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-xl px-4 py-3 border text-sm">
            ⭐ New Offer Received
          </div>
        </div>

      </div>
    </section>
  );
}