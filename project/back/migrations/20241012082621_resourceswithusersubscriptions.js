exports.up = function(knex) {
    return knex.schema
        // جدول الاشتراكات الموحد
        .createTable('user_subscriptions', function(table) {
            table.increments('id').primary(); // معرف فريد
            table.integer('user_id').unsigned().notNullable() // معرف المستخدم
                .references('id').inTable('teacher')
                .onDelete('CASCADE');
            table.boolean('has_access').defaultTo(false); // تحديد ما إذا كان لدى المستخدم حق الوصول
            table.decimal('subscription_price', 10, 2).nullable(); // سعر الاشتراك (للإشارة)
            table.date('subscription_start').nullable(); // تاريخ بدء الاشتراك
            table.date('subscription_end').nullable(); // تاريخ انتهاء الاشتراك
            table.date('next_billing_date').nullable(); // تاريخ الدفع الشهري التالي
            table.timestamps(true, true); // وقت الإنشاء والتحديث
        })


        
        // جدول للدروس
        .createTable('lessons', function(table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description').nullable();
            table.string('lesson_img').nullable();
            table.string('pdf_url').nullable();
            table.string('word_url').nullable();
            table.string('video_url').nullable();
            table.string('other_file_url').nullable();
            table.boolean('is_free').defaultTo(false);
            table.decimal('subscription_price', 10, 2).nullable(); 
                // إضافة معرف المادة
            table.integer('material_id').unsigned().notNullable() 
             .references('id').inTable('materials') // الربط بجدول المواد
              .onDelete('CASCADE'); // حذف الدرس إذا تم حذف المادة
 
           // إضافة حقل المادة
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
        ]).notNullable(); // نوع المادة
        table.string('grade').nullable(); 

            table.integer('teacher_id').unsigned().notNullable()
                .references('id').inTable('teacher')
                .onDelete('CASCADE');
            table.timestamps(true, true);
        })








        // جدول للأنشطة
        .createTable('activities', function(table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description').nullable();
            table.string('activity_img').nullable();
            table.string('pdf_url').nullable();
            table.string('video_url').nullable();
            table.boolean('is_free').defaultTo(false);
            table.decimal('subscription_price', 10, 2).nullable();

                // Add material_id field
    table.integer('material_id').unsigned().notNullable()
    .references('id').inTable('materials') // Reference to materials table
    .onDelete('CASCADE'); // Delete activity if material is deleted

// Add subject field
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
]).notNullable(); // Subject type

// Add grade field
table.string('grade').nullable(); // Grade field

            table.integer('teacher_id').unsigned().notNullable()
                .references('id').inTable('teacher')
                .onDelete('CASCADE');
            table.timestamps(true, true);
        })
        // جدول للتجارب
        .createTable('experiments', function(table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description').nullable();
            table.string('experiment_img').nullable();
            table.string('pdf_url').nullable();
            table.string('video_url').nullable();
            table.boolean('is_free').defaultTo(false);
            table.decimal('subscription_price', 10, 2).nullable();
                // Add material_id field
    table.integer('material_id').unsigned().notNullable()
    .references('id').inTable('materials') // Reference to materials table
    .onDelete('CASCADE'); // Delete activity if material is deleted

// Add subject field
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
]).notNullable(); // Subject type

// Add grade field
table.string('grade').nullable(); // Grade field

            table.integer('teacher_id').unsigned().notNullable()
                .references('id').inTable('teacher')
                .onDelete('CASCADE');
            table.timestamps(true, true);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('experiments')
        .dropTableIfExists('activities')
        .dropTableIfExists('lessons')
        .dropTableIfExists('user_subscriptions');
};
