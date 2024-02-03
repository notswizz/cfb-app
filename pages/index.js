import React from 'react';
import NavBar from '../components/NavBar';

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-blue-200 text-gray-800 px-4">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-6 tracking-tight text-center leading-none">
          Targeted
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 max-w-md sm:max-w-lg text-center">
          Next-gen college football roster management
        </p>
        <div className="text-7xl sm:text-9xl mt-8">
          🏈🎯🗂️
        </div>
        <a href="#get-started" className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out text-lg">
          Get Started
        </a>
      </div>
    </>
  );
};

export default LandingPage;
