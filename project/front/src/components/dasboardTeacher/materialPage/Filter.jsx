import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X, Hash, GraduationCap, HelpCircle, BookOpen, Languages, SortAsc } from 'lucide-react';

const FilterOption = ({ title, count, isOpen, onClick, children, icon: Icon }) => (
  <div className="border-b border-[#e5e7eb] last:border-b-0">
    <button
      className="flex items-center justify-between w-full py-3 px-4 text-left hover:bg-[#f9fafb] transition-colors duration-200"
      onClick={onClick}
    >
      <span className="flex items-center text-[#374151] font-medium">
        <Icon size={18} className="mr-2 text-[#6b7280]" />
        {title}
        {count !== undefined && (
          <span className="ml-2 bg-[#f3e8ff] text-[#7e22ce] text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </span>
      {isOpen ? (
        <ChevronUp size={18} className="text-[#9ca3af]" />
      ) : (
        <ChevronDown size={18} className="text-[#9ca3af]" />
      )}
    </button>
    {isOpen && (
      <div className="p-4 bg-white text-[#4b5563] border-t border-[#f3f4f6]">
        {children}
      </div>
    )}
  </div>
);

const FilterComponent = () => {
  const [openFilters, setOpenFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState(0);

  const toggleFilter = (filter) => {
    setOpenFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const clearAllFilters = () => {
    setOpenFilters({});
    setActiveFilters(0);
  };

  const filterOptions = [
    { title: 'No. of questions', key: 'questions', icon: Hash },
    { title: 'Grade', key: 'grade', icon: GraduationCap },
    { title: 'Question types', key: 'types', icon: HelpCircle },
    { title: 'Subjects', key: 'subjects', count: 1, icon: BookOpen },
    { title: 'Languages', key: 'languages', count: 2, icon: Languages },
    { title: 'Sort by', key: 'sort', icon: SortAsc },
  ];

  return (
  <div className='h-screen  bg-[#fff]   rounded-sm'>
    
    <div className="bg-white overflow-hidden ">
      <div className="p-4 border-b border-[#e5e7eb] ">
        <div className="flex items-center justify-between text-[#1f2937]">
          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-[#6b7280]" />
            <span className="font-semibold text-sm">Filters</span>
          </div>
          <button
            className="text-sm text-[#7c3aed] hover:text-[#6d28d9] transition-colors duration-200 flex items-center"
            onClick={clearAllFilters}
          >
            Clear all
            {activeFilters > 0 && (
              <span className="ml-1 bg-[#f3e8ff] text-[#7e22ce] text-xs font-semibold px-2 py-0.5 rounded-full">
                {activeFilters}
              </span>
            )}
            <X size={16} className="ml-1" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-[#e5e7eb] text-sm">
        {filterOptions.map((option) => (
          <FilterOption
            key={option.key}
            title={option.title}
            count={option.count}
            isOpen={openFilters[option.key]}
            onClick={() => toggleFilter(option.key)}
            icon={option.icon}
          >
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="form-checkbox text-[#7c3aed]" />
                <span>Option 1</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="form-checkbox text-[#7c3aed]" />
                <span>Option 2</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="form-checkbox text-[#7c3aed]" />
                <span>Option 3</span>
              </label>
            </div>
          </FilterOption>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FilterComponent;