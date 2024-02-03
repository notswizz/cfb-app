// components/PlayerFilters.js
import React, { useState } from 'react';

const PlayerFilters = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange({ searchTerm: e.target.value, selectedClass, selectedPosition });
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    onFilterChange({ searchTerm, selectedClass: e.target.value, selectedPosition });
  };

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value);
    onFilterChange({ searchTerm, selectedClass, selectedPosition: e.target.value });
  };

  return (
    <div className="flex md:flex-col gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="input input-bordered input-accent w-full max-w-xs"
      />
      <select
        value={selectedClass}
        onChange={handleClassChange}
        className="select select-accent w-full max-w-xs"
      >
        <option value="">Filter by class</option>
        <option value="Freshman">Freshman</option>
        <option value="Sophomore">Sophomore</option>
        <option value="Junior">Junior</option>
        <option value="Senior">Senior</option>
        <option value="Super Senior">Super Senior</option>
      </select>
      <select
        value={selectedPosition}
        onChange={handlePositionChange}
        className="select select-accent w-full max-w-xs"
      >
        <option value="">Filter by position</option>
        <option value="QB">QB</option>
        <option value="RB">RB</option>
        <option value="WR">WR</option>
        <option value="TE">TE</option>
        <option value="OL">OL</option>
      </select>
    </div>
  );
};

export default PlayerFilters;
