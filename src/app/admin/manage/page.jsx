// app/admin/managerecord/page.jsx
'use client';

import { useState } from 'react';
import NewRecordForm from '@/components/sections/NewRecordForm';
import UpdateRecordForm from '@/components/sections/UpdateRecordForm';

export default function ManageRecordPage() {
  const [mode, setMode] = useState('');

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Manage Record</h1>
      {!mode && (
        <div className="space-x-4">
          <button
            onClick={() => setMode('new')}
            className="bg-green-600 text-white py-2 px-4 rounded"
          >
            Add New Record
          </button>
          <button
            onClick={() => setMode('update')}
            className="bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Update Existing Record
          </button>
        </div>
      )}

      {mode && (
        <button
          onClick={() => setMode('')}
          className="text-sm text-blue-500 hover:underline mt-4 mb-2"
        >
          ← Back
        </button>
      )}

      {mode === 'new' && <NewRecordForm />}
      {mode === 'update' && <UpdateRecordForm />}
    </div>
  );
}

