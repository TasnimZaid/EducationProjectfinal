exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('student_materials').del()
    .then(function () {
      // Inserts seed entries
      return knex('student_materials').insert([
        { student_id: 1, material_id: 1 }, // Student 1 linked with Math
        { student_id: 1, material_id: 2 }, // Student 1 linked with Science
        { student_id: 2, material_id: 1 }, // Student 2 linked with Math
        { student_id: 2, material_id: 3 }, // Student 2 linked with English
        { student_id: 3, material_id: 4 }, // Student 3 linked with History
        { student_id: 3, material_id: 5 }, // Student 3 linked with Geography
        { student_id: 4, material_id: 6 }, // Student 4 linked with Physics
        { student_id: 4, material_id: 7 }, // Student 4 linked with Chemistry
        { student_id: 1, material_id: 10 }, // Student 1 linked with Art
        { student_id: 2, material_id: 11 }, // Student 2 linked with Biology
        { student_id: 3, material_id: 12 }, // Student 3 linked with Computer Science
        { student_id: 4, material_id: 13 }, // Student 4 linked with Physical Education
        // Add more entries as necessary
      ]);
    });
};
