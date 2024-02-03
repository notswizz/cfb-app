import React from 'react';
import Link from 'next/link';

const NavBar = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <nav className="navbar bg-gradient-to-r from-primary to-secondary shadow-lg text-white">
      <div className="navbar-start">
        <Link href="/admin" className="btn btn-ghost btn-sm rounded-btn">
          Admin
        </Link>
        <Link href="/roster" className="btn btn-ghost btn-sm rounded-btn">
          Roster
        </Link>
        <Link href="/nil" className="btn btn-ghost btn-sm rounded-btn">
          NIL
        </Link>
      </div>

      <div className="navbar-center">
  <Link href="/" className="btn btn-ghost normal-case text-xl sm:text-2xl text-white font-bold tracking-widest transition duration-300 ease-in-out hover:bg-primary hover:text-secondary">
    Targeted
  </Link>
</div>


      <div className="navbar-end">
        <span className="text-sm sm:text-lg font-light">
          {currentDate}
        </span>
      </div>
    </nav>
  );
  
};

export default NavBar;
