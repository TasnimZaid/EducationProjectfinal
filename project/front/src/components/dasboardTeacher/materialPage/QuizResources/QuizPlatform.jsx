import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizCard from './QuizCard';
import QuizAnswer from './QuizAnswer';
import { Share2, MoreHorizontal, Play, Save, Sparkles } from 'lucide-react';
import QuizForm from './QuizForm';
import AddQuizToClass from './AddQuizToClass';
import QuizTabs from '../Tabs';

const QuizPlatform = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showAddToClassModal, setShowAddToClassModal] = useState(false);
  const teacherId = sessionStorage.getItem('teacherId')
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getAllQuizz');
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const saveQuiz = async () => {
    if (!selectedQuiz) return;

    setSaving(true);
    try {
      const response = await axios.post('http://localhost:3000/api/teachers/save-quiz', {
        teacher_id: teacherId, 
        quiz_id: selectedQuiz.quiz_id
      });
      console.log(response.data.message);
      alert('Quiz saved successfully!');
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert('Failed to save quiz. It might already be saved or there was an error.');
    } finally {
      setSaving(false);
    }
  };

  const openAddToClassModal = () => {
    if (selectedQuiz) {
      setShowAddToClassModal(true);
    } else {
      alert("Please select a quiz first.");
    }
  };

  const closeAddToClassModal = () => {
    setShowAddToClassModal(false);
  };

  const filteredQuizzes = (activeTab === 'All' || activeTab === 'Quizzes') 
    ? quizzes 
    : quizzes.filter(quiz => quiz.material_name === activeTab);

  return (
    <div className="container mx-auto h-screen flex flex-col">

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 flex-grow overflow-hidden">
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md overflow-hidden flex flex-col p-4">
          <div className="text-sm font-bold mb-6 text-[#111827] flex justify-between items-center">
            <span>{filteredQuizzes.length} Quizzes</span>
            <QuizForm />
          </div>

          <div className="overflow-y-auto flex-grow">
            {filteredQuizzes.map((quiz) => (
              <QuizCard 
                key={quiz.quiz_id} 
                {...quiz} 
                onClick={() => setSelectedQuiz(quiz)}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col overflow-y-auto sm-h-[1000px] bg-white rounded-lg shadow-md p-6">
          {selectedQuiz ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#111827]">{selectedQuiz.quiz_title}</h2>
                <button className="text-[#4B5563] hover:text-[#111827] transition-colors duration-200">
                </button>
              </div>
              <div className="text-sm text-[#4B5563] mb-6">By {selectedQuiz.teacher_name} | {selectedQuiz.material_name}</div>
              <div className="flex flex-wrap gap-2 mb-6">
                {/* <button className="bg-[#10B981] text-white px-4 py-2 rounded-md hover:bg-[#059669] transition-colors duration-200 flex items-center">
                  <Play size={18} className="mr-2" /> Play
                </button> */}
                <button 
                  className="border border-[#D1D5DB] text-[#374151] px-4 py-2 rounded-md flex items-center hover:bg-[#F3F4F6] transition-colors duration-200"
                  onClick={saveQuiz}
                  disabled={saving}
                >
                  <Save size={18} className="mr-2" /> 
                  {saving ? 'Saving...' : 'Save Quiz'}
                </button>
                <button 
                  className="border border-[#D1D5DB] text-[#374151] px-4 py-2 rounded-md flex items-center hover:bg-[#F3F4F6] transition-colors duration-200"
                  onClick={openAddToClassModal}
                >
                  Assign to Class
                </button>
                {/* <button className="border border-[#D1D5DB] text-[#374151] p-2 rounded-md hover:bg-[#F3F4F6] transition-colors duration-200">
                  <MoreHorizontal size={18} />
                </button> */}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Quiz Questions</h3>
                {selectedQuiz.questions && selectedQuiz.questions.length > 0 ? (
                  selectedQuiz.questions.map((question, index) => (
                    <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium mb-2">{index + 1}. {question.question_text}</p>
                      <ul className="list-disc pl-6">
                        {question.options && question.options.map((option, optionIndex) => (
                          <li key={optionIndex} className="mb-1">{option}</li>
                        ))}
                      </ul>
                      {showAnswers && question.correct_answer && (
                        <QuizAnswer answer={question.correct_answer} />
                      )}
                    </div>
                  ))
                ) : (
                  <p>No questions available for this quiz.</p>
                )}
                {selectedQuiz.questions && selectedQuiz.questions.length > 0 && (
                  <button
                    className="mt-4 bg-[#3B82F6] text-white px-4 py-2 rounded-md hover:bg-[#2563EB] transition-colors duration-200 flex items-center"
                    onClick={() => setShowAnswers(!showAnswers)}
                  >
                    <Sparkles size={18} className="mr-2" />
                    {showAnswers ? 'Hide Answers' : 'Show Answers'}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-[#6B7280]">Select a quiz to view details</div>
          )}
        </div>
      </div>

      {showAddToClassModal && selectedQuiz && (
        <AddQuizToClass 
          quizId={selectedQuiz.quiz_id} 
          onClose={closeAddToClassModal} 
        />
      )}
    </div>
  );
};

export default QuizPlatform;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import QuizCard from './QuizCard';
// import QuizAnswer from './QuizAnswer';
// import { Book, MessageSquare, FileText, Video, Share2, MoreHorizontal, Play, Save, Sparkles } from 'lucide-react';
// import QuizForm from './QuizForm';

// const NavButton = ({ icon: Icon, text, isActive, onClick, color }) => (
//   <button
//     className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
//       isActive 
//         ? 'bg-[#F3F4F6] text-[#111827] shadow-md' 
//         : 'text-[#4B5563] hover:bg-[#F9FAFB]'
//     }`}
//     onClick={onClick}
//   >
//     <Icon size={20} style={{ color: isActive ? color : '#6B7280' }} className="mr-2" />
//     <span className={`font-medium ${isActive ? 'text-[#111827]' : 'text-[#4B5563]'}`} style={{ color: isActive ? color : '#4B5563' }}>{text}</span>
//   </button>
// );


// const QuizPlatform = () => {
//   const [activeTab, setActiveTab] = useState('All');
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/getAllQuizz');
//       setQuizzes(response.data);
//     } catch (error) {
//       console.error("Error fetching quizzes:", error);
//     }
//   };

//   const saveQuiz = async () => {
//     if (!selectedQuiz) return;

//     setSaving(true);
//     try {
//       const response = await axios.post('http://localhost:3000/api/teachers/save-quiz', {
//         teacher_id: 1, 
//         quiz_id: selectedQuiz.quiz_id
//       });
//       console.log(response.data.message);
//       alert('Quiz saved successfully!');
//     } catch (error) {
//       console.error("Error saving quiz:", error);
//       alert('Failed to save quiz. It might already be saved or there was an error.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const tabs = [
//     { name: 'All', icon: Book, color: '#10B981' }, 
//     { name: 'Quizzes', icon: Book, color: '#14B8A6' }, 
//     { name: 'Lessons', icon: MessageSquare, color: '#F59E0B' }, 
//     { name: 'Texts', icon: FileText, color: '#3B82F6' }, 
//     { name: 'Interactive Videos', icon: Video, color: '#EC4899' } 
//   ];

//   const filteredQuizzes = (activeTab === 'All' || activeTab === 'Quizzes') 
//     ? quizzes 
//     : quizzes.filter(quiz => quiz.material_name === activeTab);

//   return (
//     <div className="container mx-auto min-h-screen flex flex-col p-4 sm:p-6">
//       <div className="flex space-x-2 mb-6 py-5 overflow-x-auto bg-white p-2 rounded-lg shadow-sm">
//         {tabs.map((tab) => (
//           <NavButton 
//             key={tab.name}
//             icon={tab.icon}
//             text={tab.name}
//             isActive={activeTab === tab.name}
//             onClick={() => setActiveTab(tab.name)}
//             color={tab.color}
//           />
//         ))}
//       </div>

//       <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 flex-grow overflow-hidden">
//         <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md overflow-hidden flex flex-col p-4">
//           <div className="text-sm font-bold mb-6 text-[#111827] flex justify-between items-center">
//             <span>{filteredQuizzes.length} Quizzes</span>
//             <QuizForm />
//           </div>

//           <div className="overflow-y-auto flex-grow">
//             {filteredQuizzes.map((quiz) => (
//               <QuizCard 
//                 key={quiz.quiz_id} 
//                 {...quiz} 
//                 onClick={() => setSelectedQuiz(quiz)}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="w-full lg:w-1/2 flex flex-col overflow-hidden bg-white rounded-lg shadow-md p-4 sm:p-6">
//           {selectedQuiz ? (
//             <>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">{selectedQuiz.quiz_title}</h2>
//                 <button className="text-[#4B5563] hover:text-[#111827] transition-colors duration-200">
//                   <Share2 size={24} />
//                 </button>
//               </div>
//               <div className="text-sm text-[#4B5563] mb-6">By {selectedQuiz.teacher_name} | {selectedQuiz.material_name}</div>
//               <div className="flex flex-wrap gap-2 mb-6">
//                 <button className="bg-[#10B981] text-white px-3 sm:px-4 py-2 rounded-md hover:bg-[#059669] transition-colors duration-200 flex items-center">
//                   <Play size={18} className="mr-2" /> Play
//                 </button>
//                 <button 
//                   className="border border-[#D1D5DB] text-[#374151] px-3 sm:px-4 py-2 rounded-md flex items-center hover:bg-[#F3F4F6] transition-colors duration-200"
//                   onClick={saveQuiz}
//                   disabled={saving}
//                 >
//                   <Save size={18} className="mr-2" /> 
//                   {saving ? 'Saving...' : 'Save Quiz'}
//                 </button>
//                 <button className="border border-[#D1D5DB] text-[#374151] px-3 sm:px-4 py-2 rounded-md flex items-center hover:bg-[#F3F4F6] transition-colors duration-200">
//                   <Sparkles size={18} className="mr-2" /> Improve with AI
//                 </button>
//                 <button className="border border-[#D1D5DB] text-[#374151] p-2 rounded-md hover:bg-[#F3F4F6] transition-colors duration-200">
//                   <MoreHorizontal size={18} />
//                 </button>
//               </div>
//               <div className="flex justify-between items-center mb-6">
//                 <span className="font-semibold text-[#374151]">{selectedQuiz.questions.length} Questions</span>
//                 <div className="flex items-center">
//                   <span className="mr-2 text-sm text-[#6B7280]">Show Answers</span>
//                   <button 
//                     className={`w-12 h-6 rounded-full ${showAnswers ? 'bg-[#10B981]' : 'bg-[#D1D5DB]'} transition-colors duration-200 ease-in-out relative`}
//                     onClick={() => setShowAnswers(!showAnswers)}
//                   >
//                     <span className={`absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${showAnswers ? 'translate-x-6' : 'translate-x-1'}`} />
//                   </button>
//                 </div>
//               </div>
//               <div className="border-t border-[#E5E7EB] pt-4 overflow-y-auto">
//                 {selectedQuiz.questions.map((question, index) => (
//                   <div key={question.question_id} className="mb-6">
//                     <h3 className="font-semibold mb-2 text-[#111827]">Question {index + 1}</h3>
//                     <p className="text-[#374151] mb-2">{question.question_text}</p>
//                     {question.question_img && (
//                       <img src={question.question_img} alt="Question" className="mb-4 w-20 h-auto rounded-lg shadow-sm" />
//                     )}
//                     {showAnswers && question.choices.map((choice, choiceIndex) => (
//                       <QuizAnswer 
//                         key={choiceIndex} 
//                         text={choice} 
//                         isCorrect={choice === question.correct_answer}
//                         image={question.choices_images && question.choices_images[choiceIndex] ? question.choices_images[choiceIndex] : null}
//                       />
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div className="text-center text-[#6B7280]">Select a quiz to view details</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizPlatform;

