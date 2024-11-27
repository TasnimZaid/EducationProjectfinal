import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Folder, User, X } from 'lucide-react';

const GetClassStudent = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [selectedClass, setSelectedClass] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = sessionStorage.getItem("token");
    const teacherId = sessionStorage.getItem("teacherId");
    const teacherName = sessionStorage.getItem("teacherName");
    const teacherEmail = sessionStorage.getItem("teacherEmail");
    const universityName = sessionStorage.getItem("universityName");
    useEffect(() => {
        const fetchClassStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/${teacherId}/getClassStudentsByTeacherId`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching class students:', error);
                setError('Failed to fetch students.');
            }
        };
        fetchClassStudents();
    }, [teacherId]);

    const groupedStudents = students.reduce((acc, student) => {
        const className = student.class_name;
        if (!acc[className]) {
            acc[className] = [];
        }
        acc[className].push(student);
        return acc;
    }, {});

    const folderColors = [
        'bg-blue-100 text-blue-600',
        'bg-green-100 text-green-600',
        'bg-yellow-100 text-yellow-600',
        'bg-purple-100 text-purple-600',
        'bg-pink-100 text-pink-600',
        'bg-indigo-100 text-indigo-600',
    ];

    const openModal = (className) => {
        setSelectedClass(className);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedClass(null);
        setIsModalOpen(false);
    };

    return (
        <div className="p-4 mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold mb-6">Classes for Teacher ID: {teacherId}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {Object.keys(groupedStudents).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Object.entries(groupedStudents).map(([className, classStudents], index) => (
                        <div key={className} className="relative">
                            <div 
                                className={`cursor-pointer rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg ${folderColors[index % folderColors.length]}`}
                                onClick={() => openModal(className)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                    <Folder size={35} />
                                    
                                    <span className="text-sm font-semibold">{className}</span></div>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <span>{classStudents.length} students</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No classes found for this teacher.</p>
            )}

            {isModalOpen && selectedClass && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">{selectedClass}</h3>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Student Name</th>
                                    <th className="p-2 text-left">Teacher Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedStudents[selectedClass].map((student) => (
                                    <tr key={student.id} className="border-t">
                                        <td className="p-2 flex items-center">
                                            <User className="mr-2" size={16} />
                                            {student.student_name}
                                        </td>
                                        <td className="p-2">{student.teacher_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetClassStudent;