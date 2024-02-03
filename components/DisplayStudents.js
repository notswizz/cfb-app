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
    <div className="max-w-4xl mx-auto my-8">
      <ul className="bg-gradient-to-r from-gray-100 to-gray-300 shadow-lg overflow-auto rounded-lg max-h-96 grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {filteredStudents.map((student) => (
          <li key={student._id} className="bg-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl rounded-lg relative">
            {/* Position Tag */}
            <span className="absolute top-0 right-0 bg-yellow-400 text-gray-800 text-md font-semibold py-1 px-3 rounded-bl-full uppercase tracking-wide">
              {student.position}
            </span>
            
            {/* Content */}
            <div className="flex flex-col md:flex-row justify-between items-center p-6 space-y-4 md:space-y-0 pt-8"> {/* Padding top added */}
              <div className="space-y-3"> {/* Increased space between position and location */}
                <button 
                  onClick={() => onStudentClick(student)} 
                  className="bg-black hover:bg-gray-800 text-white text-lg font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-gray-500"
                >
                  {student.name}
                </button>
  
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="font-medium">{student.class}</p>
                  <p className="text-gray-600">{student.hometown}</p>
                </div>
              </div>
  
              <div className="flex flex-col items-center space-y-4"> {/* Increased space between slider and NIL value */}
                <span className="text-gray-700 font-semibold text-lg">{securityText(student.security)}</span>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={student.security}
                  onChange={(e) => handleSecurityChange(student._id, e.target.value)}
                  className="w-full cursor-pointer rounded-lg bg-gray-200 h-2 focus:outline-none focus:ring focus:ring-indigo-300"
                />
                <span className="border border-green-500 text-black-500 text-md font-semibold px-4 py-1 rounded-full shadow-sm hover:bg-green-500 hover:text-white transition-colors duration-300">
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
