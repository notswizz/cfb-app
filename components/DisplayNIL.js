import React, { useState, useEffect } from 'react';

const NILList = () => {
  const [nilEntries, setNilEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNILData = async () => {
      try {
        const response = await fetch('/api/viewNIL');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setNilEntries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNILData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>NIL Entries</h1>
      {nilEntries.length > 0 ? (
        <ul>
          {nilEntries.map((entry) => (
            <li key={entry._id.$oid}>
              <h2>{entry.company}</h2>
              <p>Total Amount: ${entry.totalAmount}</p>
              <p>Students: {entry.students.join(', ')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No NIL entries found.</p>
      )}
    </div>
  );
};

export default NILList;
