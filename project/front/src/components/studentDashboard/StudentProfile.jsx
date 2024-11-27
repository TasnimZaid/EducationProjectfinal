import React, { useState } from 'react';
import { BookOpen, Globe, PenTool, Calculator } from 'lucide-react';
import NavBar from '../NavBar';
import QuizzesOfStudent from './QuizzesOfStudent';
import StudentMaterials from './StudentMaterials';
import space from "./assets/space.png"

const subjects = [
  { name: 'Math', icon: Calculator, color: 'bg-pink-400' },
  { name: 'History', icon: Globe, color: 'bg-blue-300' },
  { name: 'Literature', icon: BookOpen, color: 'bg-purple-300' },
  { name: 'Art', icon: PenTool, color: 'bg-yellow-400' },
  // Add more subjects as needed
];

const SubjectCard = ({ name, icon: Icon, color }) => (
  <div className={`p-4 rounded-lg shadow-md ${color}`}>
    <Icon className="w-8 h-8 mb-2 text-white" />
    <p className="font-semibold text-white">{name}</p>
  </div>
);

const StudentDashboard = ({ studentName }) => {
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('quizzes'); // Add state for active tab

  const toggleBackground = () => {
    setIsBackgroundVisible(!isBackgroundVisible);
  };

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ backgroundImage: isBackgroundVisible ? `url('https://i.pinimg.com/originals/04/07/ab/0407ab73436f384a17ca9258699c100f.gif')` : 'none' }}>
      <NavBar />

      <div className="container mx-auto px-4 py-8 bg-opacity-70 bg-gray-800 rounded-lg">
        {/* Flex container for button alignment */}
        <div className="flex justify-end mb-4 mt-4 mr-16">
          <button 
            onClick={toggleBackground} 
            className="px-4 py-2 bg-[#0e0b3f70] text-white rounded-lg hover:bg-opacity-80"
          >
            {isBackgroundVisible ? 'Remove Background' : 'Show Background'}
          </button>
        </div>

        {/* Main profile card */}
        <div className="bg-gradient-to-r from-[#67E8F9] to-[#67e8f9e8] rounded-lg shadow-lg overflow-hidden w-[90%] mx-auto mt-14 p-10 transform transition-transform duration-500 ease-in-out hover:scale-105 z-20">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="md:w-2/3 p-8">
              {/* Animated heading */}
              <h1 className="text-5xl font-bold text-black animate-bounce">Don't Get Lost,</h1>
              <h2 className="text-4xl font-extrabold text-white mt-2 animate-pulse">
                BE PRODUCTIVE
              </h2>

              {/* Subtext */}
              <p className="text-white font-bold mt-10">
                Focus on your studies and stay on top of your goals. Create a path to success by staying organized and making the most of your student life. It's time to shine!
              </p>
            </div>

            {/* Profile image and quote */}
            <div className="md:w-1/3 p-8 text-white flex flex-col items-center space-y-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Student profile"
                className="w-32 h-32 rounded-full shadow-lg border-4 border-white"
              />
              <p className="text-center font-semibold">
                "Success is the result of hard work, learning, and persistence. Keep pushing forward!"
              </p>
            </div>
          </div>
        </div>

        {/* Tabs for Quizzes and Materials */}
        <div className="flex justify-center mt-10 mb-6">
          <button
            className={`px-6 py-3 mx-2 font-semibold text-white rounded-lg ${activeTab === 'quizzes' ? 'bg-blue-500' : 'bg-gray-400 hover:bg-gray-500'}`}
            onClick={() => handleTabChange('quizzes')}
          >
            Quizzes
          </button>
          <button
            className={`px-6 py-3 mx-2 font-semibold text-white rounded-lg ${activeTab === 'materials' ? 'bg-green-500' : 'bg-gray-400 hover:bg-gray-500'}`}
            onClick={() => handleTabChange('materials')}
          >
            Materials
          </button>
        </div>

        {/* Content based on selected tab */}
        <div className="mt-10">
          {activeTab === 'quizzes' ? (
            <QuizzesOfStudent />
          ) : (
            <StudentMaterials />
          )}
        </div>

        {/* Subject cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-20 mr-14 ml-14">
          {subjects.map((subject, index) => (
            <SubjectCard key={index} {...subject} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
