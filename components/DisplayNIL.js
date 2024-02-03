import React, { useState, useEffect } from 'react';
import Select from 'react-select';  

const NILList = () => {
  const [nilEntries, setNilEntries] = useState([]);
  const [students, setStudents] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/matchName');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const studentMap = {};
        data.forEach(student => {
          studentMap[student._id.$oid] = student.name;
        });
        return studentMap;
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };

    const fetchNILData = async () => {
      try {
        // Fetch students first
        const studentResponse = await fetch('/api/matchName');
        if (!studentResponse.ok) throw new Error('Network response was not ok for students');
        const studentData = await studentResponse.json();
        
        // Create the student map
        const studentMap = {};
        studentData.forEach(student => {
          // Ensure the student ID is used as the key
          studentMap[student._id] = student.name;
        });
    
        setStudents(studentMap); // Set the map in the state
        console.log("Students object after setting state:", studentMap);
     

        // Then fetch NIL data
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

    fetchNILData();
  }, []);

  const getStudentNames = (studentIds) => {
    if (!studentIds || !students) return '';
  
    console.log("Students map:", students); // Check the students map
    console.log("Student IDs from NIL entry:", studentIds); // Check the received IDs
  
    return studentIds.map(id => {
      console.log(`Looking up ID: ${id}, Name: ${students[id]}`); // Debug each lookup
      return students[id] ? students[id] : 'Unknown';
    }).join(', ');
  };

  

  // Function to handle changes in student selection
  const handleStudentChange = async (entryId, selectedOptions) => {
    try {
      // Extract student IDs from the selected options
      const studentIds = selectedOptions.map(option => option.value);

      // Call API to update the student IDs
      const response = await fetch(`/api/updateNIL/${entryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ students: studentIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to update NIL entry');
      }

      console.log('Updated NIL entry successfully');
    } catch (error) {
      console.error('Error updating NIL entry:', error);
    }
  };

  // Convert student map to options for React Select
  const studentOptions = Object.entries(students).map(([id, name]) => ({
    value: id,
    label: name
  }));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-3xl font-bold mb-4">NIL Entries</h1>
        {nilEntries.length > 0 ? (
          <ul>
            {nilEntries.map((entry) => (
              <li key={entry._id.$oid} className="mb-4 p-4 rounded-lg shadow-md bg-base-100">
                <h2 className="text-xl font-semibold">{entry.company}</h2>
                <p>Total Amount: <span className="text-primary font-semibold">${entry.totalAmount.toLocaleString()}</span></p>
                {/* Assuming you have a custom DaisyUI class or component for the Select */}
                <Select
                isMulti
                options={studentOptions}
                defaultValue={entry.students.map(id => ({ value: id, label: students[id] || id }))}
                onChange={(selectedOptions) => handleStudentChange(entry._id.$oid, selectedOptions)}
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

