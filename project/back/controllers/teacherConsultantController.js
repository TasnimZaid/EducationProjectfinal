const knex = require('../knex-config');


exports.getAllTeacher = async (req, res) => {
    try {
        const teachers = await knex('teacher').where({ role: 'consultant' });
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teachers', error });
    }
};

exports.getTeacherDetails = async (req, res) => {
    const { id } = req.params;
    const teacher = await knex('teacher').where({ id }).first();
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(teacher);
}


// make req 
exports.consultationRequests = async (req, res) => {
    const { teacher_id, consultant_id, request_type, description, file_url } = req.body;

    try {
        // Get the quiz_payment amount from the teacher table
        const teacher = await knex('teacher').select('quiz_payment').where('id', teacher_id).first();
        
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        // Create the new consultation request
        const newRequest = await knex('consultation_requests').insert({
            teacher_id,
            consultant_id, // Include the consultant ID in the insert
            request_type,
            description,
            file_url,
            payment_status: 'pending', // default status
            isactive: true, // new request is active by default
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        });

        res.status(201).json({ message: 'Request created successfully', requestId: newRequest[0] });
    } catch (error) {
        res.status(500).json({ error });
    }
}


exports.consultatRrqProfile = async(req,res)=>{
    const { consultantId } = req.params; 

    try {
        const requests = await knex('consultation_requests')
            .where('consultant_id', consultantId)
            .join('teacher', 'consultation_requests.teacher_id', 'teacher.id')
            .select(
                'consultation_requests.*', 
                'teacher.quiz_payment' ,
                "teacher.name"
            );

        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving consultant requests' });
    }
}


exports.teacherReqProfile = async(req,res)=>{
    const { teacherId } = req.params; // Get teacher ID from request parameters

    try {
        const requests = await knex('consultation_requests')
            .where('teacher_id', teacherId) // Filter by teacher_id
            .join('teacher', 'consultation_requests.teacher_id', 'teacher.id')
            .select(
                'consultation_requests.*', // Select all fields from consultation_requests
                'teacher.quiz_payment' // Get the quiz_payment from teacher table
            );

        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving teacher requests' });
    }
}








