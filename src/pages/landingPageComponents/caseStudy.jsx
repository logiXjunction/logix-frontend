import { AlertTriangle, Lightbulb, Rocket, TrendingDown, TrendingUp } from "lucide-react";

export default function CaseStudyShowcase() {
  return (
    <section className="snap-start relative min-h-screen bg-lxj-softWhite py-10 px-6 md:px-12 font-inter">
      <div className="max-w-6xl mt-10 mx-auto overflow-hidden">
        <div className="grid md:grid-cols-1 gap-0">
          

          {/* Case Study Story */}
          <div className="px-8 flex flex-col justify-between">
            <div className="space-y-8 text-gray-800 text-lg leading-relaxed">
           <div>
           <h1 className="text-4xl md:text-5xl font-bold text-lxj-primary drop-shadow-sm">
             Case Study
             </h1> 
              <h2 className="text-2xl md:text-3xl font-bold text-lxj-alert drop-shadow-sm">
                Optimizing Freight in Madhya Pradesh
              </h2>
           </div>

              {/* Challenge */}
              <div className="space-y-3 bg-white rounded-3xl p-6 shadow-xl border border-zinc-200 ">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-lxj-alert" />
                  <h3 className="text-2xl font-bold text-lxj-alert">Challenge</h3>
                </div>
                <p className="text-base">
                  A regional FMCG distributor was losing valuable time—and customer trust—because loads were matched
                  haphazardly and truck routes changed at the last minute. These inefficiencies created frequent delays
                  that rippled through their supply chain and inflated operating costs.
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-3 bg-white  rounded-3xl p-6 shadow-xl border border-zinc-200">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-lxj-accent" />
                  <h3 className="text-2xl font-bold text-lxj-accent">Our Solution</h3>
                </div>
                <p className="text-base">
                  We built a dynamic route‑optimisation engine that evaluated live traffic, load weight, and vehicle
                  availability, then paired it with a smart bidding module. Carriers could submit bids in real time,
                  ensuring each shipment found the most efficient and cost‑effective path before wheels ever hit the
                  road.
                </p>
              </div>

              {/* Result */}
              <div className="space-y-6 bg-white  rounded-3xl p-6 shadow-xl border border-zinc-200">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <Rocket className="w-6 h-6 text-lxj-accent" />
                  <h3 className="text-2xl font-bold text-lxj-accent">The Result</h3>
                </div>

                {/* Result Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Result 1 */}
                  <div className="bg-lxj-accent border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200">
                    <div className="flex items-center gap-4">
                      <TrendingUp className="w-10 h-10 text-green-400" />
                      <div>
                        <p className="text-3xl font-bold text-white">+23%</p>
                        <p className="text-sm text-gray-100 mt-1">Increase in On-Time Delivery</p>
                      </div>
                    </div>
                  </div>

                  {/* Result 2 */}
                  <div className="bg-lxj-accent border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200">
                    <div className="flex items-center gap-4">
                      <TrendingDown className="w-10 h-10 text-green-400" />
                      <div>
                        <p className="text-3xl font-bold text-white">-18%</p>
                        <p className="text-sm text-gray-100 mt-1">Reduction in Logistics Costs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call‑to‑action Button */}
            <div className="mt-10 mx-auto">
              <a
                href="/case-studies"
                className="inline-block px-6 py-3 text-lg font-semibold rounded-xl bg-lxj-accent text-white hover:bg-lxj-primary transition duration-200"
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
