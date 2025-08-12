import React, { useState, useEffect } from 'react';
import { Truck, Inbox, Plus } from "lucide-react";
import DriverRegistrationModal from './modal_driver_registration';
import VehicleRegistrationModal from './modal_vehicle_registration';
// --- MOCK DATA ---
// (Data remains the same as before)
const transporterData = {
  shipmentHistory: [
    { id: 'SH001', route: 'Kolkata, West Bengal → Ahmedabad, Gujarat', goods: 'Textile & Garments', status: 'completed', date: '8/1/2024', revenue: '₹3.5 lakhs' },
    { id: 'SH002', route: 'Jaipur, Rajasthan → Lucknow, Uttar Pradesh', goods: 'Agricultural Products', status: 'completed', date: '12/1/2024', revenue: '₹2.3 lakhs' },
    { id: 'SH003', route: 'Kochi, Kerala → Goa', goods: 'Spices & Food Products', status: 'completed', date: '5/1/2024', revenue: '₹1.8 lakhs' },
  ],
  vehicles: [
    { id: 'MH-02-AB-1234', model: 'Tata Prima Truck', capacity: '25000 kg', driver: 'Rajesh Kumar', maintenance: '1/1/2024', status: 'in-use' },
    { id: 'KA-03-CD-5678', model: 'Eicher Pro Truck', capacity: '15000 kg', driver: 'Unassigned', maintenance: '10/1/2024', status: 'available' },
    { id: 'DL-01-EF-9012', model: 'Ashok Leyland Truck', capacity: '20000 kg', driver: 'Suresh Patel', maintenance: '28/12/2023', status: 'available' },
  ],
  consignments: [
    { id: 'CON001', client: 'TechMart Electronics Pvt Ltd', route: 'Mumbai, Maharashtra → Delhi, Delhi', goods: 'Electronics & Appliances', weight: '1500 kg', value: '₹18.5 lakhs', pickup: '15/1/2024', delivery: '20/1/2024', status: 'Live' },
    { id: 'CON002', client: 'Lifestyle Furniture Pvt Ltd', route: 'Bengaluru, Karnataka → Chennai, Tamil Nadu', goods: 'Furniture & Home Decor', weight: '2800 kg', value: '₹12.5 lakhs', pickup: '18/1/2024', delivery: '22/1/2024', status: 'Live' },
    { id: 'CON003', client: 'MedCare Solutions India Ltd', route: 'Pune, Maharashtra → Hyderabad, Telangana', goods: 'Medical Equipment & Supplies', weight: '800 kg', value: '₹27.5 lakhs', pickup: '10/1/2024', delivery: '14/1/2024', status: 'Received' },
    { id: 'CON004', client: 'House of Hyacinth Ltd', route: 'New Delhi, Delhi → Kolkata, West Bengal', goods: 'Perfumes and Fragrances', weight: '600 kg', value: '₹2.5 lakhs', pickup: '02/9/2025', delivery: '04/9/2025', status: 'Received' }
  ],
};

