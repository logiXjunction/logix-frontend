import React, { useState } from 'react';
import CollapsibleSection from '../components/ui/CollapsibleSection';

export default function TransporterDashboard() {
  const transporterData = {
    companyName: 'FastMove Logistics Pvt Ltd',
    companyAddress: 'Plot 23, Industrial Area, Sector 88, Noida, UP - 201301',
    companyEmail: 'support@fastmovelogistics.com',
    POCContact: '+91 9876543210',
    POCName: 'Bill Gates',
    gstNumber: '29ABCDE1234F2Z5',
    cinNumber: 'U63090DL2021PTC123456',
    ownerName: 'Ravi Mehta',
    ownerContact: '+91 9811122233',
    fleetCount: 54,
    serviceArea: 'All India',
    pincode: '201301',
    about:
      'We are a leading logistics company providing all-India service with a modern fleet and a focus on reliable delivery.',
    image: '', // Empty string will fallback to default avatar
  };

  const fallbackImage = 'https://www.w3schools.com/howto/img_avatar.png';
  const profileImage = transporterData.image || fallbackImage;


// Tabs State
const [activeTab, setActiveTab] = useState('POC');
// Dynamic tab content from transporterData
const tabDetails = {
  POC: [
    { label: 'Name', value: transporterData.POCName || 'N/A' },
    { label: 'Contact', value: transporterData.POCContact || 'N/A' },
  ],
  Owner: [
    { label: 'Name', value: transporterData.ownerName || 'N/A' },
    { label: 'Contact', value: transporterData.ownerContact || 'N/A' },
  ],
  Company: [
    { label: 'Email', value: transporterData.companyEmail || 'N/A' },
    { label: 'Fleet Count', value: transporterData.fleetCount || 'N/A' },
    { label: 'Service Area', value: transporterData.serviceArea || 'N/A' },
  ],
};



  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl p-6 sm:p-10">

        {/* Header */}
        <div className="flex flex-col py-4 border-b sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
            Transporter Profile
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <button className="border-2 border-blue-600 text-black font-semibold px-6 py-2 rounded-lg shadow-sm hover:shadow-lg hover:text-blue-700 hover:bg-blue-50 transform transition-all duration-200">
              Consignments
            </button>
            <button className="border-2 border-blue-600 text-black font-semibold px-6 py-2 rounded-lg shadow-sm hover:shadow-lg hover:text-blue-700 hover:bg-blue-50 transform transition-all duration-200">
              Shipment History
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Sidebar */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-200 shadow"
            />
            <button className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-md hover:bg-gray-300 transition">
              Upload Photo
            </button>
          </div>

          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="text-3xl sm:text-4xl font-bold text-black-700 mb-2">
              {transporterData.companyName}
            </div>
            <div>
              <div className="text-md font-semibold text-gray-700">
                {transporterData.companyAddress}
              </div>
              <div className="text-md font-semibold text-gray-700">
                GST Number: {transporterData.gstNumber}
              </div>
              <div className="text-md font-semibold text-gray-700 mb-1">
                CIN Number: {transporterData.cinNumber || 'N/A'}
              </div>
              <div className="col-span-1 md:col-span-2">
                <div className="bg-gray-50 text-gray-800">
                  {transporterData.about}
                </div>
              </div>
            </div>
          </div>

          
        </div>

        {/* -------- TABS SECTION (Add Above Edit Button) -------- */}
        <div className="my-8 w-full">
          {/* Tabs */}
          <div className="flex justify-center sm:justify-start mt-10 mb-4">
            <div className="flex flex-wrap border-b border-gray-300 w-full gap-4 sm:gap-6">
              {['POC', 'Owner', 'Company'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 font-medium transition duration-150 ${
                    activeTab === tab
                      ? 'border-b-2 border-black text-black'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 ">
            {tabDetails[activeTab].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-x-2 text-sm sm:text-base text-gray-800">
                <span className="font-semibold whitespace-nowrap">{item.label}:</span>
                <span className="break-words">{item.value}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Edit Button */}
        <div className="flex flex-wrap justify-end items-center mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>

        {/* Collapsible Sections */}
        <CollapsibleSection
          title="Registered Vehicles"
          items={['Truck - UP32AB1234', 'Trailer - HR55XY9876']}
          onAdd={() => alert('Redirect to vehicle registration page')}
          onEdit={(item, i) => console.log('Edit', item)}
          onDelete={(item, i) => console.log('Delete', item)}
        />

        <CollapsibleSection
          title="Registered Drivers"
          items={['Amit Kumar', 'Rohan Singh']}
          onAdd={() => alert('Redirect to driver registration page')}
          onEdit={(item, i) => console.log('Edit', item)}
          onDelete={(item, i) => console.log('Delete', item)}
        />
      </div>
    </div>
  );
}

const Display = ({ label, value }) => (
  <div>
    <h3 className="text-gray-700 font-medium mb-1">{label}</h3>
    <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900">
      {value}
    </div>
  </div>
);