import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactCTASection() {
  return (
    <section className="snap-start min-h-screen bg-lxj-softWhite py-28 px-6 md:px-16 font-inter flex items-center">
      <div className="w-full max-w-7xl mx-auto text-center space-y-16">
        {/* Header */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-lxj-primary leading-tight">
            Ready to Simplify Your Logistics?
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Talk to our onboarding expert or get started in just a few minutes.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-gray-700 text-lg font-medium">
          <div className="flex items-center gap-3">
            <Mail className="w-7 h-7 text-lxj-accent" />
            <a
              href="mailto:support@logixjunction.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-lxj-primary"
            >
              support@logixjunction.in
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-7 h-7 text-lxj-accent" />
            <a href="tel:+9198XXXXXX78" className="hover:underline text-lxj-primary">
              +91 98XXXXXX78
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-lxj-accent" />
            <span className="text-gray-800">Serving across India’s industrial belt</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a
            href="/get-started"
            className="px-8 py-4 text-lg font-semibold rounded-xl bg-lxj-accent text-white hover:bg-lxj-primary transition shadow-md"
          >
            Get Started Now
          </a>
          <a
            href="/schedule-demo"
            className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-lxj-alert text-lxj-alert hover:bg-lxj-alert hover:text-white transition shadow-sm"
          >
            Schedule a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
