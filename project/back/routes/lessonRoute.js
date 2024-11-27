const express = require('express') ;
const resourcesController = require('../controllers/resourcesController')
const router = express.Router() ;


// Route to get all lessons
router.get('/getAllLessons', resourcesController.getAllLessons);
// Route to get lessons by teacher and material IDs
router.get('/:teacherId/material/:materialId', resourcesController.getLessons);
// Route to add a new lesson
router.post('/addLesson', resourcesController.addLesson);



// Activities routes
router.get('/activities', resourcesController.getAllActivities);
router.get('/activities/:teacherId/:materialId', resourcesController.getActivities);
router.post('/activities', resourcesController.addActivity);

// Experiments routes
router.get('/experiments', resourcesController.getAllExperiments);
router.get('/experiments/:teacherId/:materialId', resourcesController.getExperiments);
router.post('/experiments', resourcesController.addExperiment);


module.exports = router; 
