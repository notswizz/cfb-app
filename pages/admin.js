// AdminPage.js
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Globals from '../components/Globals';
import EditBudget from '../components/EditBudget';
import NewStudentForm from '../components/NewStudentForm';

const AdminPage = () => {
  const [globalsData, setGlobalsData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewStudentModal, setShowNewStudentModal] = useState(false);

  useEffect(() => {
    const fetchGlobalsData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/viewGlobals');
        if (!response.ok) throw new Error('Failed to fetch globals');
        const data = await response.json();
        setGlobalsData(data);
      } catch (error) {
        console.error('Error fetching globals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGlobalsData();
  }, []);

  const handleEditBudgetClick = () => {
    setShowEditModal(true);
  };

  const handleAddStudentClick = () => {
    setShowNewStudentModal(true);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 sm:p-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : globalsData && globalsData.length > 0 ? (
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Globals globalsData={globalsData} className="flex-grow" />
            <div className="flex-grow">
              <button onClick={handleAddStudentClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-full sm:w-auto">
                Add New Student
              </button>
              <button onClick={() => handleEditBudgetClick()} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 w-full sm:w-auto">
                Edit NIL Budget
              </button>
            </div>
          </div>
        ) : (
          <p>No data to display.</p>
        )}
      </div>
      {showEditModal && globalsData && globalsData.length > 0 && (
        <EditBudget
          currentBudget={globalsData[0].nilBudget}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showNewStudentModal && (
        <NewStudentForm
          onClose={() => setShowNewStudentModal(false)}
        />
      )}
    </>
  );
};

export default AdminPage;