const shipperData = {
  requests: [
    { id: 'SR001', date: '16/1/2024', route: 'Vadodara, Gujarat → Indore, Madhya Pradesh', goods: 'Chemical Products', weight: '2200 kg', cost: '₹2.9 lakhs', status: 'pending' },
    { id: 'SR002', date: '15/1/2024', route: 'Aurangabad, Maharashtra → Coimbatore, Tamil Nadu', goods: 'Automotive Parts', weight: '1800 kg', cost: '₹1.9 lakhs', status: 'approved' },
    { id: 'SR003', date: '14/1/2024', route: 'Gurugram, Haryana → Chandigarh, Punjab', goods: 'IT Equipment', weight: '1200 kg', cost: '₹1.3 lakhs', status: 'approved' },
  ],
  status: [
    { id: 'SH001', route: 'Mumbai, Maharashtra → Delhi, Delhi', location: 'Indore, Madhya Pradesh', progress: 65, delivery: '20/1/2024', status: 'in transit' },
    { id: 'SH004', route: 'Bengaluru, Karnataka → Chennai, Tamil Nadu', location: 'Bengaluru, Karnataka', progress: 10, delivery: '22/1/2024', status: 'pickup scheduled' },
    { id: 'SH005', route: 'Pune, Maharashtra → Hyderabad, Telangana', location: 'Hyderabad, Telangana', progress: 95, delivery: '14/1/2024', status: 'out for delivery' },
  ],
  billing: {
    summary: { pending: '₹3.5 lakhs', paid: '₹2.3 lakhs', openInvoices: 2 },
    invoices: [
      { id: 'INV001', shipment: 'SH001', amount: '₹3.5 lakhs', status: 'pending', issueDate: '15/1/2024', dueDate: '14/2/2024' },
      { id: 'INV002', shipment: 'SH002', amount: '₹2.3 lakhs', status: 'paid', issueDate: '10/1/2024', dueDate: '9/2/2024' },
      { id: 'INV003', shipment: 'SH003', amount: '₹1.8 lakhs', status: 'overdue', issueDate: '5/1/2024', dueDate: '4/2/2024' },
    ],
  },
};


// --- SVG ICONS ---
const BoxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TruckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2.707a1 1 0 01.707.293l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-.707.293H17M5 10h6" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const ClipboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;

// --- REUSABLE COMPONENTS ---

const Badge = ({ children, colorClass }) => (
  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
    {children}
  </span>
);

const statusColors = {
  'in-use': 'bg-red-100 text-red-800', 'available': 'bg-green-100 text-green-800',
  'in-transit': 'bg-blue-100 text-blue-800', 'pending': 'bg-yellow-100 text-yellow-800',
  'delivered': 'bg-green-100 text-green-800', 'completed': 'bg-green-100 text-green-800',
  'approved': 'bg-blue-100 text-blue-800', 'pickup scheduled': 'bg-purple-100 text-purple-800',
  'out for delivery': 'bg-indigo-100 text-indigo-800', 'paid': 'bg-green-100 text-green-800',
  'overdue': 'bg-pink-100 text-pink-800',
};

const ToggleSwitch = ({ userType, setUserType }) => {
  const isShipper = userType === 'shipper';
  return (
    <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-lg">
      {/* ToggleSwitch buttons */}
      <button
        onClick={() => setUserType('transporter')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition cursor-pointer ${!isShipper ? 'bg-white shadow' : 'text-gray-600'}`}
      >
        Transporter
      </button>
      <button
        onClick={() => setUserType('shipper')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition cursor-pointer ${isShipper ? 'bg-white shadow' : 'text-gray-600'}`}
      >
        Shipper
      </button>
    </div>
  );
};


// --- PAGE COMPONENTS (NOW RESPONSIVE) ---

const ShipmentHistory = ({ data }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Shipments</h2>
    <p className="text-gray-500 mb-6">View all your completed and ongoing shipments</p>
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Shipment ID', 'Route', 'Goods', 'Status', 'Date', 'Revenue'].map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.route}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.goods}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Badge colorClass={statusColors[item.status]}>{item.status}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{item.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const VehicleList = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.map(vehicle => (
      <div key={vehicle.id} className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-800">{vehicle.id}</h3>
          <Badge colorClass={statusColors[vehicle.status]}>{vehicle.status}</Badge>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-semibold text-gray-700">{vehicle.model}</span></p>
          <p>Capacity: <span className="font-semibold text-gray-700">{vehicle.capacity}</span></p>
          <p>Driver: <span className="font-semibold text-gray-700">{vehicle.driver}</span></p>
          <p>Last Maintenance: <span className="font-semibold text-gray-700">{vehicle.maintenance}</span></p>
        </div>
      </div>
    ))}
  </div>
);

