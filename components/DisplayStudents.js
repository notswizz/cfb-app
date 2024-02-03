import React, { useEffect, useState } from 'react';

const DisplayStudents = ({ onStudentClick, filters = { searchTerm: '', selectedClass: '', selectedPosition: '' } }) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/viewStudents');
        if (!response.ok) throw new Error('Data fetch failed');

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchStudents();
  }, []);

  const handleSecurityChange = async (studentId, newSecurityValue) => {
    try {
      // Update the student's security in the local state
      setStudents(students.map(student => student._id === studentId ? { ...student, security: newSecurityValue } : student));

      // Send the update to the server
      await fetch('/api/updateStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: studentId, security: newSecurityValue }),
      });
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const securityText = (value) => {
    switch (value) {
      case '1': return 'Gone';
      case '2': return 'Leaving';
      case '3': return 'Unhappy';
      case '4': return 'Content';
      case '5': return 'Lock';
      default: return '';
    }
  };

  const filteredStudents = students.filter(student => {
    return (
      (filters.searchTerm ? student.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) : true) &&
      (filters.selectedClass ? student.class === filters.selectedClass : true) &&
      (filters.selectedPosition ? student.position === filters.selectedPosition : true)
    );
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

 
  
  return (
    <div className="max-w-4xl mx-auto my-1">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-r from-gray-100 to-gray-300 shadow-lg overflow-auto rounded-lg max-h-96 p-4">
        {filteredStudents.map((student) => (
          <li key={student._id} className="card card-bordered card-compact bg-base-100 shadow-xl">
            {/* Card Header */}
            <div className="card-title">
              {/* Position Tag with increased size and margin */}
              <span className="badge badge-accent text-lg m-2">{student.position}</span>
            </div>

            {/* Card Body */}
            <div className="card-body">
              <button 
                onClick={() => onStudentClick(student)} 
                className="btn btn-primary"
              >
                {student.name}
              </button>

              <div className="text-sm space-y-1 mt-3">
                <p className="font-medium">{student.class}</p>
                <p>{student.hometown}</p>
              </div>

              <div className="card-actions justify-end mt-4">
                <span className="label-text">{securityText(student.security)}</span>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={student.security}
                  onChange={(e) => handleSecurityChange(student._id, e.target.value)}
                  className="range range-secondary"
                />
                <span className="badge badge-outline">
                  ${student.expectedNIL ? Number(student.expectedNIL).toLocaleString() : '0'}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
  
  
};

export default DisplayStudents;
