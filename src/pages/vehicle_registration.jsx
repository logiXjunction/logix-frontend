import React, { useState } from 'react';
import { Package, Truck, FileText, Hash, Ruler, Layers, ClipboardList, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Reusable Input Component
const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  rows = null,
  options = null,
  accept = undefined,
  multiple = false,
  inputKey = undefined
}) => {
  const baseClasses = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const errorClasses = error ? "border-red-300" : "border-gray-300";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseClasses} ${errorClasses}`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'file' ? (
        <input
          key={inputKey}
          type="file"
          name={name}
          onChange={onChange}
          className={baseClasses}
          accept={accept}
          multiple={multiple}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseClasses} ${errorClasses}`}
          placeholder={placeholder}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

const initialVehicle = {
  vehicleName: '',
  dimensions: '',
  capacity: '',
  vehicleType: '',
  vehicleNumber: '',
  rc: null,
  roadPermit: null,
  pollution: null,
  enclosureType: '',
  refrigerationStatus: ''
};

const vehicleTypeOptions = [
  { value: 'truck', label: 'Truck' },
  { value: 'trailer', label: 'Trailer' },
  { value: 'container', label: 'Container' },
  { value: 'tanker', label: 'Tanker' },
  { value: 'other', label: 'Other' }
];

const enclosureOptions = [
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' }
];

const refrigerationOptions = [
  { value: 'available', label: 'Refrigeration Available' },
  { value: 'not-available', label: 'Not Available' }
];

