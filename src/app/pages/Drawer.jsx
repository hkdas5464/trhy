import React from 'react';

const Drawer = ({ isOpen, toggleDrawer }) => {
  return (
    <div 
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4">
        <button 
          onClick={toggleDrawer} 
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <nav className="mt-4">
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Home</a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Profile</a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Settings</a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Logout</a>
        </nav>
      </div>
    </div>
  );
};

export default Drawer;
