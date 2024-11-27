exports.up = function(knex) {
    return knex.schema
        // Create quizzes table
        .createTable('quizzes', function(table) {
            table.increments('id').primary();
            table.string('title').notNullable(); 
            table.string('quiz_img').nullable(); 
            table.string('grade').nullable();
            table.integer('teacher_id').unsigned().notNullable()
                .references('id').inTable('teacher') 
                .onDelete('CASCADE');
            table.integer('material_id').unsigned().notNullable() 
                .references('id').inTable('materials') 
                .onDelete('CASCADE');
            table.enu('subject', [  
                'Math', 
                'Science', 
                'English', 
                'History', 
                'Geography', 
                'Physics', 
                'Chemistry', 
                'Music', 
                'Philosophy',
                'Art',
                'Biology',
                'Computer Science',
                'Physical Education',
                'Economics',
                'Sociology',
                'Psychology',
                'Political Science',
                'Business Studies',
                'Environmental Science',
                'Drama',
                'Foreign Languages',
                'Engineering',
                'Literature'
            ]).notNullable(); 
            table.timestamps(true, true); 
            table.integer('duration').nullable(); // مدة الامتحان
            table.integer('total_marks').nullable(); // العلامات الكلية
            table.string('pdf_url').nullable(); // رابط ملف PDF
            table.string('word_url').nullable(); // رابط ملف Word
            table.string('google_drive_url').nullable(); // رابط Google Drive
        })
        // Create questions table
        .createTable('questions', function(table) {
            table.increments('id').primary();
            table.integer('quiz_id').unsigned().notNullable()
                .references('id').inTable('quizzes') // Reference to quizzes
                .onDelete('CASCADE');
            table.string('question_text').notNullable(); // Question text
            table.string('question_img').nullable(); // Optional image for the question
            table.boolean('has_choices').defaultTo(false); // Flag for choices
            table.json('choices').nullable(); // Store choices as JSON (for flexibility)
            table.json('choices_images').nullable(); // Store choice images as JSON
            table.string('correct_answer').nullable(); // Store the correct answer
            table.timestamps(true, true); // Timestamps for question creation/update
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('questions')
        .dropTableIfExists('quizzes');
};


