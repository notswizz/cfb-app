// pages/nil.js
import React, { useState } from 'react';
import FormNIL from '../components/FormNIL';
import NavBar from '../components/NavBar';
import NILList from '../components/DisplayNIL';

const NILPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex justify-center">
                <NavBar />
            </div>
            <div className="container mx-auto my-8">
                <div className="flex flex-col sm:flex-row justify-around items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                        Open Form
                    </button>
                    <FormNIL isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    <NILList/>
                </div>
            </div>
        </>
    );
};

export default NILPage;