import React, { useState } from 'react';
import { Upload, Package, MapPin, Calendar, Truck, Scale, Ruler, User, Phone, FileSignature } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Add Name, Phone Number, GST Number

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName:'',
    phone: '',
    gst: '',
    pickupLocation: '',
    pickupAddressLine1: '',
    pickupAddressLine2: '',
    pickupPincode: '',
    dropLocation: '',
    dropAddressLine1: '',
    dropAddressLine2: '',
    dropPincode: '',
    materialType: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    expectedPickup: '',
    expectedDelivery: '',
    transportMode: '',
    shipmentType: '',
    materialValue: '',
    ebayBill: null,
    customMaterialType: '',
    coolingType: '',
    truckSize: '',
    manpower: ''
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

  const coolingType = [
    'Non-Refrigerated ',
    'Refrigerated Ambient temperature',
    'Refrigerated Frozen temprature',
    'Refrigerated Chiller'
  ]

  const truckSize = ['14 ft','17 ft','19 ft', '20 ft','22 ft', '24 ft', '32 ft', '40 ft']

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For phone field: allow only digits and limit to 10
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
      return;
    }

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

  const API_BASE = 'http://localhost:3000';
  //PUT THE CORRECT URL FOR BACKEND ABOVE!



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Basic client-side validation for required fields (optional, since inputs use required)
      if (!formData.pickupLocation || !formData.dropLocation) {
        alert('Please fill pickup and drop locations.');
        return;
      }

      // Compose request body according to OpenAPI schema
      const body = {
        pickupLocation: formData.pickupLocation,
        dropLocation: formData.dropLocation,
        materialType:
          formData.materialType === 'Others'
            ? formData.customMaterialType || 'Others'
            : formData.materialType,
        // coolingType is required by the API spec. Defaulting to 'none' until the form is updated.
        coolingType: 'none',
        weightKg: Number(formData.weight || 0),
        lengthFt: Number(formData.length || 0),
        widthFt: Number(formData.width || 0),
        heightFt: Number(formData.height || 0),
        // Convert date (yyyy-mm-dd) to ISO. If you want a specific time, modify this.
        estimatedDeliveryDate: formData.estimatedDelivery
          ? new Date(formData.estimatedDelivery)
          : null,
        valueInr: Number(formData.materialValue || 0),
        shipmentType: formData.shipmentType
      };

      // remove null/undefined fields if any
      Object.keys(body).forEach((k) => {
        if (body[k] === null || body[k] === '') delete body[k];
      });

      // get token (update this if your app stores tokens elsewhere)
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      };

      // call backend create shipment endpoint
      const res = await axios.post(`${API_BASE}/api/shipment/create`, body, { headers });

      // axios resolves for 2xx only; check status
      if (res.status === 201 || res.status === 200) {
        const responseData = res.data;
        // Success: API returns { success: true, data: {...} }
        alert(responseData?.message || 'Shipment created successfully.');

        // Navigate and pass the created shipment to next page if desired.
        // I kept your previous navigation target (/available-transporters) so you can show transporters for this shipment.
        // Adjust as needed (maybe navigate to '/shipments' or '/shipment/:id').
        navigate('/available-transporters', { state: { shipment: responseData?.data } });
        return;
      }

      // fallback - unexpected 2xx
      alert('Shipment request returned unexpected status: ' + res.status);
    } catch (err) {
      // Axios error handling
      if (err.response) {
        // Server responded with a status outside 2xx
        const status = err.response.status;
        const data = err.response.data;
        if (status === 400) {
          alert(data?.message || 'Validation error: missing or invalid fields.');
          // if backend returns detailed errors, you could set them in state here:
          // setErrors(data.errors)
        } else if (status === 401) {
          alert(data?.message || 'Unauthorized. Please login again.');
          // Optional: logout and redirect to login
          // logout(); navigate('/login');
        } else {
          alert(data?.message || `Server error (status ${status}). Try again later.`);
        }
      } else if (err.request) {
        // Request made but no response (network / CORS)
        console.error('No response from server:', err.request);
        alert('No response from server. Check backend is running and CORS is configured.');
      } else {
        // Something else
        console.error('Error while submitting:', err.message);
        alert('Error while submitting: ' + err.message);
      }
    }
  };


  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-lxj-accent/20 to-lxj-alert/20 p-4">
      <div className="max-w-4xl mx-auto">


        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Request Shipment</h2>
                  <p className="text-gray-600">Fill in the details to issue a request</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-white " />
                </div>
              </div>
            </div>

            {/* Name, Phone, GST Fields */}


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">

                <label className="text-sm font-medium text-gray-700 flex items-center"><User className='w-4 h-4 mr-2 text-blue-600' />Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">

                <label className="text-sm font-medium text-gray-700 flex items-center"><User className='w-4 h-4 mr-2 text-blue-600' />Company Name </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter Company Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center"><Phone className='w-4 h-4 mr-2 text-blue-600' />Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center"><FileSignature className='w-4 h-4 mr-2 text-blue-600' />GST Number</label>
                <input
                  type="text"
                  name="gst"
                  value={formData.gst}
                  onChange={handleInputChange}
                  placeholder="Enter GST number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>


            {/* Pickup and Drop Location Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Address */}
              <div className="space-y-4">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Pick Up Location *
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  placeholder="General area or landmark"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="pickupAddressLine1"
                  value={formData.pickupAddressLine1}
                  onChange={handleInputChange}
                  placeholder="Building no, street"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="pickupAddressLine2"
                  value={formData.pickupAddressLine2}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="pickupPincode"
                  value={formData.pickupPincode}
                  onChange={handleInputChange}
                  placeholder="Pincode"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              {/* Drop Address */}
              <div className="space-y-4">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  Drop Location *
                </label>
                <input
                  type="text"
                  name="dropLocation"
                  value={formData.dropLocation}
                  onChange={handleInputChange}
                  placeholder="General area or landmark"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="dropAddressLine1"
                  value={formData.dropAddressLine1}
                  onChange={handleInputChange}
                  placeholder="Building no, street"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="dropAddressLine2"
                  value={formData.dropAddressLine2}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="dropPincode"
                  value={formData.dropPincode}
                  onChange={handleInputChange}
                  placeholder="Pincode"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
                Dimensions (feet)
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
                />
              </div>
            </div>

            {/* Delivery Date and Transport Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  Expected Pickup Date *
                </label>
                <input
                  type="date"
                  name="expectedPickup"
                  value={formData.expectedPickup}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  Expected Delivery Date *
                </label>
                <input
                  type="date"
                  name="expectedDelivery"
                  value={formData.expectedDelivery}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

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

              {/* Manpower */}

              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">
                  Manpower required for loading/unloading
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center text-lg">
                    <input
                      type="radio"
                      name="manpower"
                      value="yes"
                      checked={formData.manpower === 'yes'}
                      onChange={handleInputChange}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    Yes
                  </label>
                  <label className="flex items-center text-lg">
                    <input
                      type="radio"
                      name="manpower"
                      value="no"
                      checked={formData.manpower === 'no'}
                      onChange={handleInputChange}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    No
                  </label>
                </div>
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



              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Truck className="w-4 h-4 mr-2 text-red-600" />
                  Cooling
                </label>
                <select
                  name="coolingType"
                  value={formData.coolingType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Refrigeration Status</option>
                  {coolingType.map((mode) => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>

              {/* Dynamically render Truck size */}

              {formData.transportMode === 'Road Transport' && <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Truck className="w-4 h-4 mr-2 text-indigo-600" />
                  Truck Size
                </label>
                <select
                  name="truckSize"
                  value={formData.truckSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select truck size</option>
                  {truckSize.map((mode) => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>}

              {/* PTL/FTL and Material Value */}

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
                className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-105"
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

export default InquiryForm;

