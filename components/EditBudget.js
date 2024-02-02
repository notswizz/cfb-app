import React, { useState } from 'react';

const EditBudget = ({ onClose, currentBudget }) => {
  const [budget, setBudget] = useState(currentBudget || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/updateBudget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newBudget: budget }),
      });

      if (response.ok) {
        console.log('Budget updated successfully');
        onClose(); // Close the modal on successful update
      } else {
        throw new Error('Failed to update budget');
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Edit NIL Budget</h2>
          <input 
            type="text" 
            value={budget} 
            onChange={(e) => setBudget(e.target.value)}
            className="w-full mb-4 px-2 py-1 border border-gray-300 rounded-md"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Submit</button>
          <button type="button" onClick={onClose} className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditBudget;
