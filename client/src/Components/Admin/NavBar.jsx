import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';

function NavBar() {
  return (
    <div className="bg-white shadow px-4 py-2 flex justify-between items-center">
      <div className="flex border-2 rounded overflow-hidden">
        <input
          className="px-4 py-2 w-80 outline-none"
          type="search"
          placeholder="Search users ..."
        />
        <button className="flex items-center justify-center px-4 border-l">
          <FiSearch />
        </button>
      </div>
      <div className="relative">
        <button className="text-black-500 relative">
          <FiBell size={24} />
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
