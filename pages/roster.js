import React, { useState } from 'react';
import DisplayStudents from '../components/DisplayStudents';

import NavBar from '../components/NavBar';
import StudentModal from '../components/StudentModal';
import PlayerFilters from '../components/PlayerFilters';

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
    <div className="flex justify-center">
      <PlayerFilters onFilterChange={handleFilterChange} />
    </div>

    <div className="my-8">
      <DisplayStudents 
        onStudentClick={handleStudentClick}
        filters={filters} 
      />
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
