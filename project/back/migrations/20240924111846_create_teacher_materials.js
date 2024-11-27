exports.up = function(knex) {
    return knex.schema.createTable('teacher_materials', function(table) {
        table.increments('id').primary();
        table.integer('teacher_id').unsigned().notNullable()
            .references('id').inTable('teacher').onDelete('CASCADE');
        table.integer('material_id').unsigned().notNullable()
            .references('id').inTable('materials').onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('teacher_materials')
        .dropTableIfExists('materials')
        .then(() => {
            return knex.schema.dropTableIfExists('teacher');
        });
};
