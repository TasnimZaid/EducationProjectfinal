import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddQuizToClass = ({ quizId, onClose }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);

  const teacherId = sessionStorage.getItem('teacherId');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/${teacherId}/getTeacherClasses`); 
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleAddQuiz = async () => {
    try {
      await axios.post('http://localhost:3000/api/addQuizToClass', {
        quiz_id: quizId,
        class_id: selectedClass,
      });
      alert('Quiz added to class successfully!');
      onClose(); // Close the modal after adding
    } catch (error) {
      console.error("Error adding quiz to class:", error);
      alert('Failed to add quiz to class.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add Quiz to Class</h2>
        {loading ? (
          <p>Loading classes...</p>
        ) : (
          <div>
            <select 
              className="border border-gray-300 p-2 mb-4 w-full"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleAddQuiz}>
                Add Quiz
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddQuizToClass;
