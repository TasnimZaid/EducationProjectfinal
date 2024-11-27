const knex = require('../knex-config');
const bcrypt = require('bcrypt'); 
const fs = require("fs");
const path = require("path");

exports.getTeacherProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const teacher = await knex('teacher').where({ id }).first();
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (error) {
        console.error('Error fetching teacher profile:', error);
        res.status(500).json({ message: 'Error fetching teacher profile' });
    }
};

exports.patchTeacherProfile = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        // Update the teacher profile
        const updatedRows = await knex('teacher').where({ id }).update(updatedData);

        if (updatedRows) {
            res.json({updatedData, message: 'Profile updated successfully' });
        } else {
            return res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        console.error('Error updating teacher profile:', error);
        res.status(500).json({ message: 'Error updating teacher profile' });
    }
};

//  to handle image upload
exports.uploadImage = async (req, res) => {
    const { id } = req.params;
    const imagePath = req.file.path; // Get the uploaded file path

    try {
        // Update the teacher image in the database
        await knex('teacher').where({ id }).update({ teacher_img: imagePath });

        res.json({ imagePath, message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Error uploading image' });
    }
};


// Function to update the password
exports.updatePassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Input validation
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Current password and new password are required' });
    }

    try {
        const teacher = await knex('teacher').where({ id }).first();
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Compare the provided current password with the stored hashed password
        const isMatch = await bcrypt.compare(currentPassword, teacher.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await knex('teacher').where({ id }).update({ password: hashedPassword });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Error updating password' });
    }
};


exports.imageTeacherProfile = async (req, res) => {
    const { id } = req.params;
  
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const imagePath = req.file.path;
      console.log(imagePath)
      await knex('teacher').where({ id }).update({ teacher_img: imagePath });
  
      res.json({ imagePath });
  
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ message: 'Error uploading image' });
    }
  };