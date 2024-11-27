const express = require('express') ;
const classController = require('../controllers/classController')
const router = express.Router() ;

// Route to create a new class
router.post('/createClass', classController.createClass);

// Route to add students to a class
router.post('/addStudentToClass', classController.addStudentToClass);

// Route to get classes for a specific teacher
router.get('/:teacher_id/getTeacherClasses', classController.getTeacherClasses);

router.get('/:teacherId/getClassStudentsByTeacherId', classController.getClassStudentsByTeacherId);

// Router to add a quiz to a class 
router.post('/addQuizToClass' , classController.addQuizToClass )

// Route to get classes along with quizzes for a specific teacher
router.get('/:teacher_id/getTeacherClassWitQuizzes', classController.getClassStudentsByTeacherId );

// Fetch quizzes for a teacher by teacherId
router.get('/:teacher_id/getQuizzesForTeacher', classController.getQuizzesForTeacher );


// Fetch quizzes for a student by studentId
router.get('/student/:studentId/getStudentQuizzes', classController.getStudentQuizzes);


module.exports = router;
