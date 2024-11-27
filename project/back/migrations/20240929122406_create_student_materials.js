exports.up = function(knex) {
    return knex.schema.createTable('student_materials', function(table) {
        table.increments('id').primary();
        table.integer('student_id').unsigned().references('id').inTable('student').onDelete('CASCADE');
        table.integer('material_id').unsigned().references('id').inTable('materials').onDelete('CASCADE');
        table.timestamps(true, true); // Add created_at and updated_at columns
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('student_materials');
};
