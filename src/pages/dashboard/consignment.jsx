import React, { useState } from 'react';
import { Clock, MapPin, Eye } from 'lucide-react';

const CarrierDashboard = () => {
  const [activeTab, setActiveTab] = useState('live');

  // Sample data for live consignments
  const liveConsignments = [
    {
      id: 'LJ-84301',
      from: 'Mumbai, MH',
      to: 'Delhi, DL',
      status: 'In Transit',
      statusColor: 'bg-blue-100 text-blue-800',
      pickupDate: '25 Oct',
      deliveryDate: '29 Oct 2023',
      lastUpdated: '5 mins ago'
    },
    {
      id: 'LJ-79154',
      from: 'Bangalore, KA',
      to: 'Chennai, TN',
      status: 'Near Delivery',
      statusColor: 'bg-orange-100 text-orange-800',
      pickupDate: '26 Oct',
      deliveryDate: '27 Oct 2023',
      lastUpdated: '1 min ago'
    },
    {
      id: 'LJ-65228',
      from: 'Kolkata, WB',
      to: 'Hyderabad, TS',
      status: 'Delayed',
      statusColor: 'bg-red-100 text-red-800',
      pickupDate: '24 Oct',
      deliveryDate: '28 Oct 2023',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'LJ-91120',
      from: 'Pune, MH',
      to: 'Ahmedabad, GJ',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800',
      pickupDate: '27 Oct',
      deliveryDate: '29 Oct 2023',
      lastUpdated: '1 day ago'
    }
  ];

  // Sample data for assigned consignments
  const assignedConsignments = [
    {
      id: 'LJ-A0199',
      from: 'Jaipur, RJ',
      to: 'Lucknow, UP',
      pickupDate: '2 Nov',
      deliveryDate: '5 Nov 2023'
    },
    {
      id: 'LJ-A3451',
      from: 'Surat, GJ',
      to: 'Nagpur, MH',
      pickupDate: '3 Nov',
      deliveryDate: '5 Nov 2023'
    }
  ];

  // Sample data for containerization
  const containers = [
    {
      id: 'CONT-10A4F',
      status: 'Full',
      fillPercent: 100,
      statusColor: 'bg-green-100 text-green-800',
      action: 'Packed',
      actionDisabled: true
    },
    {
      id: 'CONT-23B1E',
      status: 'Partially Filled',
      fillPercent: 60,
      statusColor: 'bg-yellow-100 text-yellow-800',
      action: 'Mark as Packed',
      actionDisabled: false
    },
    {
      id: 'CONT-98C7D',
      status: 'Empty',
      fillPercent: 0,
      statusColor: 'bg-gray-100 text-gray-800',
      action: 'Mark as Packed',
      actionDisabled: false
    }
  ];

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-0 py-4 text-base font-medium border-b-2 transition-colors mr-8 ${
        isActive
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
    </button>
  );

  const StatusBadge = ({ status, className }) => (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${className}`}>
      {status}
    </span>
  );

  const ProgressBar = ({ percent }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${
          percent === 100 ? 'bg-green-500' : percent > 50 ? 'bg-yellow-500' : 'bg-gray-400'
        }`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );

  return (
    <div className="mt-15 min-h-screen p-8" style={{ backgroundColor: '#fffaff' }}>
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex">
            <TabButton
              id="live"
              label="Live Consignments"
              isActive={activeTab === 'live'}
              onClick={setActiveTab}
            />
            <TabButton
              id="assigned"
              label="Assigned Consignments"
              isActive={activeTab === 'assigned'}
              onClick={setActiveTab}
            />
            <TabButton
              id="containerization"
              label="Containerization"
              isActive={activeTab === 'containerization'}
              onClick={setActiveTab}
            />
          </nav>
        </div>

        {/* Live Consignments Tab */}
        {activeTab === 'live' && (
          <div className="space-y-6">
            {liveConsignments.map((consignment) => (
              <div key={consignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="text-lg font-semibold text-blue-600 mr-4">{consignment.id}</h3>
                      <StatusBadge status={consignment.status} className={consignment.statusColor} />
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">{consignment.from}</span>
                      <span className="mx-3">→</span>
                      <span className="font-medium">{consignment.to}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Pickup on {consignment.pickupDate}</span>
                      <span className="mx-4">|</span>
                      <span>Last updated: {consignment.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Delivery: {consignment.deliveryDate}</p>
                    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      Track
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Assigned Consignments Tab */}
        {activeTab === 'assigned' && (
          <div className="space-y-6">
            {assignedConsignments.map((consignment) => (
              <div key={consignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">{consignment.id}</h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">{consignment.from}</span>
                      <span className="mx-3">→</span>
                      <span className="font-medium">{consignment.to}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Pickup on {consignment.pickupDate}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Delivery: {consignment.deliveryDate}</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button className="px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium">
                    Decline
                  </button>
                  <button className="px-6 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium">
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Containerization Tab */}
        {activeTab === 'containerization' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {containers.map((container) => (
              <div key={container.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{container.id}</h3>
                  <StatusBadge status={container.status} className={container.statusColor} />
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Fill Status ({container.fillPercent}%)</span>
                  </div>
                  <ProgressBar percent={container.fillPercent} />
                </div>
                
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    container.actionDisabled
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  disabled={container.actionDisabled}
                >
                  {container.action}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarrierDashboard;
