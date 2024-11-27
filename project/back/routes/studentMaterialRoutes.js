const express = require('express');
const studentMaterialController = require('../controllers/studentMaterialController');
const router = express.Router();

// Route to get all student materials
router.get('/getAllStudentMaterials', studentMaterialController.getAllStudentMaterials);

// Route to get id student materials

router.get('/getMaterialsByStudentId/:student_id', studentMaterialController.getMaterialsByStudentId);

// Route to add a new student material
router.post('/addStudentMaterial', studentMaterialController.addStudentMaterial);

// Route to edit a student material
router.put('/editStudentMaterial/:id', studentMaterialController.editStudentMaterial);

// Route to delete a student material
router.delete('/deleteStudentMaterial/:id', studentMaterialController.deleteStudentMaterial);

module.exports = router;