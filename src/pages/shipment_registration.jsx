import React, { useState } from 'react';
import { Upload, Package, MapPin, Calendar, Truck, Scale, Ruler } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ShipmentRegistration = () => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    materialType: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    estimatedDelivery: '',
    transportMode: '',
    shipmentType: '',
    materialValue: '',
    ebayBill: null,
    customMaterialType: ''
  });

  const materialTypes = [
    'Electronics & Technology',
    'Automotive Parts',
    'Machinery & Equipment',
    'Textiles & Clothing',
    'Food & Beverages',
    'Pharmaceuticals',
    'Chemicals',
    'Raw Materials',
    'Construction Materials',
    'Furniture & Home Goods',
    'Books & Documents',
    'Hazardous Materials',
    'Fragile Items',
    'Perishable Goods',
    'Others'
  ];

  const transportModes = [
    'Road Transport',
    'Rail Transport',
    'Air Transport',
    'Sea Transport',
    'Intermodal'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      ebayBill: file
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const formPayLoad = {
        ...formData,
        materialType : formData.materialType === 'Others'? formData.customMaterialType : formData.materialType,
      }

      const response = await axios.post('http://localhost:5000/api/get-transporters',formPayLoad);

      const suitableTransporters = response.data;

      if(suitableTransporters && suitableTransporters.transporters?.length>0){
        navigate('/available-transporters',{state:{transporters: suitableTransporters}});
      }else{
        alert("No suitable transporters found for the given shipment details. Please check your inputs and try again.");
      }      
    } catch (error){
      console.log("error while fetching transporters: ",error);
      alert ("something went wrong while submitting the shipment data!")
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Shipment Registration
            </h1>
          </div>
          <p className="text-center text-gray-600">Register your shipment with detailed information</p>
        </div>

        {/* Form */}
        <form action="submit" onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Company Header Inside Form */}
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">LogiTech Solutions</h2>
                <p className="text-gray-600">Your Trusted Logistics Partner</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                Pick Up Location *
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter pickup address"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-red-500" />
                Drop Location *
              </label>
              <input
                type="text"
                name="dropLocation"
                value={formData.dropLocation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter delivery address"
                required
              />
            </div>
          </div>

          {/* Material Type and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Package className="w-4 h-4 mr-2 text-green-600" />
                Material Type *
              </label>
              <select
                name="materialType"
                value={formData.materialType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select material type</option>
                {materialTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {formData.materialType === 'Others' && (
                <input
                  type="text"
                  name="customMaterialType"
                  value={formData.customMaterialType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mt-2"
                  placeholder="Please specify the material type"
                  required
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Scale className="w-4 h-4 mr-2 text-purple-600" />
                Weight (kg) *
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter weight in kg"
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Ruler className="w-4 h-4 mr-2 text-orange-600" />
              Dimensions (feet) *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Length (ft)"
                min="0"
                step="0.1"
                required
              />
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Width (ft)"
                min="0"
                step="0.1"
                required
              />
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Height (ft)"
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>

          {/* Delivery Date and Transport Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Estimated Delivery Date *
              </label>
              <input
                type="date"
                name="estimatedDelivery"
                value={formData.estimatedDelivery}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Truck className="w-4 h-4 mr-2 text-indigo-600" />
                Mode of Transportation
              </label>
              <select
                name="transportMode"
                value={formData.transportMode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select transport mode</option>
                {transportModes.map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>

          {/* PTL/FTL and Material Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Shipment Type *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shipmentType"
                    value="PTL"
                    checked={formData.shipmentType === 'PTL'}
                    onChange={handleInputChange}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  PTL (Part Truck Load)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shipmentType"
                    value="FTL"
                    checked={formData.shipmentType === 'FTL'}
                    onChange={handleInputChange}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  FTL (Full Truck Load)
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Value of Material (₹) *
              </label>
              <input
                type="number"
                name="materialValue"
                value={formData.materialValue}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter material value in rupees"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Upload className="w-4 h-4 mr-2 text-gray-600" />
              eBay Bill (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">
                  {formData.ebayBill ? formData.ebayBill.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PDF, JPG, PNG, DOC up to 10MB
                </p>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ShipmentRegistration;
