exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pricing_plans').del();

  // Inserts seed entries
  await knex('pricing_plans').insert([
      {
          request_type: 'exam',
           price: 100.00,
          description: 'Exam consultation for advanced preparation.',
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
          consultant_id: 3,

      },
      {
          request_type: 'lesson_plan',
          price: 80.00,
          description: 'Lesson plan consultation with detailed breakdown.',
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
          consultant_id: 3,

      }
  ]);
};
