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
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-800">Edit NIL Budget</h2>
          <input 
            type="text" 
            value={budget} 
            onChange={(e) => setBudget(e.target.value)}
            className="input input-bordered w-full"
          />
          <div className="flex justify-end space-x-2">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" onClick={onClose} className="btn btn-error">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBudget;
