import React, { useState } from 'react';
import { User, Book, FileText, Award, Video, CheckSquare, BarChart2, Calendar, Bell } from 'lucide-react';
import NavBar from '../NavBar';
import QuizzesOfStudent from './QuizzesOfStudent';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('Courses');

  const tabs = ['Courses', 'Assignments', 'Quizzes', 'Reports', 'Calendar'];

  const courses = [
    { id: 1, name: 'Mathematics', progress: 75 },
    { id: 2, name: 'Science', progress: 60 },
    { id: 3, name: 'Literature', progress: 90 },
  ];

  return (
    <div className="bg-[#F2F2F2] shadow-lg  pt-20 h-screen">
      <NavBar/>
      <div className=" p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-">
          {/* Left column */}
          {/* <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Student Profile</h2>
                <button className="text-blue-600 hover:text-blue-800">
                  <FileText size={20} />
                </button>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  SA
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Student Name</h3>
                <p className="text-sm text-gray-600 mb-4">Grade 10 • ID: 12345</p>
                <button className="bg-cyan-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full transition duration-300 ease-in-out">
                  View Full Profile
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                    <Book className="mr-2" size={18} />
                    <span>Library</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                    <Video className="mr-2" size={18} />
                    <span>Recorded Lessons</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                    <Award className="mr-2" size={18} />
                    <span>Achievements</span>
                  </a>
                </li>
              </ul>
            </div>
          </div> */}

          {/* Right column */}
          <div className="md:col-span-4 m-10 ">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, Student!</h1>
                <div className="flex space-x-4">
                  <button className="text-gray-600 hover:text-blue-600">
                    <Bell size={24} />
                  </button>
                  <button className="text-gray-600 hover:text-blue-600">
                    <Calendar size={24} />
                  </button>
                </div>
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-cyan-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-cyan-800 mb-2">Upcoming Quiz</h3>
                  <p className="text-sm text-cyan-600">Mathematics • Tomorrow</p>
                </div>
                <div className="bg-yellow-500 p-4 rounded-lg">
                  <h3 className="font-semibold text-cyan-800 mb-2">Assignment Due</h3>
                  <p className="text-sm text-cyan-600">Science Report • In 3 days</p>
                </div>
                <div className="bg-cyan-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-cyan-800 mb-2">New Lesson Available</h3>
                  <p className="text-sm text-cyan-600">Literature • Chapter 5</p>
                </div>
              </div> */}
              
              <div className="mb-6">
                <div className="flex space-x-4 border-b">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`pb-2 ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'Courses' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#343232] mb-4">Your Courses</h2>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="bg-[#f5f6f2ed] p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-gray-800">{course.name}</h3>
                          <span className="text-sm text-black">{course.progress}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-cyan-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

             {activeTab === 'Quizzes' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#343232] mb-4">Explore Your Quizzes
                  </h2>
                  <div className="space-y-4">
                    <QuizzesOfStudent/>
                  </div>
                </div>
              )}

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;