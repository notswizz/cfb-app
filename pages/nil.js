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
            <FormNIL />
            <NILList/>
        </div>
        </>
    );
};

export default NILPage;