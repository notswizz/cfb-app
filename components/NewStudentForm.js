import React, { useState } from 'react';

const NewStudentForm = ({ onClose }) => {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    class: '',
    position: '',
    socialMedia: '',
    hometown: '',
    phoneNumber: '',
    expectedNIL: '',
    security: '',
  });



  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        console.log('Student added successfully');
        // Reset the form or handle success
      } else {
        throw new Error('Failed to add student');
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 shadow-lg max-w-md w-full m-4">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-black close-modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Student Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <select
              name="class"
              value={student.class}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="">Class</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Super Senior">Super Senior</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="position"
              value={student.position}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="">Position</option>
              <option value="QB">QB</option>
              <option value="RB">RB</option>
              <option value="WR">WR</option>
              <option value="TE">TE</option>
              <option value="OL">OL</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="socialMedia"
              value={student.socialMedia}
              onChange={handleChange}
              placeholder="Social Media Handle"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="hometown"
              value={student.hometown}
              onChange={handleChange}
              placeholder="Hometown"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <input
              type="tel"
              name="phoneNumber"
              value={student.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
  <input
    type="number"
    name="expectedNIL"
    value={student.expectedNIL}
    onChange={handleChange}
    placeholder="Expected NIL"
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
  />
</div>
          <div className="mb-4">
            <label htmlFor="security" className="block text-gray-700">Security</label>
            <input
              type="range"
              min="1"
              max="5"
              name="security"
              value={student.security}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
            Add Student
          </button>
          </form>
      </div>
    </div>
  );
};

export default NewStudentForm;