exports.up = function(knex) {
    return knex.schema.createTable('responses', function(table) {
        table.increments('id').primary(); // Unique identifier for each response
        table.integer('request_id').unsigned().notNullable()
            .references('id').inTable('consultation_requests').onDelete('CASCADE'); // Reference to consultation request
        table.integer('teacher_id').unsigned().notNullable()
            .references('id').inTable('teacher').onDelete('CASCADE'); // Teacher who made the request
        table.integer('consultant_id').unsigned().notNullable()
            .references('id').inTable('teacher').onDelete('CASCADE'); // Consultant providing the response
        table.string('pdf_url').nullable(); // URL for the PDF document
        table.string('image_url').nullable(); // URL for the image
        table.enu('status', ['Pending', 'Completed']).defaultTo('Pending'); // Status of the response
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.boolean('isActive').defaultTo(true); // Flag to indicate if response is active
        table.text('feedback_text').nullable(); // Feedback content from the teacher
        table.enu('payment_status', ['Pending', 'Paid']).defaultTo('Pending');
        table.integer('rating').unsigned().nullable().defaultTo(5); // Rating score from the teacher
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('responses');
};
