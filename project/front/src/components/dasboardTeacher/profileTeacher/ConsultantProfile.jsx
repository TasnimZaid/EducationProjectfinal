import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Folder, FileText, MessageSquare, Users, Clock, Briefcase, ChevronRight, Bell, Search, X } from 'lucide-react';
import Sidebar from '../../../assestComponent/Sidebar';

const ConsultantRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [responseData, setResponseData] = useState({ feedback: '', quiz_id: null, exam_id: null, description: '' });

  const consultantId = sessionStorage.getItem("teacherId");
  const consultantName = sessionStorage.getItem("teacherName") || "Consultant";

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/consultant/${consultantId}/requests`);
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching requests.');
        setLoading(false);
      }
    };

    fetchRequests();
  }, [consultantId]);

  const handleResponseClick = (request) => {
    setCurrentRequest(request);
    setPopupVisible(true);
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    const { request_id, teacher_id } = currentRequest;

    try {
      await axios.post('http://localhost:3000/api/responses', {
        request_id,
        teacher_id,
        consultant_id: consultantId,
        ...responseData,
      });

      setPopupVisible(false);
      setResponseData({ feedback: '', quiz_id: null, exam_id: null, description: '' });
      // Optionally, refetch requests or update state
    } catch (err) {
      console.error('Error submitting response:', err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Sidebar/>
      {/* <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-700">Consultant Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search..." className="pl-8 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <Search className="absolute left-2 top-2 text-gray-400" size={20} />
            </div>
            <Bell className="text-gray-600 cursor-pointer hover:text-teal-600 transition-colors duration-300" />
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {consultantName.charAt(0)}
              </div>
              <span className="font-medium text-gray-700">{consultantName}</span>
            </div>
          </div>
        </div>
      </nav> */}

      <div className="p-6 font-sans max-w-7xl mx-auto pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Users className="text-blue-500 mb-2" size={28} />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Total Students</h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Clock className="text-green-500 mb-2" size={28} />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Pending Requests</h3>
            <p className="text-3xl font-bold text-green-600">{requests.filter(r => !r.is_completed).length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Briefcase className="text-purple-500 mb-2" size={28} />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Completed Requests</h3>
            <p className="text-3xl font-bold text-purple-600">{requests.filter(r => r.is_completed).length}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.slice(0, 3).map((request) => (
              <div key={request.id} className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:scale-105">
                <div className="flex justify-between items-start mb-4">
                  <MessageSquare className="text-teal-500" size={28} />
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${request.is_completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {request.is_completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Request #{request.id}</h3>
                <p className="text-gray-600 mb-4">{request.description.substring(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{request.request_type}</span>
                  <button onClick={() => handleResponseClick(request)} className="flex items-center text-teal-500 hover:text-teal-600 transition duration-300 ease-in-out">
                    Respond <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">All Consultation Requests</h2>
            <button className="text-teal-500 hover:text-teal-600 transition duration-300 ease-in-out font-semibold">View All</button>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="text-gray-400 mr-2" size={16} />
                        <span className="font-medium">#{request.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{request.request_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${request.is_completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {request.is_completed ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{request.payment_status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => handleResponseClick(request)} className="text-teal-500 hover:text-teal-600 transition duration-300 ease-in-out">
                        Respond
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {popupVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Respond to Request #{currentRequest.id}</h2>
                <button onClick={() => setPopupVisible(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmitResponse}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Feedback:</label>
                  <textarea 
                    value={responseData.feedback} 
                    onChange={(e) => setResponseData({ ...responseData, feedback: e.target.value })} 
                    className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none h-32"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Quiz ID:</label>
                  <input 
                    type="number" 
                    value={responseData.quiz_id} 
                    onChange={(e) => setResponseData({ ...responseData, quiz_id: e.target.value })} 
                    className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Exam ID:</label>
                  <input 
                    type="number" 
                    value={responseData.exam_id} 
                    onChange={(e) => setResponseData({ ...responseData, exam_id: e.target.value })} 
                    className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Description:</label>
                  <textarea 
                    value={responseData.description} 
                    onChange={(e) => setResponseData({ ...responseData, description: e.target.value })} 
                    className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none h-32"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button type="button" onClick={() => setPopupVisible(false)} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out font-medium">Cancel</button>
                  <button type="submit" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-teal-600 hover:to-blue-600 transition duration-300 ease-in-out font-medium">Submit Response</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultantRequests;