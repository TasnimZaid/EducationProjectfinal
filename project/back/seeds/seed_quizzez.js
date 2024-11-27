exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('quizzes').del()
    .then(function () {
      // Inserts seed entries
      return knex('quizzes').insert([
        { title: 'Math Basics', quiz_img: null, teacher_id: 2, subject: 'Math' , material_id: 24 },
        { title: 'Science Fundamentals', quiz_img: null, teacher_id: 2, subject: 'Science'  , material_id: 24 },
        { title: 'English Literature', quiz_img: null, teacher_id: 3, subject: 'English' , material_id: 24},
        { title: 'World History', quiz_img: null, teacher_id: 4, subject: 'History'  , material_id: 24 }
      ]);
    });
};
