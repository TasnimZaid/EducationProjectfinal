// seeds/class_quizzes.js

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('class_quizzes').del()
    .then(function () {
      // Inserts seed entries
      return knex('class_quizzes').insert([
        { class_id: 1, quiz_id: 1 },
        { class_id: 1, quiz_id: 2 },
        { class_id: 2, quiz_id: 1 },
        { class_id: 3, quiz_id: 3 },
        { class_id: 4, quiz_id: 2 },
      ]);
    });
};
