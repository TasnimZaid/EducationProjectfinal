exports.up = function(knex) {
    return knex.schema.createTable('materials', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable().unique();  
        table.string('picture');
        // table.string('grade').nullable(); مش منطق 
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
