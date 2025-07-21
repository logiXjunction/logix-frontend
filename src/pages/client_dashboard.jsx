import React, { useState } from 'react';
import { ArrowLeft, Edit3, Plus, Calendar, User, Phone, Mail, MapPin, Shield, FileText,  Package, Clock,  CheckCircle, XCircle, AlertCircle,  MoreHorizontal, Send, Eye,  MessageCircle,  Truck,  PackageCheck,  PackageX,  Timer } from 'lucide-react';
import { Link } from 'react-router-dom';


const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeShipmentTab, setActiveShipmentTab] = useState('ongoing');

  // Sample client data
  const clientData = {
    name: "LogiXJunction",
    email: "info@logixjunction.com",
    phone: "XXXXXXXXXX",
    dateOfBirth: "10/10/1990",
    address: "5678 Tech Park, New Delhi, 94107",
    insurance: "Yes",
    avatar: "/LOGO.png",
    tags: ["Logistics", "Smart Solutions", "Priority Client"],
    company: "Logistics Smart Solutions"
  };

  // Sample shipments data categorized by status
  const shipmentsByStatus = {
    completed: [
      {
        id: "SH001",
        description: "Electronics shipment to Mumbai",
        trackingNumber: "TC123456789",
        date: "12 Jul 2024",
        destination: "Mumbai, MH",
        value: "$2,450"
      },
      {
        id: "SH004",
        description: "Medical supplies delivery",
        trackingNumber: "TC789123456",
        date: "10 Jul 2024",
        destination: "Boston, MA",
        value: "$1,200"
      }
    ],
    rejected: [
      {
        id: "SH003",
        description: "Furniture shipment to Miami",
        trackingNumber: "TC456789123",
        date: "08 Jul 2024",
        destination: "Miami, FL",
        value: "$3,200",
        reason: "Incomplete documentation - Missing customs declaration forms"
      }
    ],
    ongoing: [
      {
        id: "SH002", 
        description: "Office supplies delivery to Chicago",
        trackingNumber: "TC987654321",
        date: "15 Jul 2024",
        destination: "Chicago, IL",
        value: "$890",
        estimatedDelivery: "17 Jul 2024"
      },
      {
        id: "SH005",
        description: "Technology equipment transport",
        trackingNumber: "TC654321987",
        date: "16 Jul 2024",
        destination: "Seattle, WA",
        value: "$5,600",
        estimatedDelivery: "19 Jul 2024"
      }
    ],
    upcoming: [
      {
        id: "SH006",
        description: "Pharmaceutical delivery",
        trackingNumber: "TC321654987",
        date: "20 Jul 2024",
        destination: "Denver, CO",
        value: "$1,800",
        scheduledPickup: "18 Jul 2024"
      }
    ]
  };

  // Sample documents
  const documents = [
    {
      id: 1,
      name: "Shipping manifest",
      type: "PDF",
      date: "12 Jul, 2024",
      color: "bg-blue-50 border-blue-200"
    },
    {
      id: 2,
      name: "Insurance certificate",
      type: "PDF", 
      date: "10 Jul, 2024",
      color: "bg-amber-50 border-amber-200"
    }
  ];

  // Sample activities
  const activities = [
    {
      id: 1,
      user: "Mike Rodriguez",
      action: "updated shipment status",
      item: "Electronics shipment",
      time: "2 hours ago",
      type: "update"
    },
    {
      id: 2,
      user: "Emma Thompson",
      action: "added new document",
      item: "Insurance certificate",
      time: "1 day ago", 
      type: "document"
    },
    {
      id: 3,
      user: "David Chen",
      action: "scheduled pickup for",
      item: "Office supplies",
      time: "2 days ago",
      type: "schedule"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <PackageCheck className="w-4 h-4" />;
      case 'ongoing': return <Truck className="w-4 h-4" />;
      case 'rejected': return <PackageX className="w-4 h-4" />;
      case 'upcoming': return <Timer className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getShipmentTabColor = (tab) => {
    switch(tab) {
      case 'completed': return activeShipmentTab === tab ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'ongoing': return activeShipmentTab === tab ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'rejected': return activeShipmentTab === tab ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'upcoming': return activeShipmentTab === tab ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', count: null },
    { id: 'shipments', label: 'Shipments', count: Object.values(shipmentsByStatus).flat().length },
    { id: 'documents', label: 'Documents', count: 2 },
    { id: 'billing', label: 'Billing', count: 1 },
    { id: 'notes', label: 'Notes', count: 1 }
  ];

  const shipmentTabs = [
    { id: 'ongoing', label: 'Ongoing', count: shipmentsByStatus.ongoing.length },
    { id: 'completed', label: 'Completed', count: shipmentsByStatus.completed.length },
    { id: 'upcoming', label: 'Upcoming', count: shipmentsByStatus.upcoming.length },
    { id: 'rejected', label: 'Rejected', count: shipmentsByStatus.rejected.length }
  ];

  return (
    <div className="min-h-screen mt-14" style={{ backgroundColor: '#fffaff' }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold ml-2" style={{ color: '#0a2463' }}>DASHBOARD</h1>     
          {/* Request Shipment Button */}
          <Link to="/shipment-registration">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg hover:scale-105" style={{ backgroundColor: '#d8315B' }}>
              <Send className="w-5 h-5" />
              Request Shipment
            </button>
          </Link>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Client Details */}
          <div className="w-80 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Client Avatar and Name */}
            <div className="text-center p-8 pb-6" style={{ backgroundColor: '#EEE8A9' }}>
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={clientData.avatar} 
                  alt={clientData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold" style={{ color: '#1e1b18' }}>{clientData.name}</h1>
              <p className="text-sm opacity-70 mt-1" style={{ color: '#1e1b18' }}>{clientData.company}</p>
            </div>

            <div className="p-6">
              {/* Client Details */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold" style={{ color: '#0a2463' }}>Client details</h3>
                  <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4" style={{ color: '#3e92cc' }} />
                    <span className="text-sm" style={{ color: '#1e1b18' }}>{clientData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4" style={{ color: '#3e92cc' }} />
                    <span className="text-sm" style={{ color: '#1e1b18' }}>{clientData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4" style={{ color: '#3e92cc' }} />
                    <span className="text-sm" style={{ color: '#1e1b18' }}>{clientData.dateOfBirth}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4" style={{ color: '#3e92cc' }} />
                    <span className="text-sm" style={{ color: '#1e1b18' }}>{clientData.address}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-4 h-4" style={{ color: '#3e92cc' }} />
                    <span className="text-sm" style={{ color: '#1e1b18' }}>Insurance: {clientData.insurance}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-sm font-medium" style={{ color: '#0a2463' }}>Tags</h4>
                  <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {clientData.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-xs rounded-full border" style={{ backgroundColor: '#EEE8A9', color: '#1e1b18', borderColor: '#3e92cc' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-sm font-medium" style={{ color: '#0a2463' }}>Notes</h4>
                  <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm" style={{ color: '#1e1b18' }}>
                    Priority client - handle with expedited shipping. Regular shipments of electronics and office supplies.
                  </p>
                  <p className="text-xs text-gray-500 mt-3">Updated by John Smith - 2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Main Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    style={activeTab === tab.id ? { color: '#3e92cc', borderColor: '#3e92cc' } : {}}
                  >
                    {tab.label}
                    {tab.count && (
                      <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'overview' && (
                <div className="space-y-10">
                  {/* Latest Shipments */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold" style={{ color: '#0a2463' }}>Latest shipments</h3>
                      <button className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#3e92cc' }}>
                        Show all
                      </button>
                    </div>
                    <div className="space-y-4">
                      {Object.values(shipmentsByStatus).flat().slice(0, 3).map((shipment) => (
                        <div key={shipment.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                          <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3e92cc' }}></div>
                            <div>
                              <p className="font-medium" style={{ color: '#1e1b18' }}>{shipment.description}</p>
                              <p className="text-sm text-gray-500 mt-1">{shipment.trackingNumber}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 border ${getStatusColor(shipment.status || 'ongoing')}`}>
                              {getStatusIcon(shipment.status || 'ongoing')}
                              {shipment.status || 'ongoing'}
                            </span>
                            <span className="text-sm text-gray-500">{shipment.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents Required */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6" style={{ color: '#0a2463' }}>Documents required</h3>
                    <div className="grid grid-cols-2 gap-6">
                      {documents.map((doc) => (
                        <div key={doc.id} className={`p-6 rounded-xl border-2 ${doc.color} hover:shadow-md transition-all duration-200`}>
                          <div className="flex items-center gap-4">
                            <FileText className="w-8 h-8" style={{ color: '#3e92cc' }} />
                            <div>
                              <p className="font-medium" style={{ color: '#1e1b18' }}>{doc.name}</p>
                              <p className="text-sm text-gray-500 mt-1">Updated on {doc.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Latest Activity */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6" style={{ color: '#0a2463' }}>Latest activity</h3>
                    <div className="space-y-5">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EEE8A9' }}>
                            {activity.type === 'update' && <Package className="w-5 h-5" style={{ color: '#0a2463' }} />}
                            {activity.type === 'document' && <FileText className="w-5 h-5" style={{ color: '#0a2463' }} />}
                            {activity.type === 'schedule' && <Calendar className="w-5 h-5" style={{ color: '#0a2463' }} />}
                          </div>
                          <div>
                            <p className="text-sm" style={{ color: '#1e1b18' }}>
                              <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                              <span className="font-medium" style={{ color: '#3e92cc' }}>{activity.item}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'shipments' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6" style={{ color: '#0a2463' }}>All Shipments</h3>
                  
                  {/* Shipment Status Tabs */}
                  <div className="flex gap-3 mb-8">
                    {shipmentTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveShipmentTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${getShipmentTabColor(tab.id)}`}
                      >
                        {getStatusIcon(tab.id)}
                        {tab.label}
                        <span className="ml-1 px-2 py-1 text-xs bg-white bg-opacity-20 rounded-full">
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Shipment Cards */}
                  <div className="space-y-4">
                    {shipmentsByStatus[activeShipmentTab]?.map((shipment) => (
                      <div key={shipment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(activeShipmentTab).replace('text-', 'bg-').replace('bg-', 'bg-').split(' ')[0]}`}></div>
                            <div>
                              <p className="font-medium text-lg" style={{ color: '#1e1b18' }}>{shipment.description}</p>
                              <p className="text-sm text-gray-500">Tracking: {shipment.trackingNumber}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 border ${getStatusColor(activeShipmentTab)}`}>
                              {getStatusIcon(activeShipmentTab)}
                              {activeShipmentTab}
                            </span>
                            <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Destination</p>
                            <p className="font-medium" style={{ color: '#1e1b18' }}>{shipment.destination}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Value</p>
                            <p className="font-medium" style={{ color: '#1e1b18' }}>{shipment.value}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">
                              {activeShipmentTab === 'upcoming' ? 'Scheduled Pickup' : 
                               activeShipmentTab === 'ongoing' ? 'Est. Delivery' : 'Date'}
                            </p>
                            <p className="font-medium" style={{ color: '#1e1b18' }}>
                              {shipment.estimatedDelivery || shipment.scheduledPickup || shipment.date}
                            </p>
                          </div>
                        </div>

                        {/* Rejection Reason - Only for rejected shipments */}
                        {activeShipmentTab === 'rejected' && shipment.reason && (
                          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageCircle className="w-4 h-4 text-red-600" />
                              <p className="text-sm font-medium text-red-800">Rejection Reason</p>
                            </div>
                            <p className="text-sm text-red-700">{shipment.reason}</p>
                            <button className="mt-2 text-xs text-red-600 hover:text-red-800 font-medium flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              View detailed feedback
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6" style={{ color: '#0a2463' }}>Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {documents.map((doc) => (
                      <div key={doc.id} className={`p-8 rounded-xl border-2 ${doc.color} hover:shadow-md transition-all duration-200`}>
                        <div className="flex items-center gap-4">
                          <FileText className="w-10 h-10" style={{ color: '#3e92cc' }} />
                          <div>
                            <p className="font-medium text-lg" style={{ color: '#1e1b18' }}>{doc.name}</p>
                            <p className="text-sm text-gray-500 mt-1">Type: {doc.type}</p>
                            <p className="text-sm text-gray-500">Updated: {doc.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6" style={{ color: '#0a2463' }}>Billing Information</h3>
                  <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                    <p className="text-gray-600">Billing content will be implemented here.</p>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6" style={{ color: '#0a2463' }}>Notes</h3>
                  <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                    <p className="text-gray-600 mb-4">
                      Priority client - handle with expedited shipping. Regular shipments of electronics and office supplies.
                    </p>
                    <p className="text-sm text-gray-400">Last updated by John Smith - 2 days ago</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;