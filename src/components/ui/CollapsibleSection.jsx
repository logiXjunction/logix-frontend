import { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Pencil, Trash } from 'lucide-react';

const CollapsibleSection = ({ title, items, onAdd, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-b border-gray-200 transition-all">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-50 cursor-pointer transition"
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
            title={`Add ${title.split(' ')[1] || 'Item'}`}
          >
            <Plus size={18} />
          </button>
          {isOpen ? (
            <ChevronUp className="text-gray-600" size={20} />
          ) : (
            <ChevronDown className="text-gray-600" size={20} />
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
        }`}
      >
        <ul className="divide-y divide-gray-100 px-4 py-3 bg-white">
          {items.length === 0 ? (
            <li className="text-sm text-gray-500 italic py-2">
              No entries available.
            </li>
          ) : (
            items.map((item, index) => (
              <li
                key={index}
                className="py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-700 text-sm"
              >
                <span>{item}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item, index)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(item, index)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CollapsibleSection;
