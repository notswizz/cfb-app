import React from 'react';
import NavBar from '../components/NavBar';

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <div className="hero min-h-screen bg-gradient-to-r from-green-200 to-blue-200">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Targeted
            </h1>
            <p className="mb-5">
              next-gen college football roster management
            </p>
            <div className="text-7xl sm:text-9xl mt-8">
              🏈🎯
            </div>
            <a href="/admin" className="btn btn-primary mt-10">Get Started</a>
          </div>
        </div>
      </div>
    </>
  );
  
  
};

export default LandingPage;
