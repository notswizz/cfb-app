import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const FormNIL = () => {
    const [nilData, setNilData] = useState({
        company: '',
        totalAmount: '',
        students: []
    });
    const [studentList, setStudentList] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);

    const studentOptions = studentList.map(student => ({
        value: student._id,
        label: student.name
    }));

    const handleStudentsSelect = (selectedOptions) => {
        const studentIds = selectedOptions.map(option => option.value);
        setNilData({ ...nilData, students: studentIds });
    };

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

    const handleTotalStudentsChange = (e) => {
        setTotalStudents(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/addNIL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...nilData, totalStudents}),
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
            <div className="form-control">
                <label htmlFor="company" className="label">
                    <span className="label-text">Company</span>
                </label>
                <input
                    type="text"
                    name="company"
                    id="company"
                    value={nilData.company}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />
            </div>
            <div className="form-control">
                <label htmlFor="totalAmount" className="label">
                    <span className="label-text">Total Amount</span>
                </label>
                <input
                    type="number"
                    name="totalAmount"
                    id="totalAmount"
                    value={nilData.totalAmount}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div className="form-control">
                <label htmlFor="totalStudents" className="label">
                    <span className="label-text">Total Students</span>
                </label>
                <input
                    type="number"
                    name="totalStudents"
                    id="totalStudents"
                    value={totalStudents}
                    onChange={handleTotalStudentsChange}
                    min="0"
                    className="input input-bordered w-full"
                />
            </div>
            <div className="form-control">
                <label htmlFor="students" className="label">
                    <span className="label-text">Students</span>
                </label>
                {/* Ensure that your Select component from React Select is compatible with DaisyUI styles */}
                <Select
                    isMulti
                    name="students"
                    options={studentOptions}
                    className="mt-1"
                    onChange={handleStudentsSelect}
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
            </div>
            <button type="submit" className="btn btn-primary w-full">
                Submit NIL Data
            </button>
        </form>
    );
    
};

export default FormNIL;
