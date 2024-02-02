import React, { useState } from 'react';

const AdminForm = () => {
  const [university, setUniversity] = useState('');
  const [nilBudget, setNilBudget] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adminData = { university, nilBudget };
      const response = await fetch('/api/addAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      if (response.ok) {
        console.log('Admin data added successfully');
        // Reset form or additional success actions
        setUniversity('');
        setNilBudget('');
      } else {
        throw new Error('Failed to add admin data');
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="university" className="block text-lg font-medium text-gray-700">University</label>
          <input
            type="text"
            id="university"
            name="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="nilBudget" className="block text-lg font-medium text-gray-700">NIL Budget</label>
          <input
            type="text"
            id="nilBudget"
            name="nilBudget"
            value={nilBudget}
            onChange={(e) => setNilBudget(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
