// pages/nil.js
import React from 'react';
import FormNIL from '../components/FormNIL';
import NavBar from '../components/NavBar';

const NILPage = () => {
    return (
        <>
        <NavBar />
        <div className="container mx-auto my-8">
       
            <h1 className="text-2xl font-bold text-center mb-6">NIL Submission</h1>
            <FormNIL />
        </div>
        </>
    );
};

export default NILPage;