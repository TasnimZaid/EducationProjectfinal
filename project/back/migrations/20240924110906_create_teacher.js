exports.up = function(knex) {
    return knex.schema.createTable('teacher', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable(); 
        table.enu("gender", ["male", "female"]);
        table.string('school_name').nullable();  
        table.string('university_name').notNullable();  
        table.string('certificate_img').nullable();  
        table.string('teacher_img').nullable(); 
        table.string('grade').nullable();
        table.boolean("isActivate").defaultTo(true);
        table.string("otp").nullable();
        table.string('national_id').notNullable().unique(); //صفتها جديد
        table.enu('role', ['teacher', 'consultant']).defaultTo('teacher');
        table.string('language').nullable(); // اللغة
        table.string('phone_number').nullable(); // رقم الهاتف
        table.string('facebook').nullable(); // سوشيال ميديا فيسبوك
        table.string('instagram').nullable(); // سوشيال ميديا انستجرام
        table.string('linkedin').nullable(); // سوشيال ميديا لينكد إن
        table.decimal('consultation_fee', 10, 2).nullable(); // سعر الاستشارة
        table.integer('years_of_experience').nullable(); // سنوات الخبرة
        table.string('specialization').nullable(); // التخصص
        table.specificType('services', 'text[]').nullable(); // يمكن استخدام text[] لتخزين الخدمات كمصفوفة
        table.decimal('quiz_payment', 10, 2).nullable(); // New column for payment amount for quizzes and activities


    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('teacher');
};
