const knex = require('../knex-config');

// Get all saved quizzes for a specific teacher
exports.getSavedQuizzesByTeacher = async (req, res) => {
    try {
        const { teacher_id } = req.params;
        const savedQuizzes = await knex('saved_quizzes')
            .join('quizzes', 'saved_quizzes.quiz_id', '=', 'quizzes.id')
            .where('saved_quizzes.teacher_id', teacher_id)
            .select('quizzes.*'); // Optionally, customize fields to return
        res.json(savedQuizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Save a quiz for a teacher
exports.saveQuizForTeacher = async (req, res) => {
    try {
        const { teacher_id , quiz_id } = req.body;

        // Check if the quiz is already saved by the teacher
        const existingSave = await knex('saved_quizzes')
            .where({ teacher_id, quiz_id })
            .first();

        if (existingSave) {
            return res.status(400).json({ message: 'Quiz is already saved.' });
        }

        // Save the quiz
        const id = await knex('saved_quizzes').insert({ teacher_id, quiz_id });
        res.status(201).json({ message: 'Quiz saved successfully', id });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
        
    }
};



// Remove a saved quiz for a teacher
exports.removeSavedQuizForTeacher = async (req, res) => {
    try {
        const { teacher_id, quiz_id } = req.body;

        // Remove the saved quiz
        const rowsDeleted = await knex('saved_quizzes')
            .where({ teacher_id, quiz_id })
            .del();

        if (rowsDeleted) {
            res.status(200).json({ message: 'Quiz removed from saved list' });
        } else {
            res.status(404).json({ message: 'Saved quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
