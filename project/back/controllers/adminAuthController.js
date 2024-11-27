const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../knex-config');
const SECRET_KEY = 'tasneem';  

// Sign Up (Super Admin)
const signUpSuperAdmin = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      // Hash and salt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create super admin or admin
      const [id] = await knex('admin').insert({
        name,
        email,
        password: hashedPassword,
        role: role || 'super_admin',  // Default to super_admin
        is_enabled: true  // Default to enabled
      }).returning('id');
  
      // Generate a JWT token for the new admin
      const token = jwt.sign(
        { id, role: role || 'super_admin' }, // Payload
        SECRET_KEY, // Secret key
        { expiresIn: '1h' } // Token expiration time
      );
  
      // Send response with token
      res.status(201).json({
        message: 'Admin created successfully',
        adminId: id,
        token
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
  };

// Sign In (Admin)
const signInAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the admin exists
      const admin = await knex('admin').where({ email }).first();
  
      if (!admin || !admin.is_enabled) {
        return res.status(403).json({ message: 'Admin not found or disabled' });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, admin.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: admin.id, role: admin.role }, 
        SECRET_KEY, 
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };
  

// Enable Admin (Super Admin only)
const enableAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    await knex('admin').where({ id: adminId }).update({ is_enabled: true });

    res.status(200).json({ message: 'Admin enabled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error enabling admin', error: error.message });
  }
};

// Disable Admin (Super Admin only)
const disableAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    await knex('admin').where({ id: adminId }).update({ is_enabled: false });

    res.status(200).json({ message: 'Admin disabled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error disabling admin', error: error.message });
  }
};

const getAllAdmins = async (req, res) => {
    try {
      const admins = await knex('admin').select('id', 'name', 'email', 'role', 'is_enabled');
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving admins', error: error.message });
    }
  };


  // Get all teachers
const getAllTeachers = async (req, res) => {
    try {
      const teachers = await knex('teacher').select('id', 'name', 'email', 'isActivate');
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching teachers', error: error.message });
    }
  };
  
  // Activate a teacher account
  const activateTeacher = async (req, res) => {
    const { id } = req.params;
    try {
      await knex('teacher').where({ id }).update({ isActivate: true });
      res.status(200).json({ message: 'Teacher account activated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error activating teacher account', error: error.message });
    }
  };
  
  // Deactivate a teacher account
  const deactivateTeacher = async (req, res) => {
    const { id } = req.params;
    try {
      await knex('teacher').where({ id }).update({ isActivate: false });
      res.status(200).json({ message: 'Teacher account deactivated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deactivating teacher account', error: error.message });
    }
  };
  

module.exports = { signUpSuperAdmin, signInAdmin, enableAdmin, disableAdmin , getAllAdmins , getAllTeachers , activateTeacher , deactivateTeacher };
