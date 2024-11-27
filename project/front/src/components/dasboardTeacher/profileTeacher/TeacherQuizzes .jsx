import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book, FileText, User, ChevronRight, ChevronLeft } from 'lucide-react';

const TeacherQuizzes = ({ teacherId }) => {
  const [data, setData] = useState({ classes: [], quizzes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/4/getQuizzesForTeacher`);
        
        // Remove duplicate quizzes based on quiz_name
        const uniqueQuizzes = response.data.quizzes.reduce((acc, current) => {
          const x = acc.find(item => item.quiz_name === current.quiz_name);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        setData({ ...response.data, quizzes: uniqueQuizzes });
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [teacherId]);

  const handleQuizClick = (quiz_id) => {
    console.log("Quiz ID:", quiz_id);
  };

  const scrollContainer = (direction) => {
    const container = document.getElementById('quizzesContainer');
    if (container) {
      container.scrollBy({ left: direction * 300, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10 p-4 bg-red-100 rounded-lg">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <div className="relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <FileText className="mr-2" size={24} />
           Quizzes
        </h2>
        <div className="flex items-center">
          <button 
            onClick={() => scrollContainer(-1)} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <div 
            id="quizzesContainer" 
            className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {data.quizzes.length > 0 ? (
              data.quizzes.map((quiz) => (
                <div 
                  key={quiz.quiz_id} 
                  className="flex-shrink-0 w-64 bg-white p-4 rounded-md cursor-pointer hover:bg-green-50 transition-colors duration-200 border border-[#a7a6a6]"
                  onClick={() => handleQuizClick(quiz.quiz_id)}
                >
                  <h3 className="font-medium text-green-700">{quiz.quiz_name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Class: {quiz.class_name}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <User size={16} className="mr-1" />
                    <span>{quiz.student_name}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No quizzes found for this teacher.</p>
            )}
          </div>
          <button 
            onClick={() => scrollContainer(1)} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherQuizzes;