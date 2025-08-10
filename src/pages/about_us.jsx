import GlobeIndia from "./landingPageComponents/globe";
import {
  ShieldCheck,
  Smile,
  Cpu,
  CheckCircle,
  AlertTriangle,
  Ban,
  EyeOff,
  Truck,
  Map,
  PackageCheck,
  Users,
  Headset,
  BadgeDollarSign,
  Radar,
  Gavel,
  LineChart,
  Wallet,
} from "lucide-react";

export default function AboutUs() {
  return (
    <section className="snap-start">
      {/* Banner */}
      <div className="relative h-[30vh] sm:h-[40vh]">
        <img
  src="images/truck-aboutus.jpeg"
  alt="About background"
  className="absolute inset-0 w-full h-full object-cover object-[50%_65%] z-0"
/>

        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="relative z-20 h-full flex items-start justify-start p-6 sm:p-8">
          <h1 className="text-white mt-10 text-3xl sm:text-4xl md:text-6xl font-bold drop-shadow-lg">
            About Us
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white px-4 sm:px-6 pt-8 pb-20 space-y-16">

        {/* Who We Are + Globe */}
        <div className="max-w-7xl mx-auto  flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-16 items-center">
<article className="bg-white p-6 sm:p-8 rounded-2xl border-0 shadow-none md:border md:shadow-xl md:border-zinc-200">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 sm:mb-6">
              Who <span className="text-gray-900">We Are</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-800 mb-6 leading-relaxed">
              At <span className="font-semibold text-lxj-accent">LogiX<span className="text-lxj-alert">Junction</span></span>, we serve as a technology-first intermediary, offering a digital platform that connects businesses and individuals with the right logistics service providers.
              <br /><br />
              We do not provide logistics services directly—instead, we enable users to access and manage logistics more efficiently through <span className="text-lxj-accent font-medium">smart tools</span>, <span className="text-lxj-accent font-medium">real-time data</span>, and streamlined workflows.
            </p>
            <div className="space-y-4 mt-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-lxj-primary mb-1">Our Mission</h3>
                <p className="text-base text-gray-800">
                  Empowering India’s logistics future through technology, transparency, and regional reach.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-lxj-primary mb-1">Our Vision</h3>
                <p className="text-base text-gray-800">
                  Digital freight tools for every fleet, from Jaipur to Jabalpur.
                </p>
              </div>
            </div>
          </article>
          <div className="relative mx-auto w-full max-w-[250px] sm:max-w-[400px] md:max-w-[700px] lg:max-w-[500px]">
            <GlobeIndia />
          </div>
        </div>

        {/* Vision & Values */}
<div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border-0 shadow-none md:border md:shadow-xl md:border-zinc-200">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-lxj-primary mb-4">
            Our Vision
          </h2>
          <p className="text-base sm:text-lg text-lxj-alert mb-8">
            To make logistics accessible, reliable, and sustainable for everyone.
          </p>

          <h3 className="text-xl sm:text-2xl font-semibold text-lxj-primary mb-6">Our Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Transparency",
                desc: "Clear pricing, honest communication, and open processes in everything we do.",
              },
              {
                icon: Smile,
                title: "Customer Satisfaction",
                desc: "Putting our customers first with dedicated support and tailored solutions.",
              },
              {
                icon: Cpu,
                title: "Technology",
                desc: "Leveraging cutting-edge technology to revolutionize logistics management.",
              },
              {
                icon: CheckCircle,
                title: "Reliability",
                desc: "Consistent, dependable service you can trust for your logistics needs.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-md border border-zinc-200 md:border-0">
                <Icon className="w-12 h-12 mx-auto text-lxj-primary mb-4" />
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{title}</h4>
                <p className="text-sm sm:text-base text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Problem Section */}
       <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border-0 shadow-none md:border md:shadow-xl md:border-zinc-200">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-lxj-primary mb-4">The Problem</h2>
          <ul className="text-base sm:text-lg text-gray-800 space-y-4">
            {[{
              Icon: AlertTriangle,
              text: "Fragmented logistics make shipment management complex and time-consuming. Most providers focus on FTL, leaving a major gap in the PTL market.",
            }, {
              Icon: Ban,
              text: "Lack of transparent pricing and difficulty in comparing different logistics providers.",
            }, {
              Icon: EyeOff,
              text: "Inability to track shipments in real-time, leading to poor customer satisfaction.",
            }].map(({ Icon, text }, i) => (
              <li key={i} className="flex items-start gap-4">
                <Icon className="text-orange-600 w-6 h-6 mt-1" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution Section */}
          <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border-0 shadow-none md:border md:shadow-xl md:border-zinc-200">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-lxj-primary mb-4">Our Solution</h2>
          <ul className="text-base sm:text-lg text-gray-800 space-y-4">
            {[{
              Icon: Truck,
              text: "A streamlined platform for easy shipment booking and management...",
            }, {
              Icon: Radar,
              text: "Live shipment tracking and updates through our tech-enabled dashboard.",
            }, {
              Icon: BadgeDollarSign,
              text: "Integrated rate comparison engine showing quotes from multiple providers.",
            }, {
              Icon: Map,
              text: "Support for road, rail, air, and multimodal transport.",
            }].map(({ Icon, text }, i) => (
              <li key={i} className="flex items-start gap-4">
                <Icon className="text-green-700 w-6 h-6 mt-1" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Service Section */}
          <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border-0 shadow-none md:border md:shadow-xl md:border-zinc-200">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-lxj-primary mb-4">Our Service</h2>
          <ul className="text-base sm:text-lg text-gray-800 space-y-4">
            {[{
              Icon: Gavel,
              title: "Legal Service",
              text: "We connect users with legal experts on logistics compliance.",
            }, {
              Icon: LineChart,
              title: "Consulting Service",
              text: "Our experts help optimize your logistics strategy.",
            }, {
              Icon: Wallet,
              title: "Financial Service",
              text: "Flexible payment tools to support your budget.",
            }].map(({ Icon, title, text }, i) => (
              <li key={i} className="flex items-start gap-4">
                <Icon className="text-blue-700 w-6 h-6 mt-1" />
                <span><strong>{title}</strong> – {text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why Choose Us */}
          <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border-0 shadow-none md:border md:shadow-xl md:border-zinc-200">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-lxj-primary mb-6">
            Why Choose LogiXJunction?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: PackageCheck, title: "Reliable Logistics", desc: "Reliable solutions tailored for any business." },
              { icon: Users, title: "Industry Expertise", desc: "In-depth logistics knowledge." },
              { icon: Headset, title: "Dedicated Support", desc: "24/7 customer care." },
              { icon: ShieldCheck, title: "Robust Security", desc: "Secured data and freight." },
              { icon: Radar, title: "Smart Tracking", desc: "Live updates and smart rates." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="flex gap-4 items-start bg-white rounded-2xl p-4 shadow-md border border-zinc-200 md:border-0">
                <Icon className="text-purple-600 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
                  <p className="text-sm text-gray-700">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
