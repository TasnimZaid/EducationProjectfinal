
const express = require('express');
const adminAuth = require('../controllers/adminAuthController');
const { authenticateToken , isSuperAdmin , isAdmin } = require('../middleware/adminauth');
const router = express.Router();


// Sign up route for super admin
router.post('/signup', adminAuth.signUpSuperAdmin);
// Sign in route for all admins (super and regular)
router.post('/signin', adminAuth.signInAdmin);
// Enable or disable admins (only super admin can do this)
router.put('/enable-admin/:id',authenticateToken , isSuperAdmin , adminAuth.enableAdmin);
router.put('/disable-admin/:id', authenticateToken , isSuperAdmin , adminAuth.disableAdmin);
router.get('/All', authenticateToken , isSuperAdmin, adminAuth.getAllAdmins);
// Get all teachers
router.get('/getAllTeachers' , adminAuth.getAllTeachers);
// Activate a teacher
router.put('/activate/:id' ,  adminAuth.activateTeacher);
// Deactivate a teacher
router.put('/deactivate/:id',authenticateToken , isSuperAdmin ,  adminAuth.deactivateTeacher);


module.exports = router;
