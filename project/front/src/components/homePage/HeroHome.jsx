import React, { useState, useEffect } from "react";
import hero1 from './assets/1.png';
import hero2 from './assets/2.png';
import { Link } from 'react-router-dom';

function HeroHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const slides = [
    {
      title: "EMPOWERING EDUCATION",
      subtitle: "INSPIRING MINDS, SHAPING FUTURES",
      description:
        "EduSource: Your comprehensive platform for educational resources. Empower teachers, engage students, and revolutionize the learning experience.",
    },
    {
      title: "INNOVATIVE LEARNING",
      subtitle: "BRIDGING KNOWLEDGE GAPS",
      description:
        "Discover a world of interactive lessons, cutting-edge tools, and collaborative spaces designed to enhance the educational journey.",
    },
    {
      title: "FUTURE-READY SKILLS",
      subtitle: "PREPARING FOR TOMORROW",
      description:
        "Equip learners with the skills they need to thrive in a rapidly evolving world. From coding to critical thinking, we've got you covered.",
    },
  ];

  useEffect(() => {
    const storedUser = sessionStorage.getItem('teacherId');
    if (storedUser) {
      setIsLoggedIn(true); // If teacherId is found, user is logged in
    }

    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Image Section - Hidden on small screens */}
      <div className="absolute inset-0 flex hidden lg:flex">
        <div className="w-[70%] h-full">
          <img src={hero1} alt="Hero image 1" className="h-full object-cover" />
        </div>
        <div className="w-[30%] h-full">
          <img src={hero2} alt="Hero image 2" className="h-full object-cover" />
        </div>
      </div>
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Text and Buttons Section */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full text-center text-[#2F32A2] px-4">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 animate-slide-in-top">
          {slides[currentSlide].title}
        </h1>
        <h2 className="text-2xl lg:text-3xl font-semibold text-cyan-300 mb-6 animate-slide-in-bottom">
          {slides[currentSlide].subtitle}
        </h2>
        <p className="max-w-2xl mb-8 animate-fade-in">
          {slides[currentSlide].description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
          {!isLoggedIn && (
            <>
              <Link to="/login">
                <button className="bg-gradient-to-r from-cyan-500 to-[#2F32A2] hover:from-[#2F32A2] hover:to-cyan-500 text-white font-bold py-2 px-6 rounded-full transition duration-300 animate-pulse">
                  FOR TEACHERS
                </button>
              </Link>

              <Link to="/register">
                <button className="bg-gradient-to-r from-[#2F32A2] to-cyan-500 hover:from-cyan-500 hover:to-[#2F32A2] text-white font-bold py-2 px-6 rounded-full transition duration-300 animate-pulse">
                  FOR CONSULTANT
                </button>
              </Link>
            </>
          )}
        </div>
        <div className="flex mt-8 space-x-2 animate-fade-in">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide
                  ? "bg-[#2F32A2]"
                  : "bg-[#2F32A2] bg-opacity-50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroHome;
