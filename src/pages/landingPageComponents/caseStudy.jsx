import {
  AlertTriangle,
  Lightbulb,
  Rocket,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function CaseStudyShowcase() {
  return (
    <section className="snap-start relative min-h-screen bg-lxj-softWhite py-10 px-4 sm:px-6 md:px-12 font-inter">
      <div className="max-w-6xl mt-6 md:mt-10 mx-auto overflow-hidden">
        <div className="grid md:grid-cols-1 gap-0">
          {/* Case Study Story */}
          <div className="px-2 sm:px-4 md:px-8 flex flex-col justify-between">
            <div className="space-y-6 sm:space-y-8 text-gray-800 text-base leading-relaxed">
              {/* Title */}
              <div>
                <h1 className="text-4xl text-center md:text-left md:text-5xl font-bold text-lxj-primary drop-shadow-sm">
                  Case Study
                </h1>
                <h2 className="text-xl text-center md:text-left sm:text-2xl md:text-3xl font-bold text-lxj-alert drop-shadow-sm mt-1 sm:mt-2">
                  Optimizing Freight in Madhya Pradesh
                </h2>
              </div>

              {/* Challenge */}
              <div className="space-y-3 border-none shadow-none md:bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:shadow-xl md:border md:border-zinc-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-lxj-alert" />
                  <h3 className="text-xl sm:text-2xl font-bold text-lxj-alert">Challenge</h3>
                </div>
                <p>
                  A regional FMCG distributor was losing valuable time—and customer trust—because loads were matched
                  haphazardly and truck routes changed at the last minute. These inefficiencies created frequent delays
                  that rippled through their supply chain and inflated operating costs.
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-3 border-none shadow-none md:bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:shadow-xl md:border md:border-zinc-200">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-lxj-accent" />
                  <h3 className="text-xl sm:text-2xl font-bold text-lxj-accent">Our Solution</h3>
                </div>
                <p>
                  We built a dynamic route‑optimisation engine that evaluated live traffic, load weight, and vehicle
                  availability, then paired it with a smart bidding module. Carriers could submit bids in real time,
                  ensuring each shipment found the most efficient and cost‑effective path before wheels ever hit the
                  road.
                </p>
              </div>

              {/* Result */}
              <div className="space-y-4 sm:space-y-6 border-none shadow-none md:bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:shadow-xl md:border md:border-zinc-200">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <Rocket className="w-6 h-6 text-lxj-accent" />
                  <h3 className="text-xl sm:text-2xl font-bold text-lxj-accent">The Result</h3>
                </div>

                {/* Result Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  {/* Result 1 */}
                  <div className="bg-lxj-accent border-none shadow-none md:border md:shadow-sm md:hover:shadow-md border-zinc-200 rounded-2xl p-4 sm:p-6 transition duration-200">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="text-2xl font-bold text-white">+23%</p>
                        <p className="text-sm text-gray-100 mt-1">Increase in On-Time Delivery</p>
                      </div>
                    </div>
                  </div>

                  {/* Result 2 */}
                  <div className="bg-lxj-accent border-none shadow-none md:border md:shadow-sm md:hover:shadow-md border-zinc-200 rounded-2xl p-4 sm:p-6 transition duration-200">
                    <div className="flex items-center gap-3">
                      <TrendingDown className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="text-2xl font-bold text-white">-18%</p>
                        <p className="text-sm text-gray-100 mt-1">Reduction in Logistics Costs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call‑to‑action Button */}
            <div className="mt-8 sm:mt-10 mx-auto">
              <a
                href="/case-studies"
                className="inline-block px-5 py-3 text-base sm:text-lg font-semibold rounded-xl bg-lxj-accent text-white hover:bg-lxj-primary transition duration-200"
              >
                View More Case Studies
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
