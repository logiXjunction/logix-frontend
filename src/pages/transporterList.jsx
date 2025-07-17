import React, { useState } from 'react';
import { Truck, Boxes } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import TransporterCard from '../components/cards/TransporterCard';


const AvailableTransporters = () => {
   
  const [activeTab, setActiveTab] = useState('dedicated');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const location = useLocation();
   const transporters = location.state?.transporters || [];

  if(!location.state || !Array.isArray(transporters) || transporters.length === 0 ){
    return (
      <div className="p-10 text-center text-red-600 text-lg font-semibold min-h-screen bg-gradient-to-br from-zinc-50 via-sky-100 to-white">
        ❌ No shipment data found. Please register a shipment first.
      </div>
    );
  }
  
 

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

  return (
    <div className="p-6 bg-gradient-to-br from-zinc-50 via-sky-100 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0a2463] mb-6">Available Transporters</h1>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center bg-white/80 rounded-xl px-4 py-3 shadow mb-6">
          <div className="flex gap-4 mb-3 sm:mb-0">
            <button
              onClick={() => setActiveTab('dedicated')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${activeTab === 'dedicated' ? 'bg-[#d8315b] text-white' : 'bg-zinc-100 text-gray-600 hover:bg-zinc-200'}`}
            >
              <Truck size={16} /> Dedicated
            </button>
            <button
              onClick={() => setActiveTab('container')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${activeTab === 'container' ? 'bg-[#0a2463] text-white' : 'bg-zinc-100 text-gray-600 hover:bg-zinc-200'}`}
            >
              <Boxes size={16} /> Containerization
            </button>
          </div>

          {/* Search and Filter */}
          {activeTab === 'dedicated' && (
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search by name or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-full px-4 py-1.5 text-sm border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#d8315b]"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-full px-4 py-1.5 text-sm border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#0a2463] bg-white"
              >
                <option value="">All</option>
                <option value="rating">Top Rated</option>
                <option value="cost">Lowest Cost</option>
              </select>
            </div>
          )}
        </div>

        {/* Transporters Grid */}
        {activeTab === 'dedicated' ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTransporters.length === 0 ?(
              <div className="text-center text-gray-500 mt-24 text-xl font-medium">
                No transporters found matching your criteria.
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-24 text-xl font-medium">
                {filteredTransporters.map((t) => (
              <TransporterCard key={t.id} transporter={t}/>
            ))}
              </div>
            ) }           
            
            
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-24 text-xl font-medium">
            🚧 Containerization module is coming soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableTransporters;
