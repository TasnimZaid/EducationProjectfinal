import React, { useEffect, useState, useRef } from "react";
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import EducationCardsSlider from "./EducationCardsSlider";
import axios from 'axios';
import NavBar from "../../NavBar";

// Subject button component
const SubjectButton = ({ name, img }) => (
  <button className="flex flex-col items-center space-y-2 min-w-[100px]">
    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-xl overflow-hidden">
      <img src={img} alt={name} className="w-full h-full object-cover" />
    </div>
    <span className="text-xs text-center">{name}</span>
  </button>
);

function MainResourcesPage() {
  const [subjects, setSubjects] = useState([]);
  const scrollContainerRef = useRef(null);



  // Fetch subjects from the API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Allmaterial');
        setSubjects(response.data);  
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);



  



  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="grid grid-cols-[auto,1fr] h-screen bg-[#F2F2F2]">
      <div className="">
        <NavBar />
      </div>
      
      <div className="overflow-y-auto p-10 mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center p-10">What will you teach today?</h1>
        
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for activities on any topic"
              className="w-full p-3 pr-10 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-[60px]"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="mt-20 w-[70%] mx-auto relative">
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="overflow-x-hidden" ref={scrollContainerRef}>
            <div className="flex space-x-4 pb-4">
              {subjects.map((subject) => (
                <SubjectButton key={subject.id} name={subject.name} img={subject.picture} />
              ))}
            </div>
          </div>
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="mt-8">
          <EducationCardsSlider />
        </div>
      </div>
    </div>
  );
}

export default MainResourcesPage;