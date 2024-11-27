exports.up = function(knex) {
    return knex.schema
        .createTable('consultant_availability', function(table) {
            table.increments('id').primary();
            table.integer('consultant_id').unsigned().notNullable();
            table.foreign('consultant_id').references('id').inTable('teacher').onDelete('CASCADE');
            table.date('date').notNullable();
            table.string('time_slot', 50).notNullable();
            table.boolean('is_available').defaultTo(true);
            table.boolean('is_booked').defaultTo(false);
            table.boolean('is_deleted').defaultTo(false);
            table.unique(['consultant_id', 'date', 'time_slot']);
        })
        .createTable('appointments', function(table) {
            table.increments('id').primary();
            table.integer('teacher_id').unsigned().notNullable();
            table.foreign('teacher_id').references('id').inTable('teacher').onDelete('CASCADE');
            table.integer('consultant_id').unsigned().notNullable();
            table.foreign('consultant_id').references('id').inTable('teacher').onDelete('CASCADE');
            table.integer('availability_id').unsigned().notNullable();
            table.foreign('availability_id').references('id').inTable('consultant_availability').onDelete('CASCADE');
            table.enum('status', ['scheduled', 'completed', 'cancelled']).defaultTo('scheduled');
            table.text('notes');
            table.text('description').nullable(); // New field for description
            table.integer('num_beneficiaries').nullable();
            table.string('zoom_link').nullable(); // New field for Zoom link
            table.boolean('is_deleted').defaultTo(false);
            table.unique(['teacher_id', 'consultant_id', 'availability_id']);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('appointments')
        .dropTableIfExists('consultant_availability');
};