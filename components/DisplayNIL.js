import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const NILList = () => {
  const [nilEntries, setNilEntries] = useState([]);
  const [students, setStudents] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await fetch('/api/matchName');
        if (!studentResponse.ok) throw new Error('Network response was not ok for students');
        const studentData = await studentResponse.json();

        const studentMap = studentData.reduce((map, student) => {
          map[student._id] = student.name;
          return map;
        }, {});

        setStudents(studentMap);

        const nilResponse = await fetch('/api/viewNIL');
        if (!nilResponse.ok) throw new Error('Network response was not ok for NIL');
        const nilData = await nilResponse.json();

        setNilEntries(nilData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    console.log(nilEntries); 
  }, []);

  const updateNILData = async () => {
    try {
      const nilResponse = await fetch('/api/viewNIL');
      if (!nilResponse.ok) throw new Error('Network response was not ok for NIL');
      const nilData = await nilResponse.json();
      setNilEntries(nilData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleStudentChange = async (entry, selectedOptions) => {
    const entryId = entry._id; // Directly using the _id string
    const studentIds = selectedOptions.map(option => option.value);
  
    try {
      const response = await fetch(`/api/updateNIL/${entryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ students: studentIds }),
      });


      if (!response.ok) throw new Error('Failed to update NIL entry');

      // After updating, re-fetch NIL data to update UI
      await updateNILData();
    } catch (error) {
      console.error('Error updating NIL entry:', error);
    }
  };

  const studentOptions = Object.entries(students).map(([id, name]) => ({
    value: id,
    label: name
  }));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card bg-base-200 shadow-xl h-96 overflow-auto">
      <div className="card-body">
        {nilEntries.length > 0 ? (
          <ul>
           {nilEntries.map((entry) => (
  <li key={entry._id.$oid} className="mb-4 p-4 rounded-lg shadow-md bg-base-100">
                <h2 className="text-xl font-semibold">{entry.company}</h2>
                <p>Total Amount: <span className="text-primary font-semibold">${entry.totalAmount.toLocaleString()}</span></p>
                <Select
                  isMulti
                  options={studentOptions}
                  defaultValue={entry.students.map(id => ({ value: id, label: students[id] || id }))}
                  onChange={(selectedOptions) => handleStudentChange(entry, selectedOptions)}
                  className="mt-1"
                  styles={{
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isSelected ? 'black' : 'black',
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: 'black',
                    }),
                    multiValue: (provided) => ({
                      ...provided,
                      color: 'black',
                    }),
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No NIL entries found.</p>
        )}
      </div>
    </div>
  );
};

export default NILList;
