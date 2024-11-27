exports.up = function(knex) {
    return knex.schema
        .createTable('payment_appointment', function(table) {
            table.increments('id').primary();
            
            table.integer('consultant_id').unsigned().notNullable()
                .references('id').inTable('teacher').onDelete('CASCADE');
            
            table.integer('teacher_id').unsigned().notNullable()
                .references('id').inTable('teacher').onDelete('CASCADE');
            
            table.integer('appointment_id').unsigned().notNullable()
                .references('id').inTable('appointments').onDelete('CASCADE');
            
            table.decimal('total_amount', 10, 2).notNullable(); // Total amount paid
            table.decimal('site_earning', 10, 2).notNullable(); // Site's commission
            table.decimal('consultant_earning', 10, 2).notNullable(); // Consultant's earning
            
            table.enum('payment_status', ['pending', 'completed']).defaultTo('pending');
            
            table.boolean('is_refunded').defaultTo(false); // Flag for refunds
            table.boolean('is_deleted').defaultTo(false);  // For soft deletes if needed
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('payment_appointment');
};
