'use client';

import { useState, useEffect } from 'react';
import DynamicRecordForm from '@/components/sections/DynamicRecordForm';
import AdvancedRecordForm from '@/components/sections/AdvancedRecordForm'; // Import the new form
import AdminLogin from '@/components/ui/AdminLogin';
import { Search, X, ChevronsRight } from 'lucide-react'; // Add ChevronsRight for the toggle button

export default function ManagePageClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('list'); // 'list', 'form'
  const [formMode, setFormMode] = useState('simple'); // 'simple' or 'advanced'
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = async (term = '') => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getAllRecords', payload: { searchTerm: term } }),
      });
      if (!response.ok) throw new Error('Failed to fetch records');
      const data = await response.json();
      // Handle cases where the API returns an object with a `records` property vs. a direct array
      const recordsList = Array.isArray(data) ? data : data.records;
      setRecords(recordsList || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch records if the user is authenticated
    if (isAuthenticated) {
      fetchRecords(searchTerm);
    }
  }, [isAuthenticated, searchTerm]);

  const handleSearch = () => {
    fetchRecords(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchRecords('');
  };

  const handleLogin = (secret) => {
    if (secret === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleFormSubmit = async (formData) => {
    const action = selectedRecord ? 'updateRecord' : 'addRecord';
    const payload = selectedRecord
      ? { id: selectedRecord._id, record: formData }
      : { record: formData };

    const response = await fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to save record');
    }

    await fetchRecords(); // Refresh list
    setView('list'); // Go back to the list view
    setSelectedRecord(null); // Reset selected record
  };

  const handleEdit = async (record) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'getRecordDetails',
          payload: { title_slug: record.title_slug },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch record details');
      }
      const detailedRecord = await response.json();
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
        const response = await fetch('/api/records', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'deleteRecord', payload: { id: recordId } }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || 'Failed to delete record');
        }

        await fetchRecords(); // Refresh list
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
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        {/* {view === 'list' && ( */}
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          + Add New Record
        </button>
        {/* )} */}
      </div>
      )}
      {view === 'form' ? (
        <div>
          <button
            onClick={() => setView('list')}
            className="text-white font-bold mb-6  bg-[#c62828] text-lg rounded-lg p-2 shadow-lg transition-transform transform hover:scale-105"
          >
            ← Back to Record List
          </button>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setFormMode(formMode === 'simple' ? 'advanced' : 'simple')}
              className="flex items-center bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-all"
            >
              {formMode === 'simple' ? 'Switch to Advanced Form' : 'Switch to Simple Form'}
              <ChevronsRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          {formMode === 'simple' ? (
            <DynamicRecordForm onSubmit={handleFormSubmit} initialData={selectedRecord} />
          ) : (
            <AdvancedRecordForm onSubmit={handleFormSubmit} initialData={selectedRecord} />
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-gray-700">Existing Records</h2>

            {/* Search Box */}
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
                  onClick={() => {
                    setSearchTerm('');
                    fetchRecords('');
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                onClick={() => fetchRecords(searchTerm)}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isLoading && <p>Loading records...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
 
          {!isLoading && !error && (
            <div className="space-y-4">
              {Array.isArray(records) && records.map((record, key) => (
                <div
                  key={key}

                  className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800">{record.title_slug}</h3>
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
                      onClick={() => handleDelete(record.title_slug)}
                      className="bg-red-600 text-white py-2 px-5 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}