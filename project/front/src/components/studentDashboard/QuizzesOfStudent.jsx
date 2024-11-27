import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Book, User, Award, BookOpen } from 'lucide-react';

const QuizzesOfStudent = ({ studentId }) => {
  const [quizzesBySubject, setQuizzesBySubject] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/student/9/getStudentQuizzes`);
        const groupedQuizzes = response.data.reduce((acc, quiz) => {
          if (!acc[quiz.subject]) {
            acc[quiz.subject] = [];
          }
          acc[quiz.subject].push(quiz);
          return acc;
        }, {});
        setQuizzesBySubject(groupedQuizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, [studentId]);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject === selectedSubject ? null : subject);
    setSelectedQuizId(null);
  };

  const handleQuizClick = (quizId) => {
    setSelectedQuizId(quizId);
    console.log('Selected Quiz ID:', quizId);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen text-gray-800">
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Object.keys(quizzesBySubject).map((subject) => (
          <div
            key={subject}
            className={`bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
              selectedSubject === subject ? 'ring-2 ring-indigo-400' : ''
            }`}
            onClick={() => handleSubjectClick(subject)}
          >
            <BookOpen className="text-indigo-500 mb-2" size={24} />
            <h2 className="font-semibold text-sm mb-1">{subject}</h2>
            <p className="text-xs text-gray-500">
              {quizzesBySubject[subject].length} quizzes
            </p>
          </div>
        ))}
      </div>

      {selectedSubject && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">Quizzes for {selectedSubject}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {quizzesBySubject[selectedSubject].map((quiz) => (
              <div
                key={quiz.quizId}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleQuizClick(quiz.quizId)}
              >
                <img
                  src={quiz.quiz_img}
                  alt={quiz.title}
                  className="w-full h-24 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1 text-indigo-600 truncate">
                    {quiz.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <Award className="mr-1" size={12} />
                    Grade: {quiz.grade}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="mr-1" size={12} />
                    {quiz.teacherName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedQuizId && (
        <p className="mt-6 text-center text-sm font-semibold text-indigo-600">
          Selected Quiz ID: {selectedQuizId}
        </p>
      )}
    </div>
  );
};

export default QuizzesOfStudent;