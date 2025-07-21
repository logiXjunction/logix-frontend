import React, { useState } from 'react';
import { Truck, MapPin, Phone, Building, Users, Clock, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
    etdCities: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gstVerified, setGstVerified] = useState(false);
  const [gstVerifying, setGstVerifying] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'gstNumber') {
      // Remove all spaces
      let raw = value.replace(/\s+/g, '');
      // Limit to 15 characters
      if (raw.length > 15) raw = raw.slice(0, 15);
      // Insert a space after every 4 characters
      newValue = raw.replace(/(.{4})/g, '$1 ').trim();
    }
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleGstVerify = async () => {
    setGstVerifying(true);
    // TODO: Replace with real GST verification API call
    setTimeout(() => {
      setGstVerified(true);
      setGstVerifying(false);
      alert('GST number verified!');
    }, 1000);
  };

  const validateForm = () => {
    const newErrors = {};

    // Only these fields are compulsory
    if (!formData.customerServiceNumber) newErrors.customerServiceNumber = 'Phone number is required';
    if (!formData.companyEmail) newErrors.companyEmail = 'Company email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (!formData.gstNumber) newErrors.gstNumber = 'GST number is required';
    else if (formData.gstNumber.replace(/\s+/g, '').length !== 15) newErrors.gstNumber = 'GST number must be 15 characters';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

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
        etdCities: '',
        password: '',
        confirmPassword: ''
      });
      navigate('/vehicle-registration'); // <-- Change navigation here
    }, 2000);
  };

  return (
    <div className="pt-15 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">


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
            {/* Top Fields: Phone, Email, Password, Confirm Password, GST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="customerServiceNumber"
                  value={formData.customerServiceNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.customerServiceNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="+91 XXXXXXXXXX"
                />
                {errors.customerServiceNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.customerServiceNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.companyEmail ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="company@example.com"
                />
                {errors.companyEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyEmail}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Create Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Create password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GST Number *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.gstNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                    placeholder="GST Number"
                  />
                  <button
                    type="button"
                    onClick={handleGstVerify}
                    disabled={gstVerifying || !formData.gstNumber}
                    title={
                      !formData.gstNumber
                        ? 'Enter GST number to verify'
                        : gstVerifying
                          ? 'Verifying GST...'
                          : 'Click to verify GST'
                    }
                    className={`px-3 py-2 rounded-lg font-semibold ${gstVerified ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'} ${gstVerifying || !formData.gstNumber ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {gstVerifying ? 'Verifying...' : gstVerified ? 'Verified' : 'Verify'}
                  </button>

                </div>
                {errors.gstNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.gstNumber}</p>
                )}
              </div>
            </div>
            {/* Rest of the form (company info, owner info, fleet info, etc.) */}
            {/* Company Information */}
            <div className="space-y-6 mt-8">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.companyName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    placeholder="Enter company name"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                  )}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.companyAddress ? 'border-red-300' : 'border-gray-300'
                      }`}
                    placeholder="Enter complete company address"
                  />
                  {errors.companyAddress && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyAddress}</p>
                  )}
                </div>
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.ownerName ? 'border-red-300' : 'border-gray-300'
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.ownerContact ? 'border-red-300' : 'border-gray-300'
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.fleetSize ? 'border-red-300' : 'border-gray-300'
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.serviceType ? 'border-red-300' : 'border-gray-300'
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.serviceMode ? 'border-red-300' : 'border-gray-300'
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
                className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
