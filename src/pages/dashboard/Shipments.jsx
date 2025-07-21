import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LogixJunctionDashboard = () => {
  const [activeTab, setActiveTab] = useState('Ongoing');
  const [shipments, setShipments] = useState([
  {
    id: 'SHP-IND-001',
    origin: 'Delhi',
    destination: 'Mumbai',
    status: 'In Transit',
    estimatedDelivery: '2024-07-20',
    category: 'Ongoing'
  },
  {
    id: 'SHP-IND-002',
    origin: 'Bangalore',
    destination: 'Hyderabad',
    status: 'Picked Up',
    estimatedDelivery: '2024-07-22',
    category: 'Ongoing'
  },
  {
    id: 'SHP-IND-003',
    origin: 'Chennai',
    destination: 'Kolkata',
    status: 'Delivered',
    estimatedDelivery: '2024-07-18',
    category: 'Completed'
  },
  {
    id: 'SHP-IND-004',
    origin: 'Ahmedabad',
    destination: 'Jaipur',
    status: 'Scheduled',
    estimatedDelivery: '2024-07-25',
    category: 'Ongoing'
  },
  {
    id: 'SHP-IND-005',
    origin: 'Pune',
    destination: 'Nagpur',
    status: 'In Transit',
    estimatedDelivery: '2024-07-21',
    category: 'Ongoing'
  },
  {
    id: 'SHP-IND-006',
    origin: 'Surat',
    destination: 'Indore',
    status: 'Cancelled',
    estimatedDelivery: '2024-07-19',
    category: 'Declined'
  },
  {
    id: 'SHP-IND-007',
    origin: 'Lucknow',
    destination: 'Kanpur',
    status: 'Delivered',
    estimatedDelivery: '2024-07-15',
    category: 'Completed'
  },
  {
    id: 'SHP-IND-008',
    origin: 'Bhopal',
    destination: 'Ranchi',
    status: 'Scheduled',
    estimatedDelivery: '2024-07-26',
    category: 'Ongoing'
  },
  {
    id: 'SHP-IND-009',
    origin: 'Guwahati',
    destination: 'Patna',
    status: 'In Transit',
    estimatedDelivery: '2024-07-23',
    category: 'Ongoing'
  },
  {
    id: 'SHP-IND-010',
    origin: 'Coimbatore',
    destination: 'Vishakhapatnam',
    status: 'Picked Up',
    estimatedDelivery: '2024-07-27',
    category: 'Ongoing'
  },
  {
    id: 'SHP-IND-011',
    origin: 'Dehradun',
    destination: 'Shimla',
    status: 'Delivered',
    estimatedDelivery: '2024-07-16',
    category: 'Completed'
  },
  {
    id: 'SHP-IND-012',
    origin: 'Chandigarh',
    destination: 'Amritsar',
    status: 'Cancelled',
    estimatedDelivery: '2024-07-20',
    category: 'Declined'
  },
  {
    id: 'SHP-IND-013',
    origin: 'Thiruvananthapuram',
    destination: 'Mangalore',
    status: 'Scheduled',
    estimatedDelivery: '2024-07-28',
    category: 'Ongoing'
  },
  {
    id: 'SHP-IND-014',
    origin: 'Raipur',
    destination: 'Jabalpur',
    status: 'In Transit',
    estimatedDelivery: '2024-07-24',
    category: 'Ongoing'
  },
  {
    id: 'SHP-IND-015',
    origin: 'Udaipur',
    destination: 'Agra',
    status: 'Delivered',
    estimatedDelivery: '2024-07-17',
    category: 'Completed'
  }]);
  const navigate = useNavigate();
  const getStatusColor = (status) => {
    const colors = {
      'In Transit': 'bg-blue-500 text-white',
      'Picked Up': 'bg-yellow-500 text-white',
      'Delivered': 'bg-green-500 text-white',
      'Scheduled': 'bg-purple-500 text-white',
      'Cancelled': 'bg-red-500 text-white',
      'Delayed': 'bg-orange-500 text-white'
    };
    return colors[status] || 'bg-gray-500 text-white';
  };

  const filteredShipments = shipments.filter(shipment => shipment.category === activeTab);

  const tabs = ['Completed', 'Ongoing', 'Declined'];

  return (
    <div className="mt-15 relative flex min-h-screen flex-col" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif', backgroundColor: '#FEFAFF' }}>
      <div className="flex h-full grow flex-col">
        

        {/* Main Content */}
        <div className="px-8 md:px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-6xl flex-1">
            {/* Page Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-gray-900 text-3xl font-bold leading-tight">Shipments</p>
                <p className="text-gray-600 text-sm font-normal leading-normal">Manage and track your shipments</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="pb-3">
              <div className="flex border-b border-gray-300 px-4 gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex flex-col items-center justify-center border-b-3 pb-3 pt-4 transition-colors duration-200 ${
                      activeTab === tab
                        ? 'border-b-blue-500 text-gray-900'
                        : 'border-b-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <p className="text-sm font-bold leading-normal tracking-wide">{tab}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="px-4 py-3">
              <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-gray-900 text-sm font-semibold">Shipment ID</th>
                        <th className="px-4 py-3 text-left text-gray-900 text-sm font-semibold">Origin</th>
                        <th className="px-4 py-3 text-left text-gray-900 text-sm font-semibold">Destination</th>
                        <th className="px-4 py-3 text-left text-gray-900 text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-left text-gray-900 text-sm font-semibold">Estimated Delivery</th>
                        <th className="px-4 py-3 text-left text-gray-900 text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredShipments.map((shipment, index) => (
                        <tr key={shipment.id} className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                          <td className="px-4 py-4 text-gray-900 text-sm font-medium">{shipment.id}</td>
                          <td className="px-4 py-4 text-gray-600 text-sm">{shipment.origin}</td>
                          <td className="px-4 py-4 text-gray-600 text-sm">{shipment.destination}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                              {shipment.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-gray-600 text-sm">{shipment.estimatedDelivery}</td>
                          <td className="px-4 py-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredShipments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No shipments found for the selected category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogixJunctionDashboard;
