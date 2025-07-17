export default function Testimonials() {
  return (
    <section className="relative min-h-screen snap-start bg-lxj-softWhite text-gray-900 px-6 py-40 space-y-24">
      {/* Section Container */}
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-zinc-200">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-2xl">⭐</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Ravi Verma</h3>
                <p className="text-sm text-gray-500">Transporter (Lucknow)</p>
              </div>
            </div>
            <p className="text-lg text-gray-700">
              “With LogiXjunction, I receive more consistent loads and faster payments. No more endless calls!”
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-zinc-200">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-2xl">⭐</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Ankita Sharma</h3>
                <p className="text-sm text-gray-500">Shipper (Indore)</p>
              </div>
            </div>
            <p className="text-lg text-gray-700">
              “Their tracking system and route planning saved us 15% in logistics costs in 3 months!”
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md text-center border border-zinc-200">
            <h2 className="text-3xl font-extrabold text-lxj-alert mb-2 ">500+</h2>
            <p className="font-semibold text-lxj-accent">Trusted by Fleet Owners</p>
            <p className="text-sm text-gray-500 mt-2">Reliable partnerships across India’s logistics ecosystem.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md text-center border border-zinc-200">
            <h2 className="text-3xl font-extrabold text-lxj-alert mb-2">15 States</h2>
            <p className="font-semibold text-lxj-accent">Shipper Coverage</p>
            <p className="text-sm text-gray-500 mt-2">Pan-India presence with smart regional matching.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md text-center  border border-zinc-200">
            <h2 className="text-3xl text-lxj-alert font-extrabold mb-2">4.8<span className="text-yellow-400">★</span></h2>
            <p className="font-semibold text-lxj-accent">Platform Rating</p>
            <p className="text-sm text-gray-500 mt-2">Based on verified user feedback from transporters & shippers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
