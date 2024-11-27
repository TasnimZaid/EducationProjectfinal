exports.up = function(knex) {
    return knex.schema.createTable('class_quizzes', function(table) {
      table.increments('id').primary();
      table.integer('class_id').unsigned().references('id').inTable('classes').onDelete('CASCADE');
      table.integer('quiz_id').unsigned().references('id').inTable('quizzes').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('class_quizzes');
  };
  