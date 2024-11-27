import React from "react";
import { Search, ChevronDown, Bell } from 'lucide-react'; 

const Header = () => {
  return (
    <div className="bg-[#fff] border-b border-[#e5e7eb] px-20  flex items-center justify-between py-2">
      <div className="flex items-center flex-grow max-w-2xl relative">
        <Search className="text-teal w-5 h-5 absolute ml-3" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 bg-white border-2 border-teal rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal bg-teal bg-opacity-10 focus:border-transparent "
        />
      </div>
      
      <div className="flex items-center ml-4 space-x-4">
        <button className="flex items-center text-[#4b5563] text-sm font-medium hover:text-[#374151]">
          Quizizz library
          <ChevronDown className="ml-1 w-4 h-4" />
        </button>
        
        <button className="bg-teal bg-opacity-30 text-teal px-4 py-2 rounded-md text-sm font-medium hover:bg-teal">
          Enter code
        </button>
        
        <button className="text-[#4b5563] hover:text-[#374151]">
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;
