import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book, CheckCircle, XCircle, PlusCircle, Users, Briefcase, GraduationCap, Search } from 'lucide-react';

// Shared styles
const cardStyle = "bg-white  rounded-lg overflow-hidden ";
const headingStyle = "text-2xl font-bold text-gray-800 mb-4";
const inputStyle = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
const buttonStyle = "w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center";
const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

const CreateClass = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");
        const teacherId = sessionStorage.getItem("teacherId");
        const teacherName = sessionStorage.getItem("teacherName");
        const teacherEmail = sessionStorage.getItem("teacherEmail");
        const universityName = sessionStorage.getItem("universityName");
      

        try {
            const response = await axios.post('http://localhost:3000/api/createClass', {
                name,
                teacher_id: teacherId
            });
            setMessage(response.data.message);
            setIsSuccess(true);
            setName('');
        } catch (error) {
            console.error('There was an error creating the class!', error);
            setMessage('Error creating class');
            setIsSuccess(false);
        }
    };

    return (
        <div className={`${cardStyle} max-w-md mx-auto p-6`}>
            <div className="flex items-center justify-center mb-6">
                <GraduationCap size={32} className="text-black mr-2" />
                <h2 className={headingStyle}>Create New Class</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label htmlFor="name" className={labelStyle}>
                        <Book size={18} className="inline mr-2" />
                        Class Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={inputStyle}
                        placeholder="Enter class name"
                    />
                </div>
                <button type="submit" className={buttonStyle}>
                    <PlusCircle size={18} className="mr-2" />
                    Create Class
                </button>
            </form>
            {message && (
                <div className={`mt-4 p-3 rounded-md flex items-center ${
                    isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {isSuccess ? (
                        <CheckCircle size={20} className="mr-2" />
                    ) : (
                        <XCircle size={20} className="mr-2" />
                    )}
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default CreateClass;