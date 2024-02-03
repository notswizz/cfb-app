import React from 'react';

const StudentModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full flex justify-center items-center px-4">
      <div className="relative bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">{student.name}</h2>
        <div className="space-y-3 text-gray-600">
          <p><span className="font-semibold">Age:</span> {student.age}</p>
          <p><span className="font-semibold">Class:</span> {student.class}</p>
          <p><span className="font-semibold">Position:</span> {student.position}</p>
          <p><span className="font-semibold">Social Media:</span> {student.socialMedia}</p>
          <p><span className="font-semibold">Hometown:</span> {student.hometown}</p>
          <p><span className="font-semibold">Phone Number:</span> {student.phoneNumber}</p>
          <p><span className="font-semibold">Expected NIL:</span> {student.expectedNIL}</p>
        </div>
        <button onClick={onClose} className="btn btn-primary mt-6">
          Close
        </button>
        <button className="btn btn-secondary mt-6">
         Text
        </button>
      </div>
    </div>
  );
  
};

export default StudentModal;
