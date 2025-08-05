import React, { useEffect, useState } from 'react';
import { Truck, Boxes } from 'lucide-react';
// import { useLocation } from 'react-router-dom';
import TransporterCard from '../components/cards/transporter_card';


const AvailableTransporters = () => {
  const [activeTab, setActiveTab] = useState('dedicated');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [transporters, setTransporters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dummy transporter data for demo
  const dummyTransporters = [
    {
      id: 1,
      companyName: "Swift Logistics Ltd",
      transporterName: "Rajesh Kumar",
      description: "Reliable freight services across North India with 10+ years experience in heavy cargo transportation.",
      rating: 4.8,
      deliveryETA: "2-3 days",
      costEstimate: "₹4,500",
      image: "https://i.pravatar.cc/150?img=1",
      pdfLink: "#quote1"
    },
    {
      id: 2,
      companyName: "Metro Transport Co",
      transporterName: "Priya Sharma",
      description: "Express delivery solutions with real-time tracking and insurance coverage for all shipments.",
      rating: 4.6,
      deliveryETA: "1-2 days",
      costEstimate: "₹6,200",
      image: "https://i.pravatar.cc/150?img=2",
      pdfLink: "#quote2"
    },
    {
      id: 3,
      companyName: "Cargo Masters",
      transporterName: "Amit Singh",
      description: "Specialized in fragile goods transport with custom packaging and temperature-controlled vehicles.",
      rating: 4.9,
      deliveryETA: "3-4 days",
      costEstimate: "₹3,800",
      image: "https://i.pravatar.cc/150?img=3",
      pdfLink: "#quote3"
    },
    {
      id: 4,
      companyName: "Highway Express",
      transporterName: "Sunita Patel",
      description: "24/7 customer support with door-to-door pickup and delivery services across major cities.",
      rating: 4.5,
      deliveryETA: "2-3 days",
      costEstimate: "₹5,100",
      image: "https://i.pravatar.cc/150?img=4",
      pdfLink: "#quote4"
    },
    {
      id: 5,
      companyName: "Blue Dart Cargo",
      transporterName: "Vikram Joshi",
      description: "Premium logistics partner with GPS tracking, secure handling, and on-time delivery guarantee.",
      rating: 4.7,
      deliveryETA: "1-2 days",
      costEstimate: "₹7,500",
      image: "https://i.pravatar.cc/150?img=5",
      pdfLink: "#quote5"
    }
  ];

  useEffect(() => {
    // Initialize with dummy data
    setTransporters(dummyTransporters);
  }, []);

  // Function to fetch transporters from backend (example implementation)
  const fetchTransportersFromAPI = async (shipmentId) => {
    try {
      setLoading(true);
      setError('');
      
      // Example API call using axios
      // const response = await axios.get(`/api/transporters/available/${shipmentId}`);
      // setTransporters(response.data.transporters);
      
      // For demo, we'll simulate API call
      setTimeout(() => {
        setTransporters(dummyTransporters);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Failed to fetch transporters. Please try again.');
      setLoading(false);
    }
  };

  const filteredTransporters = transporters.filter((t) => {
    const matchesSearch =
      t.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.transporterName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'rating'
        ? t.rating >= 4.5
        : filter === 'cost'
        ? parseFloat(t.costEstimate.replace(/[^0-9.-]+/g, '')) < 5000
        : true;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="mt-15 p-6 sm:p-10 text-center text-blue-600 text-lg font-semibold min-h-screen bg-gradient-to-br from-zinc-50 via-sky-100 to-white">
        🔄 Loading available transporters...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-15 p-6 sm:p-10 text-center text-red-600 text-lg font-semibold min-h-screen bg-gradient-to-br from-zinc-50 via-sky-100 to-white">
        ❌ {error}
      </div>
    );
  }

  return (
    <div className="mt-15 p-4 sm:p-6 bg-gradient-to-br from-zinc-50 via-sky-100 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a2463] mb-4 sm:mb-6 text-center sm:text-left">
          Available Transporters
        </h1>

        {/* Tabs and Controls */}
        <div className="flex flex-col bg-white/80 rounded-xl p-3 sm:p-4 shadow mb-4 sm:mb-6">
          {/* Tabs */}
          <div className="flex justify-center sm:justify-start gap-2 sm:gap-4 mb-3 sm:mb-4">
            <button
              onClick={() => setActiveTab('dedicated')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm ${
                activeTab === 'dedicated' 
                  ? 'bg-[#d8315b] text-white' 
                  : 'bg-zinc-100 text-gray-600 hover:bg-zinc-200'
              }`}
            >
              <Truck size={14} className="sm:w-4 sm:h-4" /> Dedicated
            </button>
            <button
              onClick={() => setActiveTab('container')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm ${
                activeTab === 'container' 
                  ? 'bg-[#0a2463] text-white' 
                  : 'bg-zinc-100 text-gray-600 hover:bg-zinc-200'
              }`}
            >
              <Boxes size={14} className="sm:w-4 sm:h-4" /> Containerization
            </button>
          </div>

          {/* Search and Filter - Mobile Responsive */}
          {activeTab === 'dedicated' && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center">
              <input
                type="text"
                placeholder="Search by name or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#d8315b]"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#0a2463] bg-white"
              >
                <option value="">All Transporters</option>
                <option value="rating">Top Rated (4.5+)</option>
                <option value="cost">Budget Friendly (&lt;₹5000)</option>
              </select>
            </div>
          )}
        </div>

        {/* Transporters Grid */}
        {activeTab === 'dedicated' ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTransporters.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 mt-12 sm:mt-24 text-lg sm:text-xl font-medium">
                No transporters found matching your criteria.
              </div>
            ) : (
              filteredTransporters.map((transporter) => (
                <TransporterCard key={transporter.id} transporter={transporter} />
              ))
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-12 sm:mt-24 text-lg sm:text-xl font-medium">
            🚧 Containerization module is coming soon.
          </div>
        )}
        
        {/* Demo Button to Simulate API Call */}
        <div className="text-center mt-8">
          <button
            onClick={() => fetchTransportersFromAPI('demo-shipment-id')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Refresh Transporters (Demo API Call)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableTransporters;
