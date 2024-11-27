exports.up = function(knex) {
    return knex.schema
        // إنشاء جدول saved_quizzes
        .createTable('saved_quizzes', function(table) {
            table.increments('id').primary();
            table.integer('teacher_id').unsigned().notNullable()
                .references('id').inTable('teacher')
                .onDelete('CASCADE');
            table.integer('quiz_id').unsigned().notNullable()
                .references('id').inTable('quizzes')
                .onDelete('CASCADE');
            table.timestamps(true, true);
        });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('saved_quizzes');
};
