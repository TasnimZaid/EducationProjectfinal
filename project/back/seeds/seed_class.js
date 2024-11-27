// seeds/classes.js

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        { name: 'Mathematics', teacher_id: 2 },
        { name: 'Science', teacher_id: 2 },
        { name: 'History', teacher_id: 3 },
        { name: 'English Literature', teacher_id: 2},
      ]);
    });
};

