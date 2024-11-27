import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit2, Check, X } from 'lucide-react';
import Sidebar from '../../../assestComponent/Sidebar';
import axios from 'axios';

const TeacherProfileInfo = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school_name: '',
    university_name: '',
    role: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    language: '',
    phone_number: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    consultation_fee: '',
    years_of_experience: '',
    specialization: '',
    services: [],
  });
  const [editingField, setEditingField] = useState(null);
  const [passwordError, setPasswordError] = useState('');

  const teacherId = sessionStorage.getItem('teacherId');

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/teacherprofile/${teacherId}`);
        setTeacher(response.data);
        setFormData({
          ...response.data,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching teacher profile');
        setLoading(false);
      }
    };

    fetchTeacherProfile();
  }, [teacherId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (field) => {
    try {
      if (field === 'password') {
        if (formData.newPassword !== formData.confirmNewPassword) {
          setPasswordError("New passwords don't match");
          return;
        }
        await axios.patch(`http://localhost:3000/api/teacherprofile/${teacherId}/password`, {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      } else {
        await axios.patch(`http://localhost:3000/api/teacherprofile/${teacherId}`, { [field]: formData[field] });
        setTeacher({ ...teacher, [field]: formData[field] });
      }
      setEditingField(null);
      setPasswordError('');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error updating teacher profile');
    }
  };

  const startEditing = (field) => {
    setEditingField(field);
    setPasswordError('');
  };

  const cancelEditing = () => {
    setFormData({
      ...teacher,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
    setEditingField(null);
    setPasswordError('');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post(`http://localhost:3000/api/teacherprofile/${teacherId}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTeacher({ ...teacher, teacher_img: response.data.imagePath });
    } catch (err) {
      setError('Error uploading image');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const renderField = (field, label, type = 'text', options = null) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {editingField === field ? (
          <div className="flex items-center mt-1">
            {type === 'select' ? (
              <select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            )}
            <button
              onClick={() => handleSubmit(field)}
              className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
            >
              <Check size={16} />
            </button>
            <button
              onClick={cancelEditing}
              className="ml-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-1 p-2 bg-gray-100 rounded-md">
            <span>{teacher[field]}</span>
            {field !== 'national_id' && field !== 'gender' && (
              <button
                onClick={() => startEditing(field)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <Edit2 size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-200">
    <div className="bg-gray-200">
      <Sidebar />
      <div className="max-w-7xl mx-auto p-6 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <motion.div
            className="bg-white p-4 rounded-lg shadow col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4">Teacher Profile</h2>
            <div className="flex items-center mb-4">
              <div className="relative">
                <img
                  src={`http://localhost:3000/${teacher.teacher_img}`}
                  alt="Teacher"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer"
                >
                  <Camera size={20} />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{teacher.name}</h3>
                <p className="text-gray-600">{teacher.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField('name', 'Name')}
              {renderField('email', 'Email')}
              {renderField('school_name', 'School Name')}
              {renderField('university_name', 'University Name')}
              {renderField('role', 'Role', 'select', ['teacher', 'consultant'])}
              {renderField('language', 'Language')}
              {renderField('phone_number', 'Phone Number')}
              {renderField('facebook', 'Facebook')}
              {renderField('instagram', 'Instagram')}
              {renderField('linkedin', 'LinkedIn')}
              {renderField('consultation_fee', 'Consultation Fee', 'number')}
              {renderField('years_of_experience', 'Years of Experience', 'number')}
              {renderField('specialization', 'Specialization')}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TeacherProfileInfo;
