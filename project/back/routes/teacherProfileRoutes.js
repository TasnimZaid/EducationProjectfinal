const express = require('express');
const router = express.Router();
const teacherProfileController = require('../controllers/teacherProfileController');

const upload = require('./../config/multer-config')

// Route for handling image uploads

router.post(
    "/teacherprofile/:id/image",
    upload.single('image'), 
    teacherProfileController.imageTeacherProfile
  );
   
   


// Get teacher profile
router.get('/teacherprofile/:id', teacherProfileController.getTeacherProfile);

// Update teacher profile
router.patch('/teacherprofile/:id', teacherProfileController.patchTeacherProfile);

// Update password
router.patch('/teacherprofile/:id/password', teacherProfileController.updatePassword);

module.exports = router;
