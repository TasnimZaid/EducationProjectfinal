import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Star } from 'lucide-react';

const FeedbackForm = ({ responseId }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5); // Default rating

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/responses/${responseId}/feedback`, { feedback_text: feedback, rating });
      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: 'Your feedback has been submitted successfully!',
      });
      setFeedback('');
      setRating(5); // Reset rating
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an issue submitting your feedback. Please try again.',
      });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">We value your feedback!</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          rows="4"
          required
        />
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4, 5].map(num => (
            <Star
              key={num}
              onClick={() => setRating(num)}
              className={`h-8 w-8 cursor-pointer ${num <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill={num <= rating ? 'currentColor' : 'none'}
              strokeWidth={1.5}
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-200"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
