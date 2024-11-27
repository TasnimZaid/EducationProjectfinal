import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sparkles, Share2, FileText, MoreHorizontal, Clock } from 'lucide-react';

const QuizPlatform = () => {
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // Fetch the quiz with questions by ID
    const fetchQuiz = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/quizzwithQ/1'); // Replace with actual quiz ID
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, []);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-[#f2f2f2] h-screen'>
      <div className="max-w-6xl mx-auto p-4 bg-[#f2f2f2] pt-20">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg mr-4"></div>
            <div>
              <h1 className="text-xl font-bold">{quiz.title}</h1>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">Assessment</span>
                <span className="mr-2">•</span>
                <span className="mr-2">Science</span>
                <span className="mr-2">•</span>
                <span>{quiz.plays} plays</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded-md flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Copy & edit
            </button>
            <button className="px-4 py-2 border rounded-md">Save</button>
            <button className="px-4 py-2 border rounded-md flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
            <button className="px-4 py-2 border rounded-md">Worksheet</button>
            <button className="px-4 py-2 border rounded-md">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 bg-white rounded-lg shadow-md p-4 h-80">
            <h2 className="text-lg font-semibold mb-4">Improve your activity</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                Add similar questions
              </li>
              <li className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                Add answer explanations
              </li>
              <li className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                Translate quiz
              </li>
              <li className="flex items-center">
                <MoreHorizontal className="w-4 h-4 mr-2" />
                More options
              </li>
            </ul>
          </div>

          <div className="col-span-2 space-y-4 overflow-y-auto max-h-screen">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">{index + 1}. {question.question_text}</span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>30 sec</span>
                    <span className="ml-2">1 pt</span>
                  </div>
                </div>

                {question.question_img && (
                  <img
                    src={question.question_img}
                    alt={`Question ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <ul className="space-y-2">
                  {question.choices.map((choice, choiceIndex) => (
                    <li key={choiceIndex} className="flex items-center space-x-2">
                      <span>{String.fromCharCode(65 + choiceIndex)}.</span>
                      {question.choices_images && question.choices_images[choiceIndex] && (
                        <img
                          src={question.choices_images[choiceIndex]}
                          alt={`Choice ${choiceIndex + 1}`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <span>{choice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPlatform;
