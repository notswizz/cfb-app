import React, { useState } from 'react';
import DisplayStudents from '../components/DisplayStudents';
import NavBar from '../components/NavBar';
import StudentModal from '../components/StudentModal';
import PlayerFilters from '../components/PlayerFilters';
import Global from '../components/Global'; // Import the Global component

const RosterPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedClass: '',
    selectedPosition: '',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-8 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          <div className="w-full lg:w-1/4">
            <div className="mb-4">
              <PlayerFilters onFilterChange={handleFilterChange} />
            </div>
            {/* Global component hidden on mobile, visible on lg screens and above */}
            <div className="hidden lg:block mt-4">
              <Global />
            </div>
          </div>
          <div className="flex-grow">
            <DisplayStudents 
              onStudentClick={handleStudentClick}
              filters={filters}
            />
          </div>
        </div>
        
        {selectedStudent && (
          <StudentModal
            student={selectedStudent}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default RosterPage;
