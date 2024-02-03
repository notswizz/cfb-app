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
      <div className="relative bg-white rounded-lg p-5 shadow-lg max-w-md w-full m-4">
        <button onClick={onClose} className="btn btn-circle btn-sm btn-error absolute top-2 right-2">
          &times;
        </button>
        <div className="overflow-y-auto max-h-96 mt-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                placeholder="Student Name"
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <input
                type="number"
                name="age"
                value={student.age}
                onChange={handleChange}
                placeholder="Age"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <select
                name="class"
                value={student.class}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Class</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Super Senior">Super Senior</option>
              </select>
            </div>
            <div>
              <select
                name="position"
                value={student.position}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Position</option>
                <option value="QB">QB</option>
                <option value="RB">RB</option>
                <option value="WR">WR</option>
                <option value="TE">TE</option>
                <option value="OL">OL</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="socialMedia"
                value={student.socialMedia}
                onChange={handleChange}
                placeholder="Social Media Handle"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <input
                type="text"
                name="hometown"
                value={student.hometown}
                onChange={handleChange}
                placeholder="Hometown"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <input
                type="tel"
                name="phoneNumber"
                value={student.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <input
                type="number"
                name="expectedNIL"
                value={student.expectedNIL}
                onChange={handleChange}
                placeholder="Expected NIL"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="security" className="block text-gray-700">Security</label>
              <input
                type="range"
                min="1"
                max="5"
                name="security"
                value={student.security}
                onChange={handleChange}
                className="slider slider-horizontal w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Add Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewStudentForm;