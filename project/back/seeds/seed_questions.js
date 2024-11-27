exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        { quiz_id: 1, question_text: 'What is 2 + 2?', question_img: null, has_choices: true, choices: JSON.stringify(['3', '4', '5', '6']), correct_answer: '4' },
        { quiz_id: 1, question_text: 'What is 5 * 6?', question_img: null, has_choices: true, choices: JSON.stringify(['30', '36', '42', '48']), correct_answer: '30' },
        { quiz_id: 2, question_text: 'What is the chemical symbol for water?', question_img: null, has_choices: true, choices: JSON.stringify(['H2O', 'O2', 'CO2', 'NaCl']), correct_answer: 'H2O' },
        { quiz_id: 3, question_text: 'Who wrote "Romeo and Juliet"?', question_img: null, has_choices: true, choices: JSON.stringify(['Charles Dickens', 'Mark Twain', 'William Shakespeare', 'Jane Austen']), correct_answer: 'William Shakespeare' },
        { quiz_id: 4, question_text: 'Who was the first President of the United States?', question_img: null, has_choices: true, choices: JSON.stringify(['George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'John Adams']), correct_answer: 'George Washington' }
      ]);
    });
};
