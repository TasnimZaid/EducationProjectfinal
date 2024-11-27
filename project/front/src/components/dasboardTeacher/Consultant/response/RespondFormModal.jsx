import React, { useState } from 'react';
import { X, Send, FileText, Image } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ConsultantResponseForm = ({ requestId, teacherId, onClose, isVisible }) => {
    const storedUser = sessionStorage.getItem('teacherId');
  const consultant_id = storedUser;
  const [responseData, setResponseData] = useState({
    request_id: requestId,
    teacher_id: 4,
    consultant_id: consultant_id,
    pdf_url: '',
    image_url: '',
    payment_status: 'Pending'
  });

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/responses', responseData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Response sent successfully',
        timer: 2000,
        showConfirmButton: false
      });
      onClose();
    } catch (error) {
      console.error('Error sending response:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an issue sending the response. Please try again.',
      });
    }
  };

  const handleChange = (e) => {
    setResponseData({ ...responseData, [e.target.name]: e.target.value });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden relative transform transition-all">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gradient-to-r from-blue-500 to-blue-700">
          <h2 className="text-xl font-semibold text-white">Submit Response</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-gray-50">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FileText size={20} className="text-blue-500" />
               URL
            </label>
            <input
              type="text"
              name="pdf_url"
              value={responseData.pdf_url}
              onChange={handleChange}
              placeholder="Enter PDF URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition duration-200 ease-in-out"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Image size={20} className="text-green-500" />
              Image URL
            </label>
            <input
              type="text"
              name="image_url"
              value={responseData.image_url}
              onChange={handleChange}
              placeholder="Enter Image URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition duration-200 ease-in-out"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Send Response
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultantResponseForm;
