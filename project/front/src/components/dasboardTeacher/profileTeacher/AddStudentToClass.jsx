import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Book, Users, Award, PlusCircle } from 'lucide-react';

const AddStudentToClass = () => {
  const [selectedClassId, setSelectedClassId] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [message, setMessage] = useState('');
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  const token = sessionStorage.getItem("token");
  const teacherId = sessionStorage.getItem("teacherId");
  const teacherName = sessionStorage.getItem("teacherName");
  const teacherEmail = sessionStorage.getItem("teacherEmail");
  const universityName = sessionStorage.getItem("universityName");


  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/${teacherId}/getTeacherClasses`);
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setError('Failed to fetch classes');
      }
    };
    fetchClasses();
  }, [teacherId]);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/addStudentToClass', {
        class_id: selectedClassId,
        national_id: nationalId,
        teacher_id: teacherId,
      });
      setMessage(response.data.message);
      setSelectedClassId('');
      setNationalId('');
    } catch (error) {
      console.error('Error adding student:', error);
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-xl mx-auto  bg-white  rounded-lg p-10">
      

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-black">Manage Students in Class</h2>
        <form onSubmit={handleAddStudent} className="space-y-4">
          <div>
            <label htmlFor="class-select" className="block text-sm font-medium text-black mb-1">
              Select Class
            </label>
            <select
              id="class-select"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Class</option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="national-id" className="block text-sm font-medium text-black mb-1">
              Student National ID
            </label>
            <input
              id="national-id"
              type="text"
              placeholder="Enter National ID"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            <PlusCircle size={18} className="mr-2" />
            Add Student to Class
          </button>
        </form>
        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStudentToClass;