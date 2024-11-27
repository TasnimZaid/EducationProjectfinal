
const express = require('express');
const router = express.Router();
const knex = require('../knex-config');

// Create a new task
router.post('/tasks', async (req, res) => {
    const { title, description, due_date, student_id, teacher_id } = req.body;

    // Validate input data
    if (!title || !student_id || !teacher_id) {
        return res.status(400).json({ error: 'Title, student ID, and teacher ID are required.' });
    }

    try {
        const [newTaskId] = await knex('tasks').insert({
            title,
            description,
            due_date,
            student_id,
            teacher_id
        }).returning('id'); // Return the inserted task ID (for PostgreSQL)

        res.status(201).json({ message: 'Task created successfully.', taskId: newTaskId });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Error creating task.' });
    }
});

// Get tasks for a specific student
router.get('/tasks/:studentId', async (req, res) => {
    const { studentId } = req.params;

    try {
        const tasks = await knex('tasks').where({ student_id: studentId }).select('*');
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Error fetching tasks.' });
    }
});

// Update task completion status
router.put('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const { is_completed } = req.body;

    // Validate input data
    if (is_completed === undefined) {
        return res.status(400).json({ error: 'Completion status is required.' });
    }

    try {
        const updatedRows = await knex('tasks').where({ id: taskId }).update({ is_completed });

        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        res.status(200).json({ message: 'Task updated successfully.' });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Error updating task.' });
    }
});

module.exports = router;
