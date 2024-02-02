import React from 'react';
import Link from 'next/link';

const NavBar = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center space-x-4">
        <div className="flex space-x-4">
          <Link href="/admin" className="text-xl hover:text-indigo-300 transition duration-300 ease-in-out">
            Admin
          </Link>
          <Link href="/roster" className="text-xl hover:text-indigo-300 transition duration-300 ease-in-out">
            Roster
          </Link>
          <Link href="/nil" className="text-xl hover:text-indigo-300 transition duration-300 ease-in-out">
            NIL
          </Link>
        </div>
        <div className="text-3xl font-bold text-white hover:text-indigo-200 cursor-pointer transition duration-300 ease-in-out">
          <Link href="/" className="hover:underline">
            Targeted
          </Link>
        </div>
        <div className="text-lg font-light">
          {currentDate}
        </div>
      </div>
    </nav>
  );
  
};

export default NavBar;
