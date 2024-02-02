import React from 'react';
import Link from 'next/link';

const NavBar = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 sm:p-4 shadow-md">
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4">
      <div className="flex flex-col sm:flex-row sm:space-x-4 items-center">
        <Link href="/admin" className="text-lg sm:text-xl hover:text-indigo-300 transition duration-300 ease-in-out">
          Admin
        </Link>
        <Link href="/roster" className="text-lg sm:text-xl hover:text-indigo-300 transition duration-300 ease-in-out">
          Roster
        </Link>
        <Link href="/nil" className="text-lg sm:text-xl hover:text-indigo-300 transition duration-300 ease-in-out">
          NIL
        </Link>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-white hover:text-indigo-200 cursor-pointer transition duration-300 ease-in-out">
        <Link href="/" className="hover:underline">
          Targeted
        </Link>
      </div>
      <div className="text-sm sm:text-lg font-light">
        {currentDate} {/* Ensure currentDate is defined in your component */}
      </div>
    </div>
  </nav>
  
  );
  
};

export default NavBar;
