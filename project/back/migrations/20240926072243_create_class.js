exports.up = function(knex) {
    return knex.schema
      .createTable('classes', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('teacher_id').unsigned().references('id').inTable('teacher').onDelete('CASCADE');
        table.timestamps(true, true);
      })
      .createTable('class_students', function(table) {
        table.increments('id').primary();
        table.integer('class_id').unsigned().references('id').inTable('classes').onDelete('CASCADE');
        table.integer('student_id').unsigned().references('id').inTable('student').onDelete('CASCADE');
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('class_students')
      .dropTableIfExists('classes');
  };
  