import { useNavigate } from "react-router-dom";
import KeyFeatures from "./landingPageComponents/keyFeatures.jsx";
import News from "./landingPageComponents/news.jsx";
import CaseStudyShowcase from "./landingPageComponents/caseStudy.jsx";
import Testimonials from "./landingPageComponents/testimonials.jsx";
import ContactCTASection from "./landingPageComponents/contact.jsx";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen md:snap-y md:snap-mandatory overflow-y-scroll">
      <section className="relative h-screen snap-start">
        {/* Background Image */}
        <img
          src="images/truck.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay for darkening the background */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Foreground Content */}
        <div className="relative z-20 h-full flex items-center justify-center px-6 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight text-white mb-6">
                Transforming India’s Freight with Smart, Scalable Tech
              </h1>
              <p className="text-white text-lg mb-8">
                Built for fleet owners, shippers, and mid-sized logistics players
                across Tier-2 & Tier-3 cities
              </p>
              <div className="flex space-x-4">
              <Link to="/inquiry-form">
            <button className="cursor-pointer px-6 py-3 transition-all duration-300 transform bg-lxj-alert rounded-full text-white font-semibold  hover:bg-[#b92549]  ">
              Request Shipment
            </button>
          </Link>
                {/* <button
                  onClick={() => navigate("/signup-otp")}
                  className="px-6 py-3 transition-all duration-300 transform bg-lxj-accent text-white rounded-full font-semibold hover:bg-lxj-primary"
                >
                  Get started
                </button> */}
                <a
                  href="/about-us"
                  className="px-6 py-3 border-2 transition-all duration-300 transform border-white rounded-full text-white font-semibold hover:bg-white hover:text-lxj-accent"
                >
                  Explore Features →
                </a>
                
              </div>
            </div>

            {/* Right Image
            {/* <div className="relative">
              <img
                src="images/mobile-ui.png"
                alt="Mobile UI"
                className="w-full max-w-xs mx-auto drop-shadow-2xl rounded-xl"
              />
            </div> */}
          </div>
        </div>
      </section>

      <KeyFeatures />
      <Testimonials />
      <CaseStudyShowcase />
      <News />
      <ContactCTASection />
    </div>
  );
}
