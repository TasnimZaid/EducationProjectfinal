import React, { useState, useEffect } from 'react';
import { Users, AlertCircle, UserCheck, UserX, RefreshCw, Loader2 } from "lucide-react";
import api from '../api';
import Sidebar from '../Sidebar';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem('token');

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await api.get('admin/getAllTeachers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching teachers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [token]);

  const toggleActivation = async (teacherId, isActivate) => {
    try {
      const endpoint = isActivate ? `admin/deactivate/${teacherId}` : `admin/activate/${teacherId}`;
      await api.put(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === teacherId ? { ...teacher, isActivate: !isActivate } : teacher
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while toggling activation.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-poppins">
      <Sidebar />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Users className="mr-2" /> Teacher Management
            </h2>
            <button
              onClick={fetchTeachers}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300 ease-in-out"
            >
              <RefreshCw className="mr-2" /> Refresh
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50 transition duration-300 ease-in-out">
                      <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${teacher.isActivate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {teacher.isActivate ? <UserCheck className="inline mr-1" size={14} /> : <UserX className="inline mr-1" size={14} />}
                          {teacher.isActivate ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleActivation(teacher.id, teacher.isActivate)}
                          className={`flex items-center px-3 py-1 border rounded-md text-sm font-medium transition duration-300 ease-in-out ${
                            teacher.isActivate
                              ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100'
                              : 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100'
                          }`}
                        >
                          {teacher.isActivate ? (
                            <>
                              <UserX className="mr-1" size={14} /> Deactivate
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-1" size={14} /> Activate
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherManagement;