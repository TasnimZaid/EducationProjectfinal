const knex = require('../knex-config');

// Create a new class
exports.createClass = async (req, res, next) => {
    const { name, teacher_id } = req.body;

    try {
        const classId = await knex('classes').insert({ name, teacher_id });
        res.status(201).json({ message: 'Class created successfully', classId });
    } catch (error) {
        next(error); 
    }
};

// Add a student to a class by national_id
exports.addStudentToClass = async (req, res, next) => {
    console.log(req.body); // Log the incoming request body

    const { class_id, national_id, teacher_id } = req.body; // Changed here to accept teacher_id

    // Check for missing fields
    if (!class_id || !national_id || !teacher_id) {
        return res.status(400).json({ message: 'Class ID, National ID, and Teacher ID are required.' });
    }

    try {
        // Check if the student exists by national_id
        const student = await knex('student').select('id', 'name').where({ national_id }).first();
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Insert the student into the class
        const id = await knex('class_students').insert({ class_id, student_id: student.id });
        res.status(201).json({ message: 'Student added to class', id, student_name: student.name });
    } catch (error) {
        console.error('Error in addStudentToClass:', error); // Log the error for debugging
        next(error); 
    }
};

// Get classes by teacher id to make list for add student to a class by national_id
exports.getTeacherClasses = async (req, res, next) => {
    const { teacher_id } = req.params;

    try {
        const classes = await knex('classes').where({ teacher_id });
        res.status(200).json(classes);
    } catch (error) {
        console.error('Error in getTeacherClasses:', error); // Log the error for debugging
        next(error); // Pass error to the error-handling middleware
    }
};


// Get class students by teacher ID
exports.getClassStudentsByTeacherId = async (req, res, next) => {
    const { teacherId } = req.params;

    try {
        const result = await knex('class_students')
            .join('classes', 'class_students.class_id', '=', 'classes.id')
            .join('teacher', 'classes.teacher_id', '=', 'teacher.id')
            .join('student', 'class_students.student_id', '=', 'student.id')
            .select(
                'class_students.id as class_student_id',
                'classes.name as class_name',
                'student.name as student_name',
                'teacher.name as teacher_name',
                'teacher.id as teacher_id'
            )
            .where('teacher.id', teacherId);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No students found for this teacher.' });
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


// add a quiz to a class 
exports.addQuizToClass = async(req , res , next)=>{
    const {class_id , quiz_id} = req.body;

    try{
        const id = await knex('class_quizzes').insert({class_id , quiz_id});
        res.status(201).json({message : 'quiz added to class successfully' , id}) ;

    }catch(error){
        next(error)
    }
}

  

// جلب الكويزات للصفوف المرتبطة بالمعلم مع أسماء الطلاب
exports.getQuizzesForTeacher = async (req, res, next) => {
    const { teacher_id } = req.params; // الحصول على معرف المعلم من المعاملات

    try {
        // جلب الصفوف الخاصة بالمعلم
        const classes = await knex('classes')
            .select('classes.id as class_id', 'classes.name as class_name')
            .where({ teacher_id });

        // الحصول على جميع الكويزات المرتبطة بهذه الصفوف مع أسماء الطلاب
        const quizzes = await knex('class_quizzes')
            .join('quizzes', 'class_quizzes.quiz_id', 'quizzes.id')
            .join('classes', 'class_quizzes.class_id', 'classes.id')
            .join('class_students', 'classes.id', 'class_students.class_id')
            .join('student', 'class_students.student_id', 'student.id')
            .select(
                'quizzes.id as quiz_id', // Include quiz_id in the response
                'classes.name as class_name',
                'quizzes.title as quiz_name',
                'student.name as student_name'
            )
            .whereIn('classes.id', classes.map(c => c.class_id));

        // إعادة النتائج للعميل
        res.status(200).json({ classes, quizzes });
    } catch (error) {
        console.error('Error fetching quizzes for teacher:', error);
        next(error);
    }
};



// Controller for fetching teacher quizzes
exports.getTeacherQuizzes = async (req, res) => {
    const { teacherId } = req.params;
    
    try {
      const quizzes = await getClassQuizzesForTeacher(teacherId);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quizzes for teacher' });
    }
  };
  
// Controller for fetching student quizzes with teacher info
exports.getStudentQuizzes = async (req, res) => {
    const { studentId } = req.params;
  
    try {
      // Query to get quizzes for the student along with teacher information
      const quizzes = await knex('quizzes')
        .join('class_quizzes', 'quizzes.id', 'class_quizzes.quiz_id')
        .join('classes', 'class_quizzes.class_id', 'classes.id') // Join classes to get teacher_id
        .join('teacher', 'classes.teacher_id', 'teacher.id') // Join teachers to get teacher info
        .join('class_students', 'class_quizzes.class_id', 'class_students.class_id') // Join class_students to filter by student
        .where('class_students.student_id', studentId)
        .select(
          'quizzes.id as quizId',
          'quizzes.title',
          'quizzes.quiz_img',
          'quizzes.grade',
          'quizzes.subject',
          'teacher.id as teacherId', // Teacher information
          'teacher.name as teacherName',
          'teacher.email as teacherEmail'
        );
  
      // Return quizzes with teacher information in JSON format
      res.json(quizzes);
    } catch (error) {
      // Handle any errors that may occur
      res.status(500).json({ error: error});
    }
  };
  