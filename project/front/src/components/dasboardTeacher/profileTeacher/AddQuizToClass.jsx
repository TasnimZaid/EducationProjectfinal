import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddQuizToClass = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [quizId, setQuizId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const token = sessionStorage.getItem("token");
        const teacherId = sessionStorage.getItem("teacherId");
        const teacherName = sessionStorage.getItem("teacherName");
        const teacherEmail = sessionStorage.getItem("teacherEmail");
        const universityName = sessionStorage.getItem("universityName");


    // Fetch classes for the teacher
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/${teacherId}/getTeacherClasses`);
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
                setError('Failed to fetch classes.');
            }
        };
        fetchClasses();
    }, [teacherId]);

    // Function to handle adding a quiz to a class
    const handleAddQuiz = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/addQuizToClass', {
                class_id: selectedClassId,
                quiz_id: quizId,
            });
            setMessage(response.data.message);
            // Clear inputs after submission
            setSelectedClassId('');
            setQuizId('');
        } catch (error) {
            console.error('Error adding quiz:', error);
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Add Quiz to Class</h2>
            <form onSubmit={handleAddQuiz}>
                <label htmlFor="class">Select Class:</label>
                <select
                    id="class"
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a class</option>
                    {classes.map((classItem) => (
                        <option key={classItem.id} value={classItem.id}>
                            {classItem.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="quizId">Quiz ID:</label>
                <input
                    type="text"
                    id="quizId"
                    value={quizId}
                    onChange={(e) => setQuizId(e.target.value)}
                    required
                />

                <button type="submit">Add Quiz</button>
            </form>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AddQuizToClass;
