// NavButton.js
import React from 'react';

const NavButton = ({ icon: Icon, text, isActive, onClick }) => (
  <button 
    className={`flex items-center px-4 py-2 rounded-t-md text-sm ${
      isActive 
        ? 'bg-[#8b5cf6] text-[#fff]' 
        : 'bg-[#fff] text-[#4b5563] border border-[#e5e7eb] border-b-0'
    }`}
    onClick={onClick}
  >
    <Icon size={18} className={`mr-2 ${isActive ? 'text-[#fff]' : 'text-[#4b5563]'}`} />
    {text}
  </button>
);

export default NavButton;
