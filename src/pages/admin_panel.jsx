import { useState } from "react";
import { Package, Truck, CheckCircle, Edit3, Filter } from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("Shipment Requests");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Dummy data
  const data = {
    "Shipment Requests": [
      { id: "SR001", route: "Vadodara → Indore", goods: "Chemical Products", weight: "2200 kg", cost: "₹2.9 lakhs", date: "16/1/2024", status: "pending" },
      { id: "SR002", route: "Aurangabad → Coimbatore", goods: "Automotive Parts", weight: "1800 kg", cost: "₹1.9 lakhs", date: "15/1/2024", status: "approved" },
    ],
    "Offered Shipments": [
      { id: "SH001", route: "Mumbai → Delhi", goods: "Electronics", date: "15/1/2024", status: "offered" },
      { id: "SH004", route: "Bengaluru → Chennai", goods: "Furniture", date: "18/1/2024", status: "offered" },
      { id: "SH005", route: "Kolkata → Chennai", goods: "Food", date: "19/1/2024", status: "rejected" },
    
    ],
    "Confirmed Shipments": [
      { id: "CON001", client: "TechMart Electronics", route: "Mumbai → Delhi", goods: "Electronics", pickup: "15/1/2024", delivery: "20/1/2024", status: "confirmed" },
      { id: "CON002", client: "Lifestyle Furniture", route: "Bengaluru → Chennai", goods: "Furniture", pickup: "18/1/2024", delivery: "22/1/2024", status: "confirmed" },
    ],
    "Modification Requests": [
      { id: "MR001", route: "Pune → Hyderabad", goods: "Medical Equipment", request: "Change pickup date", status: "pending" },
      { id: "MR002", route: "Delhi → Kolkata", goods: "Perfumes", request: "Change drop-off location", status: "reviewing" },
    ],
  };

  // Shipment Request: Accept, Reject
  // Offered Shipments: If status = Rejected , Modify
  // Confirmed Shipments: N/A
  // Mod: Accept, Reject

  const tabs = [
    { key: "Shipment Requests", label: "Shipment Requests", icon: <Package size={16} /> },
    { key: "Offered Shipments", label: "Offered Shipments", icon: <Truck size={16} /> },
    { key: "Confirmed Shipments", label: "Confirmed Shipments", icon: <CheckCircle size={16} /> },
    { key: "Modification Requests", label: "Modification Requests", icon: <Edit3 size={16} /> },
  ];

  return (
    <div className="p-6 min-h-screen mt-[70px]">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* Tabs + Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-1 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap border
                ${
                  activeTab === tab.key
                    ? "bg-green-500 text-white border-green-500"
                    : "border-green-500 text-green-600 bg-white hover:bg-green-50"
                }`}
            >
              {tab.icon}
              {tab.label}
              <span className="ml-1 px-2 py-0.5 text-white text-xs bg-black bg-opacity-10 rounded-full">
                {data[tab.key].length}
              </span>
            </button>
          ))}
        </div>

        {/* Filter Button */}
        <div className="relative ml-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium bg-white hover:bg-gray-50"
          >
            <Filter size={16} />
            Filter
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-md p-3 z-10">
              <p className="text-sm font-semibold mb-2">Expected Pickup</p>
              <button
                className="w-full text-left px-3 py-1.5 rounded hover:bg-gray-100 text-sm"
                onClick={() => setSelectedFilter("Pickup Soon")}
              >
                Soon
              </button>
              <button
                className="w-full text-left px-3 py-1.5 rounded hover:bg-gray-100 text-sm"
                onClick={() => setSelectedFilter("Pickup Far")}
              >
                Far
              </button>

              <p className="text-sm font-semibold mt-3 mb-2">Expected Drop Off</p>
              <button
                className="w-full text-left px-3 py-1.5 rounded hover:bg-gray-100 text-sm"
                onClick={() => setSelectedFilter("Drop Soon")}
              >
                Soon
              </button>
              <button
                className="w-full text-left px-3 py-1.5 rounded hover:bg-gray-100 text-sm"
                onClick={() => setSelectedFilter("Drop Far")}
              >
                Far
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 border rounded-xl bg-gray-50 shadow-sm">
        {data[activeTab].map((item) => (
          <div key={item.id} className="mb-3 p-3 bg-white border rounded-lg shadow-sm flex justify-between items-center">
            <div>
            <p className="font-medium">{item.id} • {item.route}</p>
            <p className="text-sm text-gray-600">{item.goods}</p>
            {item.pickup && <p className="text-xs text-gray-500">Pickup: {item.pickup}</p>}
            {item.delivery && <p className="text-xs text-gray-500">Delivery: {item.delivery}</p>}
            {item.cost && <p className="text-xs text-gray-500">Cost: {item.cost}</p>}
            {item.request && <p className="text-xs text-gray-500">Request: {item.request}</p>}
            <p className="text-xs text-gray-500">Status: {item.status}</p>
            </div>
            {(activeTab==="Shipment Requests") && <div className="flex flex-col gap-y-2">
            <button className="cursor-pointer border-2 border-lxj-accent bg-lxj-accent text-white font-semibold py-2 px-3 rounded-xl hover:opacity-80">Accept Offer</button>
            <button className="cursor-pointer border-2 text-red-600 font-semibold py-2 px-3 rounded-xl hover:bg-red-600 hover:text-white">Reject Offer</button>
            </div>}
            {(activeTab==="Offered Shipments") && (item.status=="rejected") && <div className="flex flex-col gap-y-2">
            <button className="cursor-pointer border-2 border-lxj-accent bg-lxj-accent text-white font-semibold py-2 px-3 rounded-xl hover:opacity-80">Modify Offer</button>
            </div>}
            {(activeTab==="Modification Requests") && <div className="flex flex-col gap-y-2">
            <button className="cursor-pointer border-2 border-lxj-accent bg-lxj-accent text-white font-semibold py-2 px-3 rounded-xl hover:opacity-80">Accept Request</button>
            <button className="cursor-pointer border-2 text-red-600 font-semibold py-2 px-3 rounded-xl hover:bg-red-600 hover:text-white">Reject Request</button>
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
}
