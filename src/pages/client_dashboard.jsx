import React, { useState } from 'react';
import { ArrowLeft, Edit3, Plus, Calendar, User, Phone, Mail, MapPin, Shield, FileText, Package, Clock, CheckCircle, XCircle, AlertCircle, MoreHorizontal, Send, Eye, MessageCircle, Truck, PackageCheck, PackageX, Timer, Menu, X } from 'lucide-react';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeShipmentTab, setActiveShipmentTab] = useState('ongoing');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample client data
  const clientData = {
    name: "LogiXJunction",
    email: "info@logixjunction.com",
    phone: "XXXXXXXXXX",
    dateOfBirth: "10/10/1990",
    address: "5678 Tech Park, New Delhi, 94107",
    insurance: "Yes",
    avatar: "/api/placeholder/96/96",
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
    <div className="min-h-screen bg-purple-50 pt-14">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
        {/* Mobile Header with Hamburger */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6 text-blue-900" /> : <Menu className="w-6 h-6 text-blue-900" />}
            </button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900">
              DASHBOARD
            </h1>
          </div>
          
          {/* Request Shipment Button - Responsive */}
          <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg hover:scale-105 bg-pink-600 text-xs sm:text-sm lg:text-base">
            <Send className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            <span className="hidden sm:inline">Request Shipment</span>
            <span className="sm:hidden">Request</span>
          </button>
        </div>

        <div className="flex gap-4 lg:gap-8 relative">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Left Sidebar - Mobile Responsive */}
          <div className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0 
            fixed lg:relative 
            top-0 left-0 
            z-50 lg:z-auto
            w-80 sm:w-96 lg:w-80 
            h-full lg:h-auto
            bg-white rounded-none lg:rounded-2xl shadow-lg lg:shadow-sm 
            border-0 lg:border border-gray-100 
            overflow-y-auto lg:overflow-visible
            transition-transform duration-300 ease-in-out
          `}>
            
            {/* Mobile Close Button */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Client Avatar and Name */}
            <div className="text-center p-6 sm:p-8 pb-4 sm:pb-6 bg-yellow-200">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={clientData.avatar} 
                  alt={clientData.name}
                  className="w-full h-full object-cover bg-gray-200"
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{clientData.name}</h1>
              <p className="text-xs sm:text-sm opacity-70 mt-1 text-gray-800">{clientData.company}</p>
            </div>

            <div className="p-4 sm:p-6">
              {/* Client Details */}
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-blue-900">Client details</h3>
                  <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-800 truncate">{clientData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-800">{clientData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-800">{clientData.dateOfBirth}</span>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-800 leading-relaxed">{clientData.address}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-800">Insurance: {clientData.insurance}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <h4 className="text-sm font-medium text-blue-900">Tags</h4>
                  <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {clientData.tags.map((tag, index) => (
                    <span key={index} className="px-2.5 sm:px-3 py-1 text-xs rounded-full border bg-yellow-200 text-gray-800 border-blue-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <h4 className="text-sm font-medium text-blue-900">Notes</h4>
                  <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                </div>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                    Priority client - handle with expedited shipping. Regular shipments of electronics and office supplies.
                  </p>
                  <p className="text-xs text-gray-500 mt-2 sm:mt-3">Updated by John Smith - 2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area - Mobile Responsive */}
          <div className="flex-1 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-screen lg:min-h-0">
            {/* Main Tabs - Mobile Scrollable */}
            <div className="border-b border-gray-200 overflow-x-auto">
              <div className="flex min-w-max lg:min-w-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                    {tab.count && (
                      <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content - Mobile Responsive */}
            <div className="p-4 sm:p-6 lg:p-8">
              {activeTab === 'overview' && (
                <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                  {/* Latest Shipments */}
                  <div>
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-blue-900">Latest shipments</h3>
                      <button className="text-xs sm:text-sm font-medium hover:opacity-70 transition-opacity text-blue-500">
                        Show all
                      </button>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {Object.values(shipmentsByStatus).flat().slice(0, 3).map((shipment) => (
                        <div key={shipment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 gap-3 sm:gap-4">
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                            <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm sm:text-base text-gray-800 truncate">{shipment.description}</p>
                              <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{shipment.trackingNumber}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                            <span className={`px-2.5 sm:px-3 py-1 text-xs rounded-full flex items-center gap-1 border ${getStatusColor(shipment.status || 'ongoing')} flex-shrink-0`}>
                              {getStatusIcon(shipment.status || 'ongoing')}
                              <span className="hidden sm:inline">{shipment.status || 'ongoing'}</span>
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{shipment.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents Required */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-blue-900">Documents required</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {documents.map((doc) => (
                        <div key={doc.id} className={`p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 ${doc.color} hover:shadow-md transition-all duration-200`}>
                          <div className="flex items-center gap-3 sm:gap-4">
                            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm sm:text-base text-gray-800 truncate">{doc.name}</p>
                              <p className="text-xs sm:text-sm text-gray-500 mt-1">Updated on {doc.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Latest Activity */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-blue-900">Latest activity</h3>
                    <div className="space-y-3 sm:space-y-5">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-yellow-200 flex-shrink-0">
                            {activity.type === 'update' && <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900" />}
                            {activity.type === 'document' && <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900" />}
                            {activity.type === 'schedule' && <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                              <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                              <span className="font-medium text-blue-500">{activity.item}</span>
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
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-blue-900">All Shipments</h3>
                  
                  {/* Shipment Status Tabs - Mobile Scrollable */}
                  <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2">
                    {shipmentTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveShipmentTab(tab.id)}
                        className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 whitespace-nowrap flex-shrink-0 ${getShipmentTabColor(tab.id)}`}
                      >
                        {getStatusIcon(tab.id)}
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.label.slice(0, 4)}</span>
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-white bg-opacity-20 rounded-full">
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Shipment Cards - Mobile Responsive */}
                  <div className="space-y-3 sm:space-y-4">
                    {shipmentsByStatus[activeShipmentTab]?.map((shipment) => (
                      <div key={shipment.id} className="border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(activeShipmentTab).replace('text-', 'bg-').replace('bg-', 'bg-').split(' ')[0]} flex-shrink-0`}></div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm sm:text-lg text-gray-800">{shipment.description}</p>
                              <p className="text-xs sm:text-sm text-gray-500 truncate">Tracking: {shipment.trackingNumber}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                            <span className={`px-2.5 sm:px-3 py-1 text-xs rounded-full flex items-center gap-1 border ${getStatusColor(activeShipmentTab)} flex-shrink-0`}>
                              {getStatusIcon(activeShipmentTab)}
                              {activeShipmentTab}
                            </span>
                            <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs sm:text-sm">Destination</p>
                            <p className="font-medium text-sm text-gray-800 truncate">{shipment.destination}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs sm:text-sm">Value</p>
                            <p className="font-medium text-sm text-gray-800">{shipment.value}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs sm:text-sm">
                              {activeShipmentTab === 'upcoming' ? 'Scheduled Pickup' : 
                               activeShipmentTab === 'ongoing' ? 'Est. Delivery' : 'Date'}
                            </p>
                            <p className="font-medium text-sm text-gray-800">
                              {shipment.estimatedDelivery || shipment.scheduledPickup || shipment.date}
                            </p>
                          </div>
                        </div>

                        {/* Rejection Reason - Mobile Responsive */}
                        {activeShipmentTab === 'rejected' && shipment.reason && (
                          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                              <p className="text-xs sm:text-sm font-medium text-red-800">Rejection Reason</p>
                            </div>
                            <p className="text-xs sm:text-sm text-red-700 leading-relaxed">{shipment.reason}</p>
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
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-blue-900">Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {documents.map((doc) => (
                      <div key={doc.id} className={`p-6 sm:p-8 rounded-lg sm:rounded-xl border-2 ${doc.color} hover:shadow-md transition-all duration-200`}>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-base sm:text-lg text-gray-800">{doc.name}</p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Type: {doc.type}</p>
                            <p className="text-xs sm:text-sm text-gray-500">Updated: {doc.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-blue-900">Billing Information</h3>
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-6 sm:p-8 border border-gray-200">
                    <p className="text-gray-600">Billing content will be implemented here.</p>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-blue-900">Notes</h3>
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-6 sm:p-8 border border-gray-200">
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