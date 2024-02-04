import React, { useEffect, useState } from 'react';

const Globals = () => {
  const [securityTotals, setSecurityTotals] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const studentsResponse = await fetch('/api/viewStudents');
        if (!studentsResponse.ok) {
          throw new Error('Data fetch failed');
        }

        const studentsData = await studentsResponse.json();
        const securityTotals = calculateSecurityTotals(studentsData);

        setSecurityTotals(securityTotals);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const levelColors = {
    '1': 'bg-red-500',    // Red for 'Gone'
    '2': 'bg-yellow-500', // Yellow for 'Leaving'
    '3': 'bg-orange-500', // Orange for 'Unhappy'
    '4': 'bg-green-500',  // Green for 'Content'
    '5': 'bg-blue-500',   // Blue for 'Lock'
    'Unknown': 'bg-gray-500' // Gray for 'Unknown'
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-base-100 rounded-box shadow-lg">
      <footer className="footer footer-center p-4 bg-base-300 rounded">
        <div className="flex justify-between w-full">
          {Object.entries(securityTotals).map(([level, count]) => (
            <div key={level} className="flex flex-col items-center">
              <span className={`badge badge-${levelColors[level]} badge-lg`}>
                {levelLabels[level] || 'Unknown'}
              </span>
              <span className="stat-value">{count}</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
  
  
};

export default Globals;
