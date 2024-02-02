import React, { useEffect, useState } from 'react';

const Globals = () => {
  const [globalsData, setGlobalsData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [nilData, setNilData] = useState([]);
  const [securityTotals, setSecurityTotals] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const globalsResponse = await fetch('/api/viewGlobals');
        const studentsResponse = await fetch('/api/viewStudents');
        const nilResponse = await fetch('/api/viewNIL'); // Fetch NIL data
        if (!globalsResponse.ok || !studentsResponse.ok || !nilResponse.ok) {
          throw new Error('Data fetch failed');
        }

        const globalsData = await globalsResponse.json();
        const studentsData = await studentsResponse.json();
        const nilData = await nilResponse.json();
        const securityTotals = calculateSecurityTotals(studentsData);

        setGlobalsData(globalsData);
        setStudentsData(studentsData);
        setNilData(nilData);
        setSecurityTotals(securityTotals);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateTotalExpectedNIL = () => {
    return studentsData.reduce((total, student) => total + Number(student.expectedNIL || 0), 0);
  };

  const calculateTotalLoggedNIL = () => {
    return nilData.reduce((total, nil) => total + Number(nil.totalAmount || 0), 0);
  };

  const calculateSecurityTotals = (students) => {
    return students.reduce((acc, student) => {
      const securityLevel = student.security || 'Unknown';
      acc[securityLevel] = (acc[securityLevel] || 0) + 1;
      return acc;
    }, {});
  };

  const levelLabels = {
    '1': 'Gone',
    '2': 'Leaving',
    '3': 'Unhappy',
    '4': 'Content',
    '5': 'Lock',
    'Unknown': 'Unknown'
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalExpectedNIL = calculateTotalExpectedNIL();
  const totalLoggedNIL = calculateTotalLoggedNIL();

  const levelColors = {
    '1': 'bg-red-500',    // Red for 'Gone'
    '2': 'bg-yellow-500', // Yellow for 'Leaving'
    '3': 'bg-orange-500', // Orange for 'Unhappy'
    '4': 'bg-green-500',  // Green for 'Content'
    '5': 'bg-blue-500',   // Blue for 'Lock'
    'Unknown': 'bg-gray-500' // Gray for 'Unknown'
  };
  

  return (
    <div className="p-4 sm:p-6 bg-gray-100 rounded-lg shadow-lg">
      <ul className="space-y-4 mt-4">
        {globalsData.map((item, index) => (
          <li key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 divide-gray-200">
            <div className="md:pr-4 py-4 md:py-0">
              <div className="text-base sm:text-lg font-medium text-gray-600">NIL Budget:</div>
              <div className="text-xl sm:text-2xl font-bold text-green-500">${item.nilBudget.toLocaleString()}</div>
              <div className="text-base sm:text-lg font-medium text-gray-600 mt-2 sm:mt-4">NIL Promised:</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">${totalExpectedNIL.toLocaleString()}</div>
              <div className="text-base sm:text-lg font-medium text-gray-600 mt-2 sm:mt-4">NIL Logged:</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-500">${totalLoggedNIL.toLocaleString()}</div>
            </div>
            <div className="flex flex-col items-center justify-center py-4 md:py-0">
              <span className="text-3xl sm:text-4xl font-bold text-gray-900">{item.university}</span>
              <span className="mt-2 text-sm sm:text-md text-gray-500 font-medium">{studentsData.length} Student-Athletes</span>
            </div>
            <div className="flex flex-col space-y-2 py-4 md:py-0 md:pl-4">
              {Object.entries(securityTotals).map(([level, count]) => (
                <div key={level} className="flex justify-between items-center">
                  <span className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium text-white ${levelColors[level]}`}>
                    {levelLabels[level] || 'Unknown'}
                  </span>
                  <span className="ml-2 text-base sm:text-lg font-bold text-gray-800">{count}</span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
  
};

export default Globals;
