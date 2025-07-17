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
    <div className="relative flex min-h-screen flex-col" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif', backgroundColor: '#FEFAFF' }}>
      <div className="flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 px-10 py-3 bg-white">
          <div className="flex items-center gap-4 text-gray-900">
            <div className="w-4 h-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_543)">
                  <path
                    d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6_543">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-tight">LogixJunction</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-gray-900 text-sm font-medium leading-normal hover:text-blue-600 transition-colors" href="#">Dashboard</a>
              <a className="text-gray-900 text-sm font-medium leading-normal hover:text-blue-600 transition-colors" href="#">Shipments</a>
              <a className="text-gray-900 text-sm font-medium leading-normal hover:text-blue-600 transition-colors" href="#">Customers</a>
              <a className="text-gray-900 text-sm font-medium leading-normal hover:text-blue-600 transition-colors" href="#">Reports</a>
              <a className="text-gray-900 text-sm font-medium leading-normal hover:text-blue-600 transition-colors" href="#">Settings</a>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
          </div>
        </header>

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