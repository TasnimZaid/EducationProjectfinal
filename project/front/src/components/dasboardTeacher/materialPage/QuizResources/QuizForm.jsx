import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { PlusCircle, X, BookOpen, Image, GraduationCap, FileQuestion, Check, AlertCircle } from 'lucide-react';

Modal.setAppElement('#root');


const storedUser = sessionStorage.getItem('teacherId');
const teacher_id = storedUser;

const QuizForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [quizId, setQuizID] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [quizData, setQuizData] = useState({
    title: '',
    quiz_img: '',
    grade: '',
    teacher_id: teacher_id,
    material_id: '',
    subject: ''
  });
console.log(teacher_id)
  const [currentQuestion, setCurrentQuestion] = useState({
    question_text: '',
    question_img: '',
    choices: [''],
    choices_images: [''],
    correct_answer: '',
    question_type: 'text'
  });

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getMaterials');
        setMaterials(response.data.materials);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, []);

  const handleQuizChange = (e) => {
    const { name, value } = e.target;

    if (name === 'material_id') {
      const selectedMaterial = materials.find((material) => material.id === parseInt(value));
      setQuizData((prev) => ({
        ...prev,
        material_id: value,
        subject: selectedMaterial ? selectedMaterial.name : ''
      }));
    } else {
      setQuizData({ ...quizData, [name]: value });
    }
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion({ ...currentQuestion, [name]: value });
  };

  const handleChoiceChange = (index, value, field) => {
    const updatedField = [...currentQuestion[field]];
    updatedField[index] = value;
    setCurrentQuestion({ ...currentQuestion, [field]: updatedField });
  };

  const addChoice = () => {
    setCurrentQuestion({
      ...currentQuestion,
      choices: [...currentQuestion.choices, ''],
      choices_images: [...currentQuestion.choices_images, '']
    });
  };

  const removeChoice = (index) => {
    const updatedChoices = currentQuestion.choices.filter((_, i) => i !== index);
    const updatedChoicesImages = currentQuestion.choices_images.filter((_, i) => i !== index);
    setCurrentQuestion({
      ...currentQuestion,
      choices: updatedChoices,
      choices_images: updatedChoicesImages
    });
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setQuizData({
      title: '',
      quiz_img: '',
      grade: '',
      teacher_id: teacher_id,
      material_id: '',
      subject: ''
    });
    resetCurrentQuestion();
    setQuizID(null);
  };

  const createQuiz = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/quizzes', quizData);
      const createdQuizId = response.data.quizId.id;
      setQuizID(createdQuizId);
      alert('Quiz created successfully!');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const addQuestion = async () => {
    if (!quizId) {
      alert('Please create a quiz first.');
      return;
    }

    try {
      const questionData = {
        ...currentQuestion,
        quiz_id: quizId,
        has_choices: currentQuestion.question_type === 'multiple_choice'
      };
      await axios.post('http://localhost:3000/api/questions', questionData);
      alert('Question added successfully!');
      resetCurrentQuestion();
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const resetCurrentQuestion = () => {
    setCurrentQuestion({
      question_text: '',
      question_img: '',
      choices: [''],
      choices_images: [''],
      correct_answer: '',
      question_type: 'text'
    });
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    await createQuiz();
  };

  return (
    <div className="p-4">
      <button
        onClick={handleOpenModal}
        className="bg-[#0b698b] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#bedcb6] hover:text-black transition duration-300 flex items-center"
      >
        <PlusCircle className="mr-2" size={20} />
        Create Quiz
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className="bg-white p-8 bg-[#ffff] rounded-xl shadow-2xl mx-auto mt-20 w-full max-w-4xl"
        overlayClassName="fixed inset-0 bg-[#000] bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-[#1e3a8a]">Create Quiz</h2>
        
        {!quizId ? (
          <form onSubmit={handleSubmitQuiz} className="space-y-4">
            <div className="flex items-center border-b border-[#cbd5e1] py-2">
              <BookOpen className="text-[#64748b] mr-3" size={24} />
              <input
                type="text"
                name="title"
                placeholder="Quiz Title"
                value={quizData.title}
                onChange={handleQuizChange}
                className="appearance-none bg-transparent border-none w-full text-[#1e293b] mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center border-b border-[#cbd5e1] py-2">
              <Image className="text-[#64748b] mr-3" size={24} />
              <input
                type="text"
                name="quiz_img"
                placeholder="Quiz Image URL"
                value={quizData.quiz_img}
                onChange={handleQuizChange}
                className="appearance-none bg-transparent border-none w-full text-[#1e293b] mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>

            <div className="flex items-center border-b border-[#cbd5e1] py-2">
              <GraduationCap className="text-[#64748b] mr-3" size={24} />
              <input
                type="text"
                name="grade"
                placeholder="Grade"
                value={quizData.grade}
                onChange={handleQuizChange}
                className="appearance-none bg-transparent border-none w-full text-[#1e293b] mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
            
            <div className="relative">
              <select
                name="material_id"
                value={quizData.material_id}
                onChange={handleQuizChange}
                className="block appearance-none w-full bg-white border border-[#cbd5e1] text-[#1e293b] py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-[#3b82f6]"
                required
              >
                <option value="">Select a Material</option>
                {materials.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#64748b]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>

            <button type="submit" className="bg-[#22c55e] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#16a34a] transition duration-300 flex items-center justify-center w-full">
              <Check className="mr-2" size={20} />
              Submit Quiz
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#1e3a8a] mb-4">Add Questions to Quiz</h3>
            <form className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="question_type"
                    value="text"
                    checked={currentQuestion.question_type === 'text'}
                    onChange={handleQuestionChange}
                    className="form-radio text-[#3b82f6]"
                  />
                  <span className="ml-2 text-[#1e293b]">Text</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="question_type"
                    value="multiple_choice"
                    checked={currentQuestion.question_type === 'multiple_choice'}
                    onChange={handleQuestionChange}
                    className="form-radio text-[#3b82f6]"
                  />
                  <span className="ml-2 text-[#1e293b]">Multiple Choice</span>
                </label>
              </div>

              <div className="flex items-center border-b border-[#cbd5e1] py-2">
                <FileQuestion className="text-[#64748b] mr-3" size={24} />
                <input
                  type="text"
                  name="question_text"
                  placeholder="Question Text"
                  value={currentQuestion.question_text}
                  onChange={handleQuestionChange}
                  className="appearance-none bg-transparent border-none w-full text-[#1e293b] mr-3 py-1 px-2 leading-tight focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center border-b border-[#cbd5e1] py-2">
                <Image className="text-[#64748b] mr-3" size={24} />
                <input
                  type="text"
                  name="question_img"
                  placeholder="Question Image URL"
                  value={currentQuestion.question_img}
                  onChange={handleQuestionChange}
                  className="appearance-none bg-transparent border-none w-full text-[#1e293b] mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>

              {currentQuestion.question_type === 'multiple_choice' && (
                <div className="space-y-2">
                  {currentQuestion.choices.map((choice, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, e.target.value, 'choices')}
                        placeholder={`Choice ${index + 1}`}
                        className="flex-grow appearance-none bg-transparent border-b border-[#cbd5e1] w-full text-[#1e293b] mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        value={currentQuestion.choices_images[index]}
                        onChange={(e) => handleChoiceChange(index, e.target.value, 'choices_images')}
                        placeholder="Image URL"
                        className="flex-grow appearance-none bg-transparent border-b border-[#cbd5e1] w-full text-[#1e293b] mr-3 py-1 px-2 leading-tight focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeChoice(index)}
                        className="bg-[#ef4444] text-white p-1 rounded-full hover:bg-[#dc2626] transition duration-300"
                        title="Remove Choice"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addChoice}
                    className="bg-[#eab308] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#ca8a04] transition duration-300 flex items-center"
                  >
                    <PlusCircle className="mr-2" size={20} />
                    Add Choice
                  </button>

                  <select
                    name="correct_answer"
                    value={currentQuestion.correct_answer}
                    onChange={handleQuestionChange}
                    className="block appearance-none w-full bg-white border border-[#cbd5e1] text-[#1e293b] py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-[#3b82f6]"
                    required
                  >
                    <option value="">Select Correct Answer</option>
                    {currentQuestion.choices.map((choice, index) => (
                      <option key={index} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {currentQuestion.question_type === 'text' && (
                <div className="flex items-center border-b border-[#cbd5e1] py-2">
                  <AlertCircle className="text-[#64748b] mr-3" size={24} />
                  <input
                    type="text"
                    name="correct_answer"
                    placeholder="Correct Answer"
                    value={currentQuestion.correct_answer}
                    onChange={handleQuestionChange}
                    className="appearance-none bg-transparent border-none w-full text-[#1e293b] mr-3 py-1 px-2 leading-tight focus:outline-none"
                    required
                  />
                </div>
              )}
              <button
                type="button"
                onClick={addQuestion}
                className="bg-[#22c55e] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#16a34a] transition duration-300 flex items-center justify-center w-full"
              >
                <PlusCircle className="mr-2" size={20} />
                Add Question
              </button>
            </form>
          </div>
        )}
        <button
          onClick={handleCloseModal}
          className="mt-6 bg-[#ef4444] text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300 flex items-center justify-center w-full"
        >
          <X className="mr-2" size={20} />
          Close
        </button>
      </Modal>
    </div>
  );
};

export default QuizForm;