import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TeacherResourceCard = ({ title, description, imgSrc }) => (
  <div className="flex-shrink-0 w-90 mr-6 ">
    <div>
      <div className="w-80 h-80 bg-gray-200 rounded-sm mb-4">
        <img src={imgSrc} alt={title} className="object-cover h-full w-full rounded-sm" />
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
    </div>
  </div>
);

const TeacherResourcesSlider = () => {
  const sliderRef = useRef(null);

  // Scroll automatically every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const container = sliderRef.current;
      if (container) {
        const scrollAmount = 300; // Amount to scroll
        const totalWidth = container.scrollWidth;
        const containerWidth = container.clientWidth;

        // Check if we reached the end of the scroll
        if (container.scrollLeft + scrollAmount >= totalWidth - containerWidth) {
          // Reset to the start for a looping effect
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll normally
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000); // Adjust the time interval as needed (in milliseconds)

    return () => clearInterval(interval); // Clear the interval on unmount
  }, []);

  const resources = [
    { title: "Lesson Plan Template", description: "Comprehensive template for structured lessons", imgSrc: "https://i.pinimg.com/enabled_lo/564x/28/f6/2e/28f62e1d6a2bde1e6ac0ae86b7d008df.jpg" },
    { title: "Classroom Management Guide", description: "Strategies for effective classroom control", imgSrc: "https://i.pinimg.com/564x/3b/ca/3d/3bca3dd3c12307f3e11f7074858dfe76.jpg" },
    { title: "Interactive Whiteboard Activities", description: "Engaging digital activities for any subject", imgSrc: "" },
    { title: "Student Assessment Toolkit", description: "Diverse methods for evaluating student progress", imgSrc: "https://i.pinimg.com/564x/01/b3/af/01b3af54bc1e83a23ba5466d230adba1.jpg" },
    { title: "STEM Project Ideas", description: "Hands-on projects for science and math", imgSrc: "" },
    { title: "Reading Comprehension Strategies", description: "Techniques to improve student understanding", imgSrc: "https://via.placeholder.com/300" },
    { title: "Creative Writing Prompts", description: "Inspiring ideas to get students writing", imgSrc: "https://via.placeholder.com/300" },
    { title: "Math Games for Engagement", description: "Fun activities to make math enjoyable", imgSrc: "https://via.placeholder.com/300" },
    { title: "Science Experiments for Kids", description: "Simple experiments to spark curiosity", imgSrc: "https://via.placeholder.com/300" },
    { title: "Art and Craft Ideas", description: "Creative projects to enhance student creativity", imgSrc: "https://via.placeholder.com/300" },
  ];

  // Inline styles to hide the scrollbar
  const scrollbarStyles = {
    overflowX: 'auto',
    scrollbarWidth: 'none', // For Firefox
  };

  const webkitScrollbarStyles = {
    '&::-webkit-scrollbar': {
      display: 'none', // Safari and Chrome
    },
  };

  return (
    
    <div className="py-40 h-screen bg-gray-50 ">
      <div>
        <h2 className="text-3xl font-bold  text-center mb-20  absolute rotate-[270deg] top-[142%] left-20">New in Teacher <br /> Resources</h2>
        <div className="relative ">
          <div
            ref={sliderRef}
            className="flex transition-all duration-500 ease-in-out ml-80" // Added transition for smoother scrolling
            style={{
              ...scrollbarStyles,
              ...webkitScrollbarStyles,
              scrollBehavior: 'smooth',
              display: 'flex',
            }}
          >
            {resources.map((resource, index) => (
              <TeacherResourceCard key={index} {...resource} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherResourcesSlider;
