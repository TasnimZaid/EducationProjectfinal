const knex = require('../knex-config');

const getAllQuizzesWithQuestions = async () => {
  try {
    const quizzes = await knex('quizzes')
      .join('questions', 'quizzes.id', 'questions.quiz_id')
      .join('teacher', 'quizzes.teacher_id', 'teacher.id')
      .join('materials', 'quizzes.material_id', 'materials.id')
      .select(
        'quizzes.id as quiz_id',
        'quizzes.title as quiz_title',
        'quizzes.quiz_img',
        'quizzes.grade',
        'quizzes.material_id', 
        'teacher.name as teacher_name',
        'materials.name as material_name',
        'questions.id as question_id',
        'questions.question_text',
        'questions.question_img',
        'questions.has_choices',
        'questions.choices',
        'questions.choices_images' ,
        'questions.correct_answer',
      )
      .orderBy('quizzes.id', 'asc'); 

    return groupQuizzesById(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes and questions:", error);
  }
};


// Function to group quizzes and their questions
const groupQuizzesById = (quizzes) => {
  const grouped = quizzes.reduce((acc, quiz) => {
    const {
      quiz_id,
      quiz_title,
      quiz_img,
      teacher_name,
      material_name,
      material_id,  
      question_id,
      question_text,
      question_img,
      has_choices,
      choices,
      choices_images,
      correct_answer
    } = quiz;

    if (!acc[quiz_id]) {
      acc[quiz_id] = {
        quiz_id,
        quiz_title,
        quiz_img,
        teacher_name,
        material_name,
        material_id, 
        questions: []
      };
    }

    // Push the question details into the questions array
    acc[quiz_id].questions.push({
      question_id,
      question_text,
      question_img,
      has_choices,
      choices,
      choices_images,
      correct_answer
    });

    return acc;
  }, {});

  return Object.values(grouped); // Return the grouped quizzes as an array
};



// ما ساتخدمتها 
function getQuizById(id) {
  return knex('quizzes')
      .select('quizzes.*', 'teacher.name as teacher_name', 'materials.name as material_name')
      .leftJoin('teacher', 'quizzes.teacher_id', 'teacher.id')
      .leftJoin('materials', 'quizzes.material_id', 'materials.id')
      .where('quizzes.id', id)
      .first();
}



// Method to get quiz and its questions by quiz ID
async function getQuizWithQuestions(quizId) {
  // Fetch the quiz with its questions using a join
  const quiz = await knex('quizzes')
      .where('quizzes.id', quizId)
      .first() // Get only one quiz
      .select('quizzes.*') // Select all quiz fields
      .leftJoin('questions', 'quizzes.id', 'questions.quiz_id') // Join with questions table
      .select(knex.raw(`
          quizzes.*,
          json_agg(
              json_build_object(
                  'id', questions.id,
                  'question_text', questions.question_text,
                  'question_img', questions.question_img,
                  'has_choices', questions.has_choices,
                  'choices', questions.choices,
                  'choices_images', questions.choices_images,
                  'correct_answer', questions.correct_answer
              )
          ) as questions
      `)) // Aggregate questions into a JSON array
      .groupBy('quizzes.id'); // Group by quiz ID to get all questions

  return quiz;
}




// Fetch materials endpoint
const getMaterials = async (req, res) => {
  try {
    // Get all materials from the materials table
    const materials = await knex('materials').select('id', 'name'); // Select id and name of materials
    return res.status(200).json({
      message: 'Materials fetched successfully',
      materials
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch materials' });
  }
};


// Insert a quiz
const createQuiz = async (req, res) => {
  try {
    const { title, quiz_img, grade, teacher_id, material_id, subject } = req.body;

    // Insert the quiz into the 'quizzes' table
    const [quizId] = await knex('quizzes').insert({
      title,
      quiz_img,
      grade,
      teacher_id,
      material_id,
      subject
    }).returning('id'); // Use destructuring for returning id

    return res.status(201).json({
      message: 'Quiz created successfully',
      quizId // Directly return the inserted quiz ID
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Insert a question
const createQuestion = async (req, res) => {
  try {
    const { quiz_id, question_text, question_img, has_choices, choices, correct_answer, choices_images } = req.body;

    await knex('questions').insert({
      quiz_id,
      question_text,
      question_img,
      has_choices,
      choices: choices ? JSON.stringify(choices) : null,
      choices_images: choices_images ? JSON.stringify(choices_images) : null,
      correct_answer
    });

    return res.status(201).json({
      message: 'Question created successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create question' });
  }
};

// Exporting functions
module.exports = {
  getAllQuizzesWithQuestions,
  getQuizById,
  createQuiz,
  createQuestion,
  getMaterials ,
  getQuizWithQuestions
};