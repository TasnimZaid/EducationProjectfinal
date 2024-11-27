import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedQuizProfile = () => {
  const [savedQuizzes, setSavedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const teacherId = sessionStorage.getItem('teacherId')
  // Fetch saved quizzes
  const fetchSavedQuizzes = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/teachers/${teacherId}/saved-quizzes`);
      setSavedQuizzes(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedQuizzes();
  }, [teacherId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Quizzes</h2>
      {savedQuizzes.length === 0 ? (
        <p>No quizzes saved by this teacher.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {savedQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="p-4 bg-white shadow rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold">{quiz.title}</h3>
              <p className="text-gray-600">Category: {quiz.category || 'N/A'}</p>
              <p className="text-gray-600">Difficulty: {quiz.difficulty || 'N/A'}</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedQuizProfile;
