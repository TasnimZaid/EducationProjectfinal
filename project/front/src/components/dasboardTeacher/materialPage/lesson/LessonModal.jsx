import React, { useState } from 'react';
import axios from 'axios';

const LessonModal = ({ isOpen, onClose, onLessonAdded }) => {

  const storedUser = sessionStorage.getItem('teacherId');
const teacher_id = storedUser;
  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    lesson_img: '',
    pdf_url: '',
    word_url: '',
    video_url: '',
    other_file_url: '',
    is_free: false,
    subscription_price: null,
    material_id: 24, 
    subject: '',
    teacher_id: teacher_id,
    grade: '', 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLessonData({
      ...lessonData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/addLesson', lessonData);
      onLessonAdded(response.data);
      onClose(); // Close modal after adding lesson
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-lg font-bold mb-4">Add New Lesson</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={lessonData.title}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={lessonData.description}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <input
            type="text"
            name="lesson_img"
            placeholder="Image URL"
            value={lessonData.lesson_img}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="pdf_url"
            placeholder="PDF URL"
            value={lessonData.pdf_url}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="word_url"
            placeholder="Word Document URL"
            value={lessonData.word_url}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="video_url"
            placeholder="Video URL"
            value={lessonData.video_url}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="other_file_url"
            placeholder="Other File URL"
            value={lessonData.other_file_url}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              name="is_free"
              checked={lessonData.is_free}
              onChange={handleChange}
              className="mr-2"
            />
            Free
          </label>
          <input
            type="number"
            name="subscription_price"
            placeholder="Subscription Price (if applicable)"
            value={lessonData.subscription_price || ''}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={lessonData.subject}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <input
            type="text"
            name="grade" // Add grade input
            placeholder="Grade"
            value={lessonData.grade}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <div className="flex justify-end">
            <button type="button" className="mr-2 bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonModal;