const Consignments = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Live");
  const [quote, setQuote] = useState({});
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  // Separate state for displayed consignments
  const [consignments, setConsignments] = useState(data);
  const [timers, setTimers] = useState({});

  const filteredData = consignments.filter(
    (item) => item.status.toLowerCase() === activeTab.toLowerCase()
  );

  const liveCount = consignments.filter(
    (item) => item.status.toLowerCase() === "live"
  ).length;
  const receivedCount = consignments.filter(
    (item) => item.status.toLowerCase() === "received"
  ).length;

  const handleQuoteChange = (id, value) => {
    setQuote((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (id) => {
    console.log(`Quote for ${id}: ₹${quote[id] || ""}`);
    setQuote((prev) => ({ ...prev, [id]: "" }));
  };

  // Initialize timers ONCE for all "Received" consignments
  useEffect(() => {
    const initialTimers = {};
    data.forEach((item) => {
      if (item.status.toLowerCase() === "received") {
        initialTimers[item.id] = 59 * 60 + 59; // 59:59 in seconds
      }
    });
    setTimers(initialTimers);
  }, [data]);

  // Decrement timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          if (updated[id] > 0) updated[id] -= 1;
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Remove expired consignments automatically
  useEffect(() => {
    const expiredIds = Object.keys(timers).filter((id) => timers[id] <= 0);
    if (expiredIds.length > 0) {
      setConsignments((prev) => prev.filter((item) => !expiredIds.includes(item.id)));
    }
  }, [timers]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Consignments</h2>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        <button
          onClick={() => setActiveTab("Live")}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap border ${
            activeTab === "Live"
              ? "bg-green-500 text-white border-green-500"
              : "border-green-500 text-green-600 bg-white hover:bg-green-50"
          }`}
        >
          <Truck size={16} />
          Live
          <span className="ml-1 px-2 py-0.5 text-white text-xs bg-black bg-opacity-10 rounded-full">
            {liveCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("Received")}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "Received"
              ? "bg-[#3e92cc] text-white"
              : "border border-[#3e92cc] text-[#3e92cc] bg-white hover:bg-yellow-50"
          }`}
        >
          <Inbox size={16} />
          Received
          <span className="ml-1 px-2 py-0.5 text-xs text-white bg-black bg-opacity-10 rounded-full">
            {receivedCount}
          </span>
        </button>
      </div>

      {/* Consignment list */}
      <div className="flex flex-col gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow w-full relative">
              {/* Countdown timer */}
              {item.status.toLowerCase() === "received" && timers[item.id] !== undefined && (
                <span className="absolute top-4 right-6 text-sm font-semibold text-red-500">
                  {formatTime(timers[item.id])}
                </span>
              )}

              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-800">{item.id}</h3>
              </div>

              <div className="flex flex-wrap justify-between gap-6 text-sm items-center">
                <div>
                  <p className="font-semibold text-md text-gray-800">{item.client}</p>
                  <p className="text-gray-500 text-md">{item.route}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-md">
                    Goods: <span className="text-gray-700 font-medium">{item.goods}</span>
                  </p>
                  <p className="text-gray-500 text-md">
                    Weight: <span className="text-gray-700 font-medium">{item.weight}</span>
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-md">
                    Value: <span className="text-gray-700 font-medium">{item.value}</span>
                  </p>
                  <p className="text-gray-500 text-md">
                    Pickup: <span className="text-gray-700 font-medium">{item.pickup}</span>
                  </p>
                  <p className="text-gray-500 text-md">
                    Delivery: <span className="text-gray-700 font-medium">{item.delivery}</span>
                  </p>
                </div>

                {/* Show for Received tab */}
                {item.status.toLowerCase() === "received" && (
                  <div className="flex items-center gap-2 w-full justify-center mt-2">
                    <input
                      type="number"
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm w-3/5 no-arrows"
                      placeholder="Enter price in ₹"
                      value={quote[item.id] || ""}
                      onChange={(e) => handleQuoteChange(item.id, e.target.value)}
                    />
                    <button
                      onClick={() => handleSubmit(item.id)}
                      className="px-3 py-1 text-sm rounded-lg bg-green-200 text-green-800 hover:bg-green-300"
                    >
                      Submit
                    </button>
                  </div>
                )}

                {/* Show for Live tab */}
                {item.status.toLowerCase() === "live" && (
                  <div className="flex flex-col gap-2 items-start">
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg bg-[#3e92cc] text-white hover:bg-blue-300"
                      onClick={() => setIsDriverModalOpen(true)}
                    >
                      <Plus size={14} /> Assign Driver
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg bg-[#d8315b] text-white hover:bg-pink-400"
                      onClick={() => setIsVehicleModalOpen(true)}
                    >
                      <Plus size={14} /> Assign Vehicle
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No consignments found for {activeTab}.
          </p>
        )}
      </div>

      {/* Assign Driver Modal */}
      {isDriverModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 backdrop-blur-md"
            onClick={() => setIsDriverModalOpen(false)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6 z-10">
            <h2 className="text-xl font-bold mb-4">Assign Driver</h2>
            <DriverRegistrationModal />
          </div>
        </div>
      )}

      {/* Assign Vehicle Modal */}
      {isVehicleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 backdrop-blur-md"
            onClick={() => setIsVehicleModalOpen(false)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6 z-10">
            <h2 className="text-xl font-bold mb-4">Assign Vehicle</h2>
            <VehicleRegistrationModal />
          </div>
        </div>
      )}

      <style jsx>{`
        .no-arrows::-webkit-outer-spin-button,
        .no-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-arrows[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};





      const RequestShipment = ({data}) => (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Shipment Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(req => (
            <div key={req.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-800">{req.id}</h3>
                <Badge colorClass={statusColors[req.status]}>{req.status}</Badge>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-gray-500 text-xs">{req.date}</p>
                <p className="font-semibold text-gray-700">{req.route}</p>
                <p className="text-gray-500">Goods: <span className="text-gray-700">{req.goods}</span></p>
                <p className="text-gray-500">Weight: <span className="text-gray-700">{req.weight}</span></p>
                <p className="text-gray-500">Est. Cost: <span className="text-gray-700 font-semibold">{req.cost}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
      );

      const ShipmentStatus = ({data}) => (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Shipment Status</h2>
        <div className="space-y-6">
          {data.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
                <h3 className="text-lg font-bold text-gray-800">{item.id}</h3>
                <Badge colorClass={statusColors[item.status]}>{item.status}</Badge>
              </div>
              <p className="text-sm text-gray-500 mb-1">{item.route}</p>
              <p className="text-sm text-gray-500 mb-4">Current Location: <span className="text-gray-700 font-medium">{item.location}</span></p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.progress}%` }}></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="font-medium">{item.progress}%</p>
                <p className="text-gray-500">Est. Delivery: {item.delivery}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      );

      const Billing = ({data}) => (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Billing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-500 mb-2">Total Pending</p>
            <p className="text-3xl font-bold text-gray-800">{data.summary.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-500 mb-2">Total Paid</p>
            <p className="text-3xl font-bold text-gray-800">{data.summary.paid}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-500 mb-2">Open Invoices</p>
            <p className="text-3xl font-bold text-gray-800">{data.summary.openInvoices}</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent and manage your invoices</h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Invoice ID', 'Shipment', 'Amount', 'Status', 'Issue Date', 'Due Date'].map(header => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.invoices.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.shipment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge colorClass={statusColors[item.status]}>{item.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.issueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      );

      const PlaceholderPage = ({title}) => (
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-500 mt-2">{title.toLowerCase()} interface would go here.</p>
      </div>
      );

      // --- MAIN LAYOUT COMPONENTS (NOW RESPONSIVE) ---

      const transporterNav = [
      {name: 'Consignment', icon: <BoxIcon /> }, {name: 'Shipment History', icon: <ClockIcon /> },
      {name: 'Add Vehicle', icon: <TruckIcon /> }, 

      ];

      const shipperNav = [
      {name: 'Request Shipment', icon: <PlusIcon /> }, {name: 'Status', icon: <LocationIcon /> },
      {name: 'Billing', icon: <CreditCardIcon /> },
      ];

      const Sidebar = ({userType, activePage, setActivePage, sidebarOpen, setSidebarOpen}) => {
  const isTransporter = userType === 'transporter';
      const navItems = isTransporter ? transporterNav : shipperNav;
      const user = isTransporter ? {name: 'Rajesh Kumar', role: 'Transporter' } : {name: 'Priya Sharma', role: 'Shipper' };

  const handleNavClick = (page) => {
        setActivePage(page);
      setSidebarOpen(false); // Close sidebar on navigation
  };

      return (
      <>
        {/* Overlay for mobile */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar */}
        <div className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-gray-300 flex-shrink-0 flex flex-col z-40
                       transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 
                       ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-white">{user.name}</h2>
            <span className="text-sm text-gray-400">{user.role}</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {/* Sidebar navigation buttons */}
            {navItems.map(item => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition cursor-pointer ${activePage === item.name
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-slate-700'
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
          {/* Logout button at the bottom */}
          <div className="p-4 mt-auto">
            <button
              className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-[#0a2463] text-white font-semibold transition cursor-pointer hover:bg-[#3e92cc]"
              onClick={() => {
                // Add your logout logic here
                window.location.href = '/sign_in';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </>
      );
};

      const DashboardHeader = ({userType, setUserType, activePage, setSidebarOpen}) => {
  const isTransporter = userType === 'transporter';
      const title = isTransporter ? 'Transporter Dashboard' : 'Shipper Dashboard';

      const showAddVehicle = isTransporter && activePage === 'Add Vehicle';
      const showNewRequest = !isTransporter && activePage === 'Request Shipment';

      return (
      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600">
            <MenuIcon />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <ToggleSwitch userType={userType} setUserType={setUserType} />
          {/* DashboardHeader action buttons */}
          {showAddVehicle && (
            <button className="bg-[#0a2463] text-white px-4 py-2 rounded-lg font-semibold transition hidden sm:block cursor-pointer hover:bg-[#3e92cc]">
              Add Vehicle
            </button>
          )}
          {showNewRequest && (
            <button className="bg-[#0a2463] text-white px-4 py-2 rounded-lg font-semibold transition hidden sm:block cursor-pointer hover:bg-[#3e92cc]">
              New Request
            </button>
          )}
        </div>
      </div>
      );
};


      // --- DASHBOARD COMPONENT ---

      function Dashboard() {
  const [userType, setUserType] = useState('transporter');
      const [activePage, setActivePage] = useState('Shipment History');
      const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleUserTypeChange = (newUserType) => {
        setUserType(newUserType);
      if (newUserType === 'transporter') {
        setActivePage('Consignment');
    } else {
        setActivePage('Request Shipment');
    }
  };

  const renderContent = () => {
    if (userType === 'transporter') {
      switch (activePage) {
        case 'Shipment History': return <ShipmentHistory data={transporterData.shipmentHistory} />;
      case 'Add Vehicle': return <VehicleList data={transporterData.vehicles} />;
      case 'Consignment': return <Consignments data={transporterData.consignments} />;
      case 'Assign Vehicle': return <PlaceholderPage title="Vehicle Assignment" />;
      case 'Assign Driver': return <PlaceholderPage title="Driver Assignment" />;
      default: return <Consignments data={transporterData.consignments} />;
      }
    } else { // Shipper
      switch (activePage) {
        case 'Request Shipment': return <RequestShipment data={shipperData.requests} />;
      case 'Status': return <ShipmentStatus data={shipperData.status} />;
      case 'Billing': return <Billing data={shipperData.billing} />;
      default: return <RequestShipment data={shipperData.requests} />;
      }
    }
  };

      return (
      <div className="relative md:flex bg-gray-100 font-sans min-h-screen">
        <Sidebar
          userType={userType}
          activePage={activePage}
          setActivePage={setActivePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <DashboardHeader
            userType={userType}
            setUserType={handleUserTypeChange}
            activePage={activePage}
            setSidebarOpen={setSidebarOpen}
          />
          {renderContent()}
        </main>
      </div>
      );
}

      export default Dashboard;