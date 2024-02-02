import React, { useState, useEffect } from 'react';

const FormNIL = () => {
    const [nilData, setNilData] = useState({
        company: '',
        totalAmount: '',
        students: []
    });
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/viewStudents');
                const data = await response.json();
                setStudentList(data);
            } catch (error) {
                console.error('Failed to fetch students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleChange = (e) => {
        setNilData({ ...nilData, [e.target.name]: e.target.value });
    };

    const handleAddStudent = () => {
        setNilData({ ...nilData, students: [...nilData.students, ''] });
    };

    const handleStudentChange = (e, index) => {
        const newStudents = [...nilData.students];
        newStudents[index] = e.target.value;
        setNilData({ ...nilData, students: newStudents });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/addNIL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nilData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit NIL data');
            }

            console.log('NIL data submitted successfully');
        } catch (error) {
            console.error('There was an error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
            <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                <input
                    type="text"
                    name="company"
                    id="company"
                    value={nilData.company}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">Total Amount</label>
                <input
                    type="number"
                    name="totalAmount"
                    id="totalAmount"
                    value={nilData.totalAmount}
                    onChange={handleChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
           
            {nilData.students.map((student, index) => (
                <div key={index}>
                    <label htmlFor={`student${index}`} className="block text-sm font-medium text-gray-700">Student {index + 1}</label>
                    <select
                        name="student"
                        id={`student${index}`}
                        value={student}
                        onChange={(e) => handleStudentChange(e, index)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select a student</option>
                        {studentList.map((s) => (
                            <option key={s._id} value={s._id}>{s.name}</option>
                        ))}
                    </select>
                </div>
            ))}
            <button type="button" onClick={handleAddStudent} className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
                Add Student
            </button>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                Submit NIL Data
            </button>
        </form>
    );
};

export default FormNIL;