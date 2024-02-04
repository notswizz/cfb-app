import React, { useState, useEffect } from 'react';
import Select from 'react-select';


const FormNIL = ({ isModalOpen, setIsModalOpen }) => {
    const [nilData, setNilData] = useState({
        company: '',
        totalAmount: '',
        students: []
    });
    const [studentList, setStudentList] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [nilPerStudent, setNilPerStudent] = useState(0);

    const studentOptions = studentList.map(student => ({
        value: student._id,
        label: student.name
    }));

    useEffect(() => {
        if (nilData.totalAmount && totalStudents) {
            setNilPerStudent((nilData.totalAmount / totalStudents).toFixed(2));
        } else {
            setNilPerStudent(0);
        }
    }, [nilData.totalAmount, totalStudents]);

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
            setIsModalOpen(false);
        } catch (error) {
            console.error('There was an error:', error);
        }
    };

    return (
        <>
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '1em',
                        width: '80%',
                        maxWidth: '400px',
                        maxHeight: '80vh',
                        overflow: 'auto'
                    }}>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 h-96 overflow-auto">
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
                                value={nilData.totalStudents}
                                onChange={handleTotalStudentsChange}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="students" className="label">
                                <span className="label-text">Students</span>
                            </label>
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">NIL Value per Student</span>
                            </label>
                            <p className="w-full">
                                $ {nilPerStudent}
                            </p>
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            Submit NIL Data
                        </button>
                    </form>
                    <button onClick={() => setIsModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormNIL;