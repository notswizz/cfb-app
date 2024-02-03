// pages/nil.js
import React from 'react';
import FormNIL from '../components/FormNIL';
import NavBar from '../components/NavBar';
import NILList from '../components/DisplayNIL';

const NILPage = () => {
    return (
        <>
        <NavBar />
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold text-center mb-6">NIL Submission</h1>
            <div className="flex flex-col sm:flex-row justify-between">
                <FormNIL />
                <NILList/>
            </div>
        </div>
        </>
    );
};

export default NILPage;