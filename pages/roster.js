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
      <div className="container mx-auto my-8">
        {/* Flex container for all screen sizes */}
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Filters will stack on mobile and be on the left on larger screens */}
          <div className="lg:w-1/4 mb-4 lg:mb-0 lg:mr-4">
            <PlayerFilters onFilterChange={handleFilterChange} />
          </div>
          {/* DisplayStudents in the center */}
          <div className="flex-grow">
            <DisplayStudents 
              onStudentClick={handleStudentClick}
              filters={filters} 
            />
          </div>
          {/* Global component will be on the right for larger screens */}
          {/* Adjusted classes for better fitting */}
          <div className="lg:w-1/4 mt-4 lg:mt-0 lg:ml-4">
            <Global />
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
