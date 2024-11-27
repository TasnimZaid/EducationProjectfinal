import React, { useState } from 'react';
import axios from 'axios';

const ActivityModal = ({ isOpen, onClose, onActivityAdded }) => {

  const teacherId = sessionStorage.getItem('teacherId');

  const [activityData, setActivityData] = useState({
    title: '',
    description: '',
    activity_img: '',
    pdf_url: '',
    video_url: '',
    is_free: false,
    subscription_price: null,
    material_id: 24, // Replace with actual material ID
    subject: '',
    teacher_id: teacherId, // Replace with actual teacher ID
    teacher_name: '', // Added teacher_name field
    grade: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActivityData({
      ...activityData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/activities', activityData);
      onActivityAdded(response.data);
      onClose(); // Close modal after adding activity
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-lg font-bold mb-4">Add New Activity</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={activityData.title}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={activityData.description}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <input
            type="text"
            name="activity_img"
            placeholder="Image URL"
            value={activityData.activity_img}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="pdf_url"
            placeholder="PDF URL"
            value={activityData.pdf_url}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="video_url"
            placeholder="Video URL"
            value={activityData.video_url}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              name="is_free"
              checked={activityData.is_free}
              onChange={handleChange}
              className="mr-2"
            />
            Free
          </label>
          <input
            type="number"
            name="subscription_price"
            placeholder="Subscription Price (if applicable)"
            value={activityData.subscription_price || ''}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={activityData.subject}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <input
            type="text"
            name="teacher_name"
            placeholder="Teacher Name"
            value={activityData.teacher_name}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={activityData.grade}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <div className="flex justify-end">
            <button type="button" className="mr-2 bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityModal;