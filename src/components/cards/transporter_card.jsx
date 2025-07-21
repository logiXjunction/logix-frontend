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
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out p-5 border border-zinc-200">
      <div className="flex items-center gap-4">
        <img
          src={image || 'https://i.pravatar.cc/150'}
          alt="Company Logo"
          className="w-14 h-14 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold text-[#0a2463]">{companyName}</h2>
          <p className="text-sm text-gray-500">{transporterName}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-3 mb-2">{description}</p>
      <div className="text-sm space-y-1">
        <p><strong>Rating:</strong> ⭐ {rating}</p>
        <p><strong>ETA:</strong> {deliveryETA}</p>
        <p><strong>Estimated Cost:</strong> {costEstimate}</p>
      </div>
      <div className="flex justify-between mt-4">
        <a
          href={pdfLink}
          className="text-blue-500 underline text-sm hover:text-blue-700"
        >
          View Quote
        </a>
        <button className="bg-[#d8315b] hover:bg-[#b12042] text-white px-4 py-1 rounded-full text-sm font-medium">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TransporterCard;
