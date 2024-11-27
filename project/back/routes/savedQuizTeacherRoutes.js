const express = require('express');
const router = express.Router();
const { getSavedQuizzesByTeacher, saveQuizForTeacher, removeSavedQuizForTeacher } = require('../controllers/saveQuizTeacherController');

// Get all saved quizzes for a specific teacher
router.get('/teachers/:teacher_id/saved-quizzes', getSavedQuizzesByTeacher);

// Save a quiz for a teacher
router.post('/teachers/save-quiz', saveQuizForTeacher);

// Remove a saved quiz for a teacher
router.delete('/teachers/remove-quiz', removeSavedQuizForTeacher);

module.exports = router;
