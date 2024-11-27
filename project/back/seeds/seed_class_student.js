// seeds/class_students.js

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('class_students').del()
    .then(function () {
      // Inserts seed entries
      return knex('class_students').insert([
        { class_id: 1, student_id: 1 },
        { class_id: 1, student_id: 2 },
        { class_id: 2, student_id: 1 },
        { class_id: 3, student_id: 3 },
        { class_id: 4, student_id: 2 },
        { class_id: 4, student_id: 3 },
      ]);
    });
};