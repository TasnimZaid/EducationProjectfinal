const knex = require('../knex-config');




// Get all lessons
exports.getAllLessons = async (req, res) => {
    try {
        const { teacherId, materialId } = req.params; // Assuming you're getting these as params or from the request body
        const lessons = await knex('lessons')
            .join('teacher', 'lessons.teacher_id', '=', 'teacher.id') // Joining with the teachers table           
            .select('lessons.*', 'teacher.name as teacher_name'); // Selecting lesson fields and the teacher's name

        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get lessons by teacher ID and material ID
exports.getLessons = async (req, res) => {
    const { teacherId, materialId } = req.params;

    try {
        const lessons = await knex('lessons')
            .where({ teacher_id: teacherId, material_id: materialId });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add a new lesson
exports.addLesson = async (req, res) => {
    const { title, description, lesson_img, pdf_url, word_url, video_url, other_file_url, is_free, subscription_price, material_id, subject, teacher_id ,  grade } = req.body;

    try {
        const [newLesson] = await knex('lessons').insert({
            title,
            description,
            lesson_img,
            pdf_url,
            word_url,
            video_url,
            other_file_url,
            is_free,
            subscription_price,
            material_id,
            subject,
            teacher_id,
            grade 

        }).returning('*');

        res.status(201).json(newLesson);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




 ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get all activities
exports.getAllActivities = async (req, res) => {
    try {
        const activities = await knex('activities')
            .join('teacher', 'activities.teacher_id', '=', 'teacher.id') // Joining with the teachers table
            .select('activities.*', 'teacher.name as teacher_name'); // Selecting activity fields and the teacher's name

        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get activities by teacher ID and material ID
exports.getActivities = async (req, res) => {
    const { teacherId, materialId } = req.params;

    try {
        const activities = await knex('activities')
            .where({ teacher_id: teacherId, material_id: materialId });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add a new activity
exports.addActivity = async (req, res) => {
    const { title, description, activity_img, pdf_url, video_url, is_free, subscription_price, material_id, subject, teacher_id, grade } = req.body;

    try {
        const [newActivity] = await knex('activities').insert({
            title,
            description,
            activity_img,
            pdf_url,
            video_url,
            is_free,
            subscription_price,
            material_id,
            subject,
            teacher_id,
            grade 
        }).returning('*');

        res.status(201).json(newActivity);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Experiments Controller

// Get all experiments
exports.getAllExperiments = async (req, res) => {
    try {
        const experiments = await knex('experiments')
            .join('teacher', 'experiments.teacher_id', '=', 'teacher.id') // Joining with the teachers table
            .select('experiments.*', 'teacher.name as teacher_name'); // Selecting experiment fields and the teacher's name

        res.json(experiments);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get experiments by teacher ID and material ID
exports.getExperiments = async (req, res) => {
    const { teacherId, materialId } = req.params;

    try {
        const experiments = await knex('experiments')
            .where({ teacher_id: teacherId, material_id: materialId });
        res.json(experiments);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add a new experiment
exports.addExperiment = async (req, res) => {
    const { title, description, experiment_img, pdf_url, video_url, is_free, subscription_price, material_id, subject, teacher_id, grade } = req.body;

    try {
        const [newExperiment] = await knex('experiments').insert({
            title,
            description,
            experiment_img,
            pdf_url,
            video_url,
            is_free,
            subscription_price,
            material_id,
            subject,
            teacher_id,
            grade 
        }).returning('*');

        res.status(201).json(newExperiment);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
