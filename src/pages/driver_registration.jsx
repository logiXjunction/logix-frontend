import React, { useState } from 'react';
import { User, Phone, Hash, IdCard, Image as ImageIcon, ClipboardList, Trash2 } from 'lucide-react';
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
  accept = undefined,
  inputKey = undefined
}) => {
  const baseClasses = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const errorClasses = error ? "border-red-300" : "border-gray-300";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'file' ? (
        <input
          key={inputKey}
          type="file"
          name={name}
          onChange={onChange}
          className={baseClasses}
          accept={accept}
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

const initialDriver = {
  driverName: '',
  phoneNumber: '',
  vehicleNumber: '',
  aadhaar: '',
  license: '',
  photo: null
};

export default function DriverRegistration() {
  const [driver, setDriver] = useState({ ...initialDriver });
  const [driverError, setDriverError] = useState({});
  const [drivers, setDrivers] = useState([]);
  const [listError, setListError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setDriver(prev => ({ ...prev, [name]: files ? files[0] : value }));
    if (driverError[name]) setDriverError(prev => ({ ...prev, [name]: '' }));
  };

  const validateDriver = (d) => {
    const newErrors = {};
    if (!d.driverName) newErrors.driverName = 'Driver name is required';
    if (!d.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(d.phoneNumber)) newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    if (!d.vehicleNumber) newErrors.vehicleNumber = 'Vehicle number is required';
    if (!d.aadhaar) newErrors.aadhaar = 'Aadhaar is required';
    else if (!/^\d{12}$/.test(d.aadhaar)) newErrors.aadhaar = 'Enter a valid 12-digit Aadhaar number';
    if (!d.license) newErrors.license = 'License is required';
    if (!d.photo) newErrors.photo = 'Photo is required';
    return newErrors;
  };

  const handleAddDriver = (e) => {
    e.preventDefault();
    const errors = validateDriver(driver);
    setDriverError(errors);
    if (Object.keys(errors).length > 0) return;
    setDrivers(prev => [...prev, driver]);
    setDriver({ ...initialDriver });
    setDriverError({});
    setListError('');
    setFileInputKey(Date.now());
  };

  const handleRemoveDriver = (idx) => {
    setDrivers(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (drivers.length === 0) {
      setListError('Please add at least one driver before submitting.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Driver(s) registered successfully!');
      setIsSubmitting(false);
      setDrivers([]);
      setDriver({ ...initialDriver });
      setDriverError({});
      setListError('');
      setFileInputKey(Date.now());
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center space-x-3 mb-2">
              <User className="h-8 w-8 text-white" />
              <h2 className="text-2xl font-bold text-white">
                Driver Registration
              </h2>
            </div>
            <p className="text-blue-100">
              Register your drivers to enable logistics operations
            </p>
          </div>

          {/* Single Driver Form */}
          <form className="p-8 space-y-8" onSubmit={handleAddDriver}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Driver Name"
                name="driverName"
                value={driver.driverName}
                onChange={handleInputChange}
                error={driverError.driverName}
                placeholder="Enter driver name"
                required
              />
              <InputField
                label="Phone Number"
                name="phoneNumber"
                value={driver.phoneNumber}
                onChange={handleInputChange}
                error={driverError.phoneNumber}
                placeholder="Enter 10-digit phone number"
                required
              />
              <InputField
                label="Vehicle Number"
                name="vehicleNumber"
                value={driver.vehicleNumber}
                onChange={handleInputChange}
                error={driverError.vehicleNumber}
                placeholder="e.g. MH12AB1234"
                required
              />
              <InputField
                label="Aadhaar"
                name="aadhaar"
                value={driver.aadhaar}
                onChange={handleInputChange}
                error={driverError.aadhaar}
                placeholder="Enter 12-digit Aadhaar number"
                required
              />
              <InputField
                label="License"
                name="license"
                value={driver.license}
                onChange={handleInputChange}
                error={driverError.license}
                placeholder="Enter license number"
                required
              />
              <InputField
                label="Photo"
                name="photo"
                type="file"
                onChange={handleInputChange}
                error={driverError.photo}
                accept="image/*"
                required
                inputKey={fileInputKey + '-photo'}
              />
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 transition-all duration-200"
              >
                + Add Driver
              </button>
            </div>
          </form>

          {/* List of Added Drivers */}
          <div className="px-8 pb-8">
            {drivers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><ClipboardList className="inline-block" /> Added Drivers</h3>
                <ul className="divide-y divide-gray-200">
                  {drivers.map((d, idx) => (
                    <li key={idx} className="py-2 flex items-center justify-between">
                      <div>
                        <span className="font-medium">{d.driverName}</span> - {d.phoneNumber} ({d.vehicleNumber})
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveDriver(idx)}
                        className="text-red-600 hover:text-red-800 ml-4"
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
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-full"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2 justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 justify-center">
                    <User className="h-5 w-5" />
                    <span>Submit Registration</span>
                  </div>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/transporter-dashboard')}
                className="bg-gray-100 text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 w-full border border-blue-200"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
