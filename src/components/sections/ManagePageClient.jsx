'use client';

import { useState, useEffect } from 'react';
import UpdateRecordForm from '@/components/sections/UpdateRecordForm';
import AdminLogin from '@/components/ui/AdminLogin';
import { Search, X } from 'lucide-react';
import { fetchRecords, fetchRecordById, addRecord, updateRecord, deleteRecord } from '@/lib/api';

export default function ManagePageClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('list');
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    index: 1,
    items: 10, // Items per page
    count: 0, // Total records
  });

  const loadRecords = async (term = '', pageIndex = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchRecords({ searchTerm: term, index: pageIndex, items: pagination.items });
      console.log('Fetched records data:', data);
      if (data === null || !data.list) {
        throw new Error('Failed to fetch records. The API returned an invalid response.');
      }
      setRecords(data.list);
      setPagination({
        index: data.index,
        items: data.items,
        count: data.count,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadRecords(searchTerm, pagination.index);
    }
  }, [isAuthenticated]); // Removed searchTerm and pagination.index to prevent multiple initial loads

  const handleSearch = () => {
    // Reset to page 1 for a new search
    loadRecords(searchTerm, 1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    // Reset to page 1 when clearing search
    loadRecords('', 1);
  };

  const handleLogin = (secret) => {
    if (secret === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleFormSubmit = async (formData) => {
    // If pendingForm is true, it's always a new record (a draft).
    // Otherwise, check for an existing ID to determine if it's an update.
    const isUpdating = selectedRecord && selectedRecord._id && !formData.pendingForm;
    console.log('Form Data:', formData);
    let result;
    try {
      if (isUpdating) {
        result = await updateRecord(selectedRecord._id, formData);
      } else {
        // This handles both new records and drafts.
        result = await addRecord(formData);
      }

      if (result === null) {
        // This condition might not be hit anymore if apiRequest throws an error,
        // but it's good for defense.
        throw new Error('Failed to save record. Result was null.');
      }

      await loadRecords();
      // Only switch view if it's not a draft save
      if (!formData.pendingForm) {
        setView('list');
        setSelectedRecord(null);
      } else {
        alert('Draft saved!');
      }
    } catch (e) {
      // The error 'e' now contains the detailed message from the backend.
      console.error("Full error details:", e);
      setError(`Operation failed: ${e.message}`); // Display the detailed error in the UI
    }
  };

  const handleEdit = async (record) => {
    setIsLoading(true);
    setError(null);
    try {
      const detailedRecord = await fetchRecordById(record.title_slug);
      if (detailedRecord === null) {
        throw new Error('Failed to fetch record details');
      }
      setSelectedRecord(detailedRecord);
      setView('form');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedRecord(null);
    setView('form');
  };

  const handleDelete = async (recordId) => {
    if (window.confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
      try {
        const success = await deleteRecord(recordId);
        if (!success) {
          throw new Error('Failed to delete record');
        }
        await loadRecords();
        alert('Record deleted successfully!');
      } catch (error) {
        console.error("Failed to delete record:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col flex-grow max-w-7xl mx-auto p-8 bg-[#cd0808]">
      {view === 'list' && (<div className="flex justify-between items-center mb-8 p-4 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-900 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          + Add New Record
        </button>
      </div>
      )}
      {view === 'form' ? (
        <div className="relative">
          <button
            onClick={() => setView('list')}
            className="text-white font-bold mb-6  bg-[#c62828] text-lg rounded-lg p-2 shadow-lg transition-transform transform hover:scale-105"
          >
            ← Back to Record List
          </button>
          <UpdateRecordForm onSubmit={handleFormSubmit} initialData={selectedRecord} />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-gray-700">Existing Records</h2>
            <div className="relative w-full max-w-sm ml-4">
              <input
                type="text"
                placeholder="Search by post name..."
                className="w-full border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  onClick={handleClearSearch}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isLoading && <p>Loading records...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!isLoading && !error && (
            <div className="space-y-4">
              {Array.isArray(records) && records.length > 0 ? (
                records.map((record) => (
                  <div
                    key={record.unique_id || record._id}
                    className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-800">{record.title}</h3>
                      <p className="text-gray-600">{record.name_of_organisation}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Posted: {record.post_date} | Updated: {record.update_date || 'N/A'}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(record)}
                        className="bg-yellow-500 text-white py-2 px-5 rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record.unique_id)}
                        className="bg-red-600 text-white py-2 px-5 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No records found.</p>
              )}
            </div>
          )}
          {!isLoading && !error && pagination.count > 0 && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => loadRecords(searchTerm, pagination.index - 1)}
                disabled={pagination.index <= 1}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {pagination.index} of {Math.ceil(pagination.count / pagination.items)}
              </span>
              <button
                onClick={() => loadRecords(searchTerm, pagination.index + 1)}
                disabled={pagination.index * pagination.items >= pagination.count}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}