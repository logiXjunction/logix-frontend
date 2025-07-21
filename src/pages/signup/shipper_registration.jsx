import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { Package, Building, Users, User, Phone, Mail, MapPin } from 'lucide-react';

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
  options = null
}) => {
  const baseClasses = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const errorClasses = error ? "border-red-300" : "border-gray-300";
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows || 3}
          className={`${baseClasses} ${errorClasses}`}
          placeholder={placeholder}
        />
      ) : type === 'select' ? (
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

// Reusable Section Component
const FormSection = ({ icon: Icon, title, children }) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-3 mb-4">
      <Icon className="h-5 w-5 text-blue-600" />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

// Main Shipper Signup Component
export default function ShipperSignup() {
  const [formData, setFormData] = useState({
    companyName: '',
    companyGst: '',
    companyEmail: '',
    companyAddress: '',
    pocName: '',
    pocDesignation: '',
    pocContact: '',
    ownerName: '',
    ownerContact: '',
    password: '',
    confirmPassword: ''
  });
  const [gstVerified, setGstVerified] = useState(false);
  const [gstVerifying, setGstVerifying] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Add this line

  // Form configuration for scalability
  const formConfig = {
    companyInfo: {
      title: 'Company Information',
      icon: Building,
      fields: [
        {
          name: 'companyName',
          label: 'Company Name',
          type: 'text',
          placeholder: 'Enter company name',
          required: true,
          gridCols: 'md:col-span-2'
        },
        {
          name: 'companyGst',
          label: 'Company GST',
          type: 'text',
          placeholder: 'GST Number',
          required: true,
          gridCols: 'md:col-span-1'
        },
        {
          name: 'companyEmail',
          label: 'Company Email',
          type: 'email',
          placeholder: 'company@example.com',
          required: true,
          gridCols: 'md:col-span-1'
        },
        {
          name: 'companyAddress',
          label: 'Company Address',
          type: 'textarea',
          placeholder: 'Enter complete company address',
          required: true,
          gridCols: 'md:col-span-2',
          rows: 3
        }
      ]
    },
    pocInfo: {
      title: 'Point of Contact Information',
      icon: User,
      fields: [
        {
          name: 'pocName',
          label: 'POC Name',
          type: 'text',
          placeholder: 'Enter POC name',
          required: true,
          gridCols: 'md:col-span-1'
        },
        {
          name: 'pocDesignation',
          label: 'POC Designation',
          type: 'text',
          placeholder: 'Enter designation',
          required: true,
          gridCols: 'md:col-span-1'
        },
        {
          name: 'pocContact',
          label: 'POC Contact Number',
          type: 'tel',
          placeholder: '+91 XXXXXXXXXX',
          required: true,
          gridCols: 'md:col-span-1'
        }
      ]
    },
    ownerInfo: {
      title: 'Owner Information',
      icon: Users,
      fields: [
        {
          name: 'ownerName',
          label: 'Owner Name',
          type: 'text',
          placeholder: 'Enter owner name',
          required: true,
          gridCols: 'md:col-span-1'
        },
        {
          name: 'ownerContact',
          label: 'Owner Contact Number',
          type: 'tel',
          placeholder: '+91 XXXXXXXXXX',
          required: true,
          gridCols: 'md:col-span-1'
        }
      ]
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'companyGst') {
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
    
    // Get all required fields from config
    const requiredFields = [];
    Object.values(formConfig).forEach(section => {
      section.fields.forEach(field => {
        if (field.required) {
          requiredFields.push({
            name: field.name,
            label: field.label,
            type: field.type
          });
        }
      });
    });

    // Validate required fields
    requiredFields.forEach(field => {
      if (!formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    
    // Email validation
    if (formData.companyEmail && !/\S+@\S+\.\S+/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid email address';
    }
    
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.companyGst) newErrors.companyGst = 'GST number is required';
    else if (formData.companyGst.replace(/\s+/g, '').length !== 15) newErrors.companyGst = 'GST number must be 15 characters';
    if (!gstVerified) newErrors.companyGst = 'GST number must be verified';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Shipper registration submitted successfully! We will review your application and get back to you within 24-48 hours.');
      setIsSubmitting(false);
      // Reset form
      setFormData({
        companyName: '',
        companyGst: '',
        companyEmail: '',
        companyAddress: '',
        pocName: '',
        pocDesignation: '',
        pocContact: '',
        ownerName: '',
        ownerContact: '',
        password: '',
        confirmPassword: ''
      });
      navigate('/client-dashboard'); // Navigate to client dashboard
    }, 2000);
  };

  // Render top fields first: Phone, Email, Password, Confirm Password, GST
  const renderTopFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <InputField
          label="Phone Number"
          name="pocContact"
          type="tel"
          value={formData.pocContact}
          onChange={handleInputChange}
          error={errors.pocContact}
          placeholder="+91 XXXXXXXXXX"
          required
        />
      </div>
      <div>
        <InputField
          label="Email"
          name="companyEmail"
          type="email"
          value={formData.companyEmail}
          onChange={handleInputChange}
          error={errors.companyEmail}
          placeholder="company@example.com"
          required
        />
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
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.password ? 'border-red-300' : 'border-gray-300'
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
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
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
            name="companyGst"
            value={formData.companyGst}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.companyGst ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="GST Number"
          />
          <button
  type="button"
  onClick={handleGstVerify}
  disabled={gstVerifying || !formData.companyGst}
  className={`px-3 py-2 rounded-lg font-semibold
    ${gstVerified ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}
    ${gstVerifying || !formData.companyGst ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `}
  title={
    !formData.companyGst
      ? 'Enter GST number to verify'
      : gstVerifying
      ? 'Verifying GST...'
      : 'Click to verify GST'
  }
>
  {gstVerifying ? 'Verifying...' : gstVerified ? 'Verified' : 'Verify'}
</button>

        </div>
        {errors.companyGst && (
          <p className="mt-1 text-sm text-red-600">{errors.companyGst}</p>
        )}
      </div>
    </div>
  );

  const renderFormSection = (sectionKey, section) => (
    <FormSection key={sectionKey} icon={section.icon} title={section.title}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.fields.map((field) => {
          if (field.name === 'companyGst') {
            return (
              <div key={field.name} className={field.gridCols || 'md:col-span-1'}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="companyGst"
                    value={formData.companyGst}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.companyGst ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={field.placeholder}
                  />
                  <button
                    type="button"
                    onClick={handleGstVerify}
                    disabled={gstVerifying || !formData.companyGst}
                    className={`cursor-pointer px-3 py-2 rounded-lg font-semibold ${gstVerified ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'} ${gstVerifying ? 'opacity-50' : ''}`}
                  >
                    {gstVerifying ? 'Verifying...' : gstVerified ? 'Verified' : 'Verify'}
                  </button>
                </div>
                {errors.companyGst && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyGst}</p>
                )}
              </div>
            );
          }
          return (
            <div key={field.name} className={field.gridCols || 'md:col-span-1'}>
              <InputField
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleInputChange}
                error={errors[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                rows={field.rows}
                options={field.options}
              />
            </div>
          );
        })}
      </div>
      {/* Password fields at the end of the first section */}
      {sectionKey === 'companyInfo' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Create Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.password ? 'border-red-300' : 'border-gray-300'
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
      )}
    </FormSection>
  );

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center space-x-3 mb-2">
              <Package className="h-8 w-8 text-white" />
              <h2 className="text-2xl font-bold text-white">
                Shipper Registration
              </h2>
            </div>
            <p className="text-blue-100">
              Join LogixJunction's network to streamline your shipping operations
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8 space-y-8">
            {renderTopFields()}
            {/* Render sections dynamically, but skip pocContact, companyEmail, companyGst fields */}
            {Object.entries(formConfig).map(([sectionKey, section]) =>
              <FormSection key={sectionKey} icon={section.icon} title={section.title}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.fields.filter(field => !['pocContact','companyEmail','companyGst'].includes(field.name)).map((field) => (
                    <div key={field.name} className={field.gridCols || 'md:col-span-1'}>
                      <InputField
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        error={errors[field.name]}
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={field.rows}
                        options={field.options}
                      />
                    </div>
                  ))}
                </div>
              </FormSection>
            )}

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
                    <Package className="h-5 w-5" />
                    <span>Register as Shipper</span>
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
