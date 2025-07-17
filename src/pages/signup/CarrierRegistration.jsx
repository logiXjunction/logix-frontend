import React, { useState } from 'react';
import { Truck, MapPin, Phone, Building, Users, Clock, Package } from 'lucide-react';
import logo from '../../../images/logo.jpeg'; // Adjust the path as necessary

export default function CarrierSignup() {
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    customerServiceNumber: '',
    gstNumber: '',
    cinNumber: '',
    ownerName: '',
    ownerContact: '',
    fleetSize: '',
    serviceType: '',
    pincode: '',
    districtRate: '',
    serviceMode: '',
    etdCities: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.companyAddress) newErrors.companyAddress = 'Company address is required';
    if (!formData.companyEmail) newErrors.companyEmail = 'Company email is required';
    if (!formData.customerServiceNumber) newErrors.customerServiceNumber = 'Customer service number is required';
    if (!formData.gstNumber) newErrors.gstNumber = 'GST number is required';
    if (!formData.ownerName) newErrors.ownerName = 'Owner name is required';
    if (!formData.ownerContact) newErrors.ownerContact = 'Owner contact is required';
    if (!formData.fleetSize) newErrors.fleetSize = 'Fleet size is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.serviceMode) newErrors.serviceMode = 'Service mode is required';
    
    if (formData.companyEmail && !/\S+@\S+\.\S+/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Carrier registration submitted successfully! We will review your application and get back to you within 24-48 hours.');
      setIsSubmitting(false);
      // Reset form
      setFormData({
        companyName: '',
        companyAddress: '',
        companyEmail: '',
        customerServiceNumber: '',
        gstNumber: '',
        cinNumber: '',
        ownerName: '',
        ownerContact: '',
        fleetSize: '',
        serviceType: '',
        pincode: '',
        districtRate: '',
        serviceMode: '',
        etdCities: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Join Our Carrier Network
            </h2>
            <p className="text-blue-100">
              Partner with LogixJunction to expand your logistics business across India
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8 space-y-8">
            {/* Company Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <Building className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.companyName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter company name"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Email *
                  </label>
                  <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.companyEmail ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="company@example.com"
                  />
                  {errors.companyEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyEmail}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Address *
                </label>
                <textarea
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.companyAddress ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter complete company address"
                />
                {errors.companyAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyAddress}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Service Number *
                  </label>
                  <input
                    type="tel"
                    name="customerServiceNumber"
                    value={formData.customerServiceNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.customerServiceNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="+91 XXXXXXXXXX"
                  />
                  {errors.customerServiceNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.customerServiceNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Number *
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.gstNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="GST Number"
                  />
                  {errors.gstNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.gstNumber}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CIN Number (If Pvt Ltd)
                </label>
                <input
                  type="text"
                  name="cinNumber"
                  value={formData.cinNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Corporate Identity Number"
                />
              </div>
            </div>

            {/* Owner Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Owner Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.ownerName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter owner name"
                  />
                  {errors.ownerName && (
                    <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="ownerContact"
                    value={formData.ownerContact}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.ownerContact ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="+91 XXXXXXXXXX"
                  />
                  {errors.ownerContact && (
                    <p className="mt-1 text-sm text-red-600">{errors.ownerContact}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Fleet & Service Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <Package className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Fleet & Service Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Fleet *
                  </label>
                  <input
                    type="number"
                    name="fleetSize"
                    value={formData.fleetSize}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.fleetSize ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Number of vehicles"
                  />
                  {errors.fleetSize && (
                    <p className="mt-1 text-sm text-red-600">{errors.fleetSize}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Coverage *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.serviceType ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select service coverage</option>
                    <option value="district">District Cities Service</option>
                    <option value="all-india">All India Service</option>
                  </select>
                  {errors.serviceType && (
                    <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Mode *
                  </label>
                  <select
                    name="serviceMode"
                    value={formData.serviceMode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.serviceMode ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select service mode</option>
                    <option value="godown-to-godown">Godown to Godown</option>
                    <option value="door-to-door">Door to Door</option>
                    <option value="both">Both</option>
                  </select>
                  {errors.serviceMode && (
                    <p className="mt-1 text-sm text-red-600">{errors.serviceMode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Service Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter pincode"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate for District Cities Service (₹/kg)
                </label>
                <input
                  type="number"
                  name="districtRate"
                  value={formData.districtRate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Rate per kg"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cities Wise ETD (Estimated Time of Delivery)
                </label>
                <textarea
                  name="etdCities"
                  value={formData.etdCities}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Example: Mumbai - 2 days, Delhi - 3 days, Bangalore - 4 days"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Register as Carrier</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>Already have an account? <a href="#" className="text-blue-600 hover:underline">Sign in here</a></p>
          <p className="mt-2 text-sm">Need help? Contact us at <a href="mailto:support@logixjunction.com" className="text-blue-600 hover:underline">support@logixjunction.com</a></p>
        </div>
      </div>
    </div>
  );
}