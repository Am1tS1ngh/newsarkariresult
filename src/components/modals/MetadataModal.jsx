'use client';
import React from 'react';

import { X } from 'lucide-react';

export default function MetadataModal({ field, onSave, onCancel }) {
  const [metadata, setMetadata] = React.useState({
    remark: field.remark || '',
    importance: field.importance || 'normal',
    colorCode: field.colorCode || '#000000',
    bgColorCode: field.bgColorCode || '#ffffff',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetadata(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(metadata);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Metadata for "{field.label}"</h2>
          <button onClick={onCancel} className="p-1 hover:bg-gray-200 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="remark" className="block text-sm font-medium text-gray-700">Remark</label>
            <input
              type="text"
              id="remark"
              name="remark"
              value={metadata.remark}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="importance" className="block text-sm font-medium text-gray-700">Importance</label>
            <select
              id="importance"
              name="importance"
              value={metadata.importance}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="colorCode" className="block text-sm font-medium text-gray-700">Text Color</label>
              <input
                type="color"
                id="colorCode"
                name="colorCode"
                value={metadata.colorCode}
                onChange={handleChange}
                className="mt-1 block w-full h-10"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="bgColorCode" className="block text-sm font-medium text-gray-700">Background Color</label>
              <input
                type="color"
                id="bgColorCode"
                name="bgColorCode"
                value={metadata.bgColorCode}
                onChange={handleChange}
                className="mt-1 block w-full h-10"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onCancel} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSave} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Metadata
          </button>
        </div>
      </div>
    </div>
  );
}