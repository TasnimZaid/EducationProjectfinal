exports.up = function(knex) {
    return knex.schema.createTable('payments', function(table) {
        table.increments('id').primary(); // Unique payment ID
        table.integer('consultation_request_id').unsigned().notNullable()
            .references('id').inTable('consultation_requests').onDelete('CASCADE');
        table.integer('teacher_id').unsigned().notNullable()
            .references('id').inTable('teacher').onDelete('CASCADE');
        table.decimal('amount', 10, 2).notNullable(); 
        table.decimal('teacher_earnings', 10, 2).notNullable().defaultTo(0); 
        table.decimal('site_earnings', 10, 2).notNullable().defaultTo(0); 
        table.string('status').defaultTo('Pending'); // Payment status ('Pending', 'Paid')
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('payments');
};