export default function VehicleRegistration() {
  const [vehicle, setVehicle] = useState({ ...initialVehicle });
  const [vehicleError, setVehicleError] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [listError, setListError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setVehicle(prev => ({ ...prev, [name]: files ? files[0] : value }));
    if (vehicleError[name]) setVehicleError(prev => ({ ...prev, [name]: '' }));
  };

  const validateVehicle = (v) => {
    const newErrors = {};
    if (!v.vehicleName) newErrors.vehicleName = 'Vehicle name is required';
    if (!v.dimensions) newErrors.dimensions = 'Dimensions are required';
    if (!v.capacity) newErrors.capacity = 'Capacity is required';
    if (!v.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
    if (!v.vehicleNumber) newErrors.vehicleNumber = 'Vehicle number is required';
    if (!v.rc) newErrors.rc = 'RC upload is required';
    if (!v.roadPermit) newErrors.roadPermit = 'Road permit upload is required';
    if (!v.pollution) newErrors.pollution = 'Pollution certificate upload is required';
    if (!v.enclosureType) newErrors.enclosureType = 'Please select open or closed';
    if (!v.refrigerationStatus) newErrors.refrigerationStatus = 'Please select refrigeration status';
    return newErrors;
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const errors = validateVehicle(vehicle);
    setVehicleError(errors);
    if (Object.keys(errors).length > 0) return;
    setVehicles(prev => [...prev, vehicle]);
    setVehicle({ ...initialVehicle });
    setVehicleError({});
    setListError('');
    setFileInputKey(Date.now());
  };

  const handleRemoveVehicle = (idx) => {
    setVehicles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (vehicles.length === 0) {
      setListError('Please add at least one vehicle before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      for (const v of vehicles) {
        const formData = new FormData();
        formData.append('vehicleName', v.vehicleName);
        formData.append('dimensions', v.dimensions);
        formData.append('capacity', v.capacity);
        formData.append('vehicleType', v.vehicleType);
        formData.append('vehicleNumber', v.vehicleNumber);
        if (v.chassisNumber) formData.append('chassisNumber', v.chassisNumber);
        formData.append('enclosureType', v.enclosureType);
        formData.append('refrigerationStatus', v.refrigerationStatus);
        formData.append('rc', v.rc);
        formData.append('roadPermit', v.roadPermit);
        formData.append('pollution', v.pollution);

        const response = await fetch('https://logix-backend.onrender.com/api/vehicle/register', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const resText = await response.text();
          throw new Error(`Failed to register vehicle ${v.vehicleNumber} — ${resText}`);
        }
      }

      alert('Vehicle(s) registered successfully!');
      setVehicles([]);
      setVehicle({ ...initialVehicle });
      setVehicleError({});
      setListError('');
      setFileInputKey(Date.now());
    } catch (error) {
      console.error('Vehicle registration error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center space-x-3 mb-2">
              <Truck className="h-8 w-8 text-white" />
              <h2 className="text-2xl font-bold text-white">
                Vehicle Registration
              </h2>
            </div>
            <p className="text-blue-100">
              Register your vehicles to enable logistics operations
            </p>
            {/* Skip Button - Top Right */}
            <button
              type="button"
              onClick={() => navigate('/driver-registration')}
              className="absolute top-4 right-4 px-5 py-2 bg-transparent border border-blue-100 text-blue-100 text-sm font-semibold rounded-full hover:bg-white hover:text-blue-700 hover:border-blue-400 shadow-sm transition duration-150 ease-in-out z-10"
            >
              Skip
            </button>
          </div>

          <form className="p-8 space-y-8" onSubmit={handleAddVehicle}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Vehicle Name"
                name="vehicleName"
                value={vehicle.vehicleName}
                onChange={handleInputChange}
                error={vehicleError.vehicleName}
                placeholder="Enter vehicle name"
                required
              />
              <InputField
                label="Dimensions"
                name="dimensions"
                value={vehicle.dimensions}
                onChange={handleInputChange}
                error={vehicleError.dimensions}
                placeholder="e.g. 20ft x 8ft x 8ft"
                required
              />
              <InputField
                label="Capacity"
                name="capacity"
                value={vehicle.capacity}
                onChange={handleInputChange}
                error={vehicleError.capacity}
                placeholder="e.g. 10 Tons"
                required
              />
              <InputField
                label="Vehicle Type"
                name="vehicleType"
                type="select"
                value={vehicle.vehicleType}
                onChange={handleInputChange}
                error={vehicleError.vehicleType}
                options={vehicleTypeOptions}
                required
              />
              <InputField
                label="Open or Closed Vehicle"
                name="enclosureType"
                type="select"
                value={vehicle.enclosureType}
                onChange={handleInputChange}
                error={vehicleError.enclosureType}
                options={enclosureOptions}
                required
              />
              <InputField
                label="Refrigeration Status"
                name="refrigerationStatus"
                type="select"
                value={vehicle.refrigerationStatus}
                onChange={handleInputChange}
                error={vehicleError.refrigerationStatus}
                options={refrigerationOptions}
                required
              />
              <InputField
                label="Vehicle Number"
                name="vehicleNumber"
                value={vehicle.vehicleNumber}
                onChange={handleInputChange}
                error={vehicleError.vehicleNumber}
                placeholder="e.g. MH12AB1234"
                required
              />
              <InputField
                label="Chassis Number"
                name="chassisNumber"
                value={vehicle.chassisNumber}
                onChange={handleInputChange}
                placeholder="Enter chassis number"
              />
              <InputField
                label="RC Upload"
                name="rc"
                type="file"
                onChange={handleInputChange}
                error={vehicleError.rc}
                accept="application/pdf,image/*"
                required
                inputKey={fileInputKey + '-rc'}
              />
              <InputField
                label="Road Permit Upload"
                name="roadPermit"
                type="file"
                onChange={handleInputChange}
                error={vehicleError.roadPermit}
                accept="application/pdf,image/*"
                required
                inputKey={fileInputKey + '-roadPermit'}
              />
              <InputField
                label="Pollution Certificate Upload"
                name="pollution"
                type="file"
                onChange={handleInputChange}
                error={vehicleError.pollution}
                accept="application/pdf,image/*"
                required
                inputKey={fileInputKey + '-pollution'}
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="cursor-pointer bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 transition-all duration-200"
              >
                + Add Vehicle
              </button>
            </div>
          </form>

          <div className="px-8 pb-8">
            {vehicles.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <ClipboardList className="inline-block" /> Added Vehicles
                </h3>
                <ul className="divide-y divide-gray-200">
                  {vehicles.map((v, idx) => (
                    <li key={idx} className="py-2 flex items-center justify-between">
                      <div>
                        <span className="font-medium">{v.vehicleName}</span> - {v.vehicleNumber} ({v.vehicleType})
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveVehicle(idx)}
                        className="cursor-pointer text-red-600 hover:text-red-800 ml-4"
                        title="Remove"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {listError && <p className="text-red-600 mb-2">{listError}</p>}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-full"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2 justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 justify-center">
                    <Truck className="h-5 w-5" />
                    <span>Submit Registration</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
