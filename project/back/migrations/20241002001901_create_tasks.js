exports.up = function(knex) {
    return knex.schema.createTable('tasks', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable(); // Title of the task
        table.text('description').nullable(); // Description of the task
        table.date('due_date').nullable(); // Due date for the task
        table.boolean('is_completed').defaultTo(false); // Flag for task completion
        table.integer('rating').nullable(); // New column for teacher's rating
        table.text('notes').nullable(); // New column for teacher's notes after student completes the task
        table.integer('student_id').unsigned().notNullable()
            .references('id').inTable('student')
            .onDelete('CASCADE'); // Associate task with a student
        table.integer('teacher_id').unsigned().notNullable()
            .references('id').inTable('teacher')
            .onDelete('CASCADE'); // Associate task with a teacher
        table.timestamps(true, true); // Timestamps for task creation/update
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks');
};
