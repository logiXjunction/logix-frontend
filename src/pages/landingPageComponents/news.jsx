export default function News() {
  return (
    <section className="font-inter relative min-h-screen snap-start bg-lxj-softWhite px-6 py-28 md:py-40  text-gray-900">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold mb-4 text-lxj-primary">Top Reads</h2>
          <p className="text-lxj-alert text-lg">
            Explore the latest insights and trends shaping logistics and freight.
          </p>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 gap-6">
          {/* Article 1 */}
          <div className="bg-white p-6 border border-zinc-200 rounded-2xl shadow-md flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p className="text-lg text-lxj-primary font-semibold">
                  “<span className="hover:underline">How Tier-2 Logistics is the Next Big Opportunity in India</span>”
                </p>
                <p className="text-sm text-gray-500 mt-1">— Times of India</p>
              </div>
              <a
                href="https://timesofindia.indiatimes.com" // replace with actual URL
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 inline-block px-4 py-2 text-sm font-semibold rounded-lg bg-lxj-accent text-white hover:bg-lxj-primary transition"
              >
                Read More
              </a>
            </div>
          </div>

          {/* Article 2 */}
          <div className="bg-white p-6 border border-zinc-200 rounded-2xl shadow-md flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p className="text-lg text-lxj-primary font-semibold">
                  “<span className="hover:underline">Telematics and Driver Safety: What You Must Know</span>”
                </p>
                <p className="text-sm text-gray-500 mt-1">— The Hindu</p>
              </div>
              <a
                href="https://www.thehindu.com" // replace with actual URL
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 inline-block px-4 py-2 text-sm font-semibold rounded-lg bg-lxj-accent text-white hover:bg-lxj-primary transition"
              >
                Read More
              </a>
            </div>
          </div>

          {/* Article 3 */}
          <div className="bg-white p-6 border border-zinc-200 rounded-2xl shadow-md flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p className="text-lg text-lxj-primary font-semibold">
                  “<span className="hover:underline">Digital Freight Platforms vs Traditional Brokers</span>”
                </p>
                <p className="text-sm text-gray-500 mt-1">— Hindustan Times</p>
              </div>
              <a
                href="https://www.hindustantimes.com" // replace with actual URL
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 inline-block px-4 py-2 text-sm font-semibold rounded-lg bg-lxj-accent text-white hover:bg-lxj-primary transition"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
