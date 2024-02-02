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
      <ul className="bg-gradient-to-r from-silver-gray to-charcoal-gray shadow-lg overflow-auto rounded-lg max-h-96 grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {filteredStudents.map((student) => (
          <li key={student._id} className="bg-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-center p-6">
              <div>
                <button onClick={() => onStudentClick(student)} className="inline-block bg-navy-blue text-white text-lg px-3 py-1 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-blue">
                  {student.name}
                </button>
                <span className="block text-sm text-gray-600 mt-2">{student.class}</span>
                <span className="block text-sm text-gray-600">{student.hometown}</span>
                <span className="inline-block bg-athletic-gold text-black text-md px-3 py-1 rounded-full uppercase font-semibold tracking-wide mt-2">{student.position}</span>
              </div>
              <div className="flex flex-col items-center mt-4 md:mt-0">
                <span className="text-charcoal-gray font-semibold text-lg">{securityText(student.security)}</span>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={student.security}
                  onChange={(e) => handleSecurityChange(student._id, e.target.value)}
                  className="w-full cursor-pointer rounded-lg overflow-hidden appearance-none bg-silver-gray h-3 focus:outline-none focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                />
                <span className="bg-green-300 text-green-900 text-md font-semibold mt-2 px-4 py-2 rounded-full">${student.expectedNIL ? Number(student.expectedNIL).toLocaleString() : '0'}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
  
  
  
};

export default DisplayStudents;
