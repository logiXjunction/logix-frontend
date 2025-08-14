import React, { useState } from 'react';
import { ArrowLeft, Edit3, Plus, Calendar, User, Phone, Mail, MapPin, Shield, FileText, Package, Clock, CheckCircle, XCircle, AlertCircle, MoreHorizontal, Send, Eye, MessageCircle, Truck, PackageCheck, PackageX, Timer, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
  const [activePage, setActivePage] = useState('Overview');
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
    applied: [
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
      size: "2.4 MB"
    },
    {
      id: 2,
      name: "Insurance certificate",
      type: "PDF", 
      date: "10 Jul, 2024",
      size: "1.8 MB"
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
      case 'completed': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'ongoing': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'rejected': return 'text-red-700 bg-red-50 border-red-200';
      case 'applied': return 'text-amber-700 bg-amber-50 border-amber-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'ongoing': return <Truck className="w-3.5 h-3.5" />;
      case 'rejected': return <XCircle className="w-3.5 h-3.5" />;
      case 'applied': return <Clock className="w-3.5 h-3.5" />;
      default: return <Package className="w-3.5 h-3.5" />;
    }
  };

  const getShipmentTabColor = (tab) => {
    const colors = {
      completed: activeShipmentTab === tab ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50',
      ongoing: activeShipmentTab === tab ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50',
      rejected: activeShipmentTab === tab ? 'bg-red-600 text-white border-red-600' : 'bg-white text-red-700 border-red-200 hover:bg-red-50',
      applied: activeShipmentTab === tab ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50'
    };
    return colors[tab] || 'bg-white text-slate-700 border-slate-200';
  };

  // Navigation items
  const navItems = [
    { name: 'Overview', icon: <Package className="w-4 h-4" /> },
    { name: 'Shipments', icon: <Truck className="w-4 h-4" /> },
    { name: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { name: 'Billing', icon: <MoreHorizontal className="w-4 h-4" /> },
    { name: 'Notes', icon: <Edit3 className="w-4 h-4" /> }
  ];

  const shipmentTabs = [
    { id: 'ongoing', label: 'Ongoing', count: shipmentsByStatus.ongoing.length },
    { id: 'completed', label: 'Completed', count: shipmentsByStatus.completed.length },
    { id: 'applied', label: 'Applied', count: shipmentsByStatus.applied.length },
    { id: 'rejected', label: 'Rejected', count: shipmentsByStatus.rejected.length }
  ];

  const handleNavClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  // Page Components
  const OverviewPage = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {shipmentTabs.map((tab) => (
          <div key={tab.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-sm transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 capitalize">{tab.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{tab.count}</p>
              </div>
              <div className={`p-3 rounded-xl ${getStatusColor(tab.id)}`}>
                {getStatusIcon(tab.id)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Shipments */}
      <div className="bg-white rounded-2xl border border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Latest Shipments</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              View all
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {Object.values(shipmentsByStatus).flat().slice(0, 4).map((shipment, index) => (
            <div key={shipment.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all duration-200">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900 truncate">{shipment.description}</p>
                  <p className="text-sm text-slate-500 truncate">{shipment.trackingNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(shipment.status || 'ongoing')}`}>
                  {shipment.status || 'ongoing'}
                </span>
                <span className="text-slate-500 whitespace-nowrap">{shipment.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Documents Required */}
        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900">Documents Required</h3>
          </div>
          <div className="p-6 space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all duration-200">
                <div className="p-2 rounded-lg bg-blue-50">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 truncate">{doc.name}</p>
                  <p className="text-sm text-slate-500">Updated {doc.date}</p>
                </div>
                <span className="text-xs text-slate-500 px-2 py-1 bg-slate-50 rounded-md">{doc.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Activity */}
        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
          </div>
          <div className="p-6 space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 flex-shrink-0">
                  {activity.type === 'update' && <Package className="w-4 h-4 text-slate-600" />}
                  {activity.type === 'document' && <FileText className="w-4 h-4 text-slate-600" />}
                  {activity.type === 'schedule' && <Calendar className="w-4 h-4 text-slate-600" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-800 leading-relaxed">
                    <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                    <span className="font-medium text-blue-600">{activity.item}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ShipmentsPage = () => (
    <div className="space-y-6">
      {/* Shipment Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {shipmentTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveShipmentTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap border ${getShipmentTabColor(tab.id)}`}
          >
            {getStatusIcon(tab.id)}
            <span>{tab.label}</span>
            <span className="ml-1 px-2 py-0.5 text-xs bg-black bg-opacity-10 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Shipment Cards */}
      <div className="space-y-4">
        {shipmentsByStatus[activeShipmentTab]?.map((shipment) => (
          <div key={shipment.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(activeShipmentTab).includes('emerald') ? 'bg-emerald-500' : 
                  getStatusColor(activeShipmentTab).includes('blue') ? 'bg-blue-500' : 
                  getStatusColor(activeShipmentTab).includes('red') ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">{shipment.description}</p>
                  <p className="text-sm text-slate-500 truncate">Tracking: {shipment.trackingNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(activeShipmentTab)}`}>
                  {activeShipmentTab}
                </span>
                <MoreHorizontal className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600" />
              </div>
            </div>
            
            <div className="flex flex-col mx-5 md:mx-0 md:flex-row justify-between md:items-center gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Destination</p>
                <p className="font-medium text-slate-900 mt-1 truncate">{shipment.destination}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Value</p>
                <p className="font-medium text-slate-900 mt-1">{shipment.value}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  {activeShipmentTab === 'applied' ? 'Scheduled Pickup' : 
                   activeShipmentTab === 'ongoing' ? 'Est. Delivery' : 'Date'}
                </p>
                <p className="font-medium text-slate-900 mt-1">
                  {shipment.estimatedDelivery || shipment.scheduledPickup || shipment.date}
                </p>
              </div>
              {activeShipmentTab==='applied' && 
              <Link to="/available-transporter">
                <button className='bg-lxj-alert cursor-pointer text-white py-2 px-3 rounded-xl'>View Biddings</button>
                </Link>}
            </div>

            {/* Rejection Reason */}
            {activeShipmentTab === 'rejected' && shipment.reason && (
              <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm font-medium text-red-800">Rejection Reason</p>
                </div>
                <p className="text-sm text-red-700 leading-relaxed">{shipment.reason}</p>
                <button className="mt-3 text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  View detailed feedback
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const DocumentsPage = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 mb-1">{doc.name}</p>
                <p className="text-sm text-slate-500 mb-2">Type: {doc.type}</p>
                <p className="text-sm text-slate-500">Updated: {doc.date}</p>
                <p className="text-xs text-slate-400 mt-1">{doc.size}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PlaceholderPage = ({ title }) => (
    <div className="bg-white rounded-2xl border border-slate-200 p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600">{title} content will be implemented here.</p>
    </div>
  );

  const Sidebar = () => (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen w-80 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col z-40
                       transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 
                       ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 z-10"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {/* Client Avatar and Info */}
        <div className="p-8 bg-[#EEE8A9] border-b border-slate-200">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden border-4 border-white shadow-sm">
              <img 
                src={clientData.avatar} 
                alt={clientData.name}
                className="w-full h-full object-cover bg-slate-200"
              />
            </div>
            <h1 className="text-xl font-bold text-slate-900">{clientData.name}</h1>
            <p className="text-sm text-slate-600 mt-1">{clientData.company}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {navItems.map(item => (
              <button 
                key={item.name} 
                onClick={() => handleNavClick(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  activePage === item.name 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Client Details Section */}
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <h4 className="text-sm font-semibold text-slate-900 mb-4">Client Details</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="truncate">{clientData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{clientData.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{clientData.dateOfBirth}</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{clientData.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Shield className="w-4 h-4 text-slate-400" />
              <span>Insurance: {clientData.insurance}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const DashboardHeader = () => (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-600 p-2 rounded-xl hover:bg-slate-100">
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Client Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">Manage your shipments and documents</p>
        </div>
      </div>
      <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md">
        <Send className="w-4 h-4" />
        <span className="hidden sm:inline">Request Shipment</span>
        <span className="sm:hidden">Request</span>
      </button>
    </div>
  );

  const renderContent = () => {
    switch (activePage) {
      case 'Overview': return <OverviewPage />;
      case 'Shipments': return <ShipmentsPage />;
      case 'Documents': return <DocumentsPage />;
      case 'Billing': return <PlaceholderPage title="Billing Information" />;
      case 'Notes': return <PlaceholderPage title="Notes" />;
      default: return <OverviewPage />;
    }
  };

  return (
    <div className="mt-18 relative md:flex bg-slate-50 font-sans min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        <DashboardHeader />
        {renderContent()}
      </main>
    </div>
  );
};

export default ClientDashboard;
