import React, { useEffect, useState } from 'react';

const Global = () => {
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
    <div className="p-2 sm:p-4 md:p-6 bg-base-100 rounded-box shadow-lg">
      <ul className="space-y-2 sm:space-y-4 mt-2 sm:mt-4">
        {globalsData.map((item, index) => (
          <li key={index} className="stats bg-base-200 shadow">
            {/* Stack NIL values vertically */}
            <div className="flex flex-col space-y-2">
              <div className="stat">
                <div className="stat-title">NIL Budget</div>
                <div className="stat-value text-success">${item.nilBudget.toLocaleString()}</div>
              </div>
              <div className="stat">
                <div className="stat-title">NIL Promised</div>
                <div className="stat-value text-warning">${totalExpectedNIL.toLocaleString()}</div>
              </div>
              <div className="stat">
                <div className="stat-title">NIL Logged</div>
                <div className="stat-value text-info">${totalLoggedNIL.toLocaleString()}</div>
              </div>
            </div>
  
           
          </li>
        ))}
      </ul>
    </div>
  );
  
  
};

export default Global;
