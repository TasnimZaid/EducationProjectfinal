import React, { useState } from 'react';
import axios from 'axios';

const ExperimentModal = ({ isOpen, onClose, onExperimentAdded }) => {
  const storedUser = sessionStorage.getItem('teacherId');
  const teacher_id = storedUser;
  const [experimentData, setExperimentData] = useState({
    title: '',
    description: '',
    experiment_img: '',
    pdf_url: '',
    video_url: '',
    is_free: false,
    subscription_price: null,
    material_id: 24, // Replace with actual material ID
    subject: '',
    teacher_id: teacher_id, // Replace with actual teacher ID
    grade: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExperimentData({
      ...experimentData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/experiments', experimentData);
      onExperimentAdded(response.data);
      onClose(); // Close modal after adding experiment
    } catch (error) {
      console.error('Error adding experiment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-lg font-bold mb-4">Add New Experiment</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={experimentData.title}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={experimentData.description}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <input
            type="text"
            name="experiment_img"
            placeholder="Image URL"
            value={experimentData.experiment_img}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="pdf_url"
            placeholder="PDF URL"
            value={experimentData.pdf_url}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="video_url"
            placeholder="Video URL"
            value={experimentData.video_url}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              name="is_free"
              checked={experimentData.is_free}
              onChange={handleChange}
              className="mr-2"
            />
            Free
          </label>
          <input
            type="number"
            name="subscription_price"
            placeholder="Subscription Price (if applicable)"
            value={experimentData.subscription_price || ''}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={experimentData.subject}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={experimentData.grade}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <div className="flex justify-end">
            <button type="button" className="mr-2 bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Experiment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperimentModal;
