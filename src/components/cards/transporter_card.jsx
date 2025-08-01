import React from 'react';

const TransporterCard = ({ transporter }) => {
  const {
    companyName,
    transporterName,
    description,
    rating,
    deliveryETA,
    costEstimate,
    image,
    pdfLink,
  } = transporter;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out p-4 sm:p-5 border border-zinc-200 w-full">
      {/* Header - Company Info */}
      <div className="flex items-center gap-3 sm:gap-4 mb-3">
        <img
          src={image || 'https://i.pravatar.cc/150'}
          alt="Company Logo"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-semibold text-[#0a2463] truncate">{companyName}</h2>
          <p className="text-xs sm:text-sm text-gray-500 truncate">{transporterName}</p>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
      
      {/* Details */}
      <div className="text-xs sm:text-sm space-y-1 mb-4">
        <p><strong>Rating:</strong> ⭐ {rating}</p>
        <p><strong>ETA:</strong> {deliveryETA}</p>
        <p><strong>Cost:</strong> {costEstimate}</p>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between">
        <a
          href={pdfLink}
          className="text-blue-500 underline text-xs sm:text-sm hover:text-blue-700 text-center sm:text-left"
        >
          View Quote
        </a>
        <button className="bg-[#d8315b] hover:bg-[#b12042] text-white px-3 py-1.5 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TransporterCard;