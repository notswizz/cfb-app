// AdminPage.js
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Globals from '../components/Globals';
import EditBudget from '../components/EditBudget';
import NewStudentForm from '../components/NewStudentForm';
import Controller from '../components/Controller';

const AdminPage = () => {
  const [globalsData, setGlobalsData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewStudentModal, setShowNewStudentModal] = useState(false);
  const [showControllerModal, setShowControllerModal] = useState(false);

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

  const handleThemeClick = () => {
    setShowControllerModal(true);
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
              <button onClick={handleAddStudentClick} className="btn btn-primary mt-4 w-full sm:w-auto">
                New Student
              </button>
              <button onClick={() => handleEditBudgetClick()} className="btn btn-secondary mt-4 w-full sm:w-auto">
                NIL Budget
              </button>
              <button onClick={handleThemeClick} className="btn btn-accent mt-4 w-full sm:w-auto">
                Theme
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
      {showControllerModal && (
        <Controller
          onClose={() => setShowControllerModal(false)}
        />
      )}
    </>
  );
};

export default AdminPage;
