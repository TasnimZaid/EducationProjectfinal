exports.up = function(knex) {
    return knex.schema
        // جدول التسعير الثابت
        .createTable('pricing_plans', function(table) {
            table.increments('id').primary(); // معرف فريد لكل خطة تسعير
            table.string('request_type').notNullable().unique(); // نوع الطلب (مثل "exam" أو "lesson_plan")
            table.integer('consultant_id').unsigned().notNullable()
            .references('id').inTable('teacher').onDelete('CASCADE'); 
            table.decimal('price', 10, 2).notNullable(); // السعر الثابت لنوع الطلب
            table.text('description').nullable(); // وصف اختياري لخطة التسعير
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        // جدول طلبات الاستشارة
        .createTable('consultation_requests', function(table) {
            table.increments('id').primary(); // معرف فريد لكل طلب
            table.integer('teacher_id').unsigned().notNullable()
                .references('id').inTable('teacher').onDelete('CASCADE'); // مرجع للمعلم الذي طلب الاستشارة
            table.integer('consultant_id').unsigned().nullable()
                .references('id').inTable('teacher').onDelete('SET NULL'); // مرجع للمستشار
            table.integer('user_id').unsigned().nullable(); // معرف المستخدم الذي قدم الطلب
            table.string('request_type').notNullable(); // نوع الطلب (يمكن أن يكون وصفًا إضافيًا)
            table.text('description').nullable(); // وصف الطلب
            table.string('file_url').nullable(); // رابط لملف مرفق (PDF أو فيديو)
            table.decimal('payment_amount', 10, 2).nullable(); // المبلغ المدفوع للاستشارة
            table.string('payment_status').defaultTo('pending'); // حالة الدفع (مثل "pending" أو "completed")
            table.boolean('is_completed').defaultTo(false); // حالة إتمام الطلب
            table.timestamp('created_at').defaultTo(knex.fn.now()); 
            table.timestamp('updated_at').defaultTo(knex.fn.now()); 
            table.boolean('isActive').defaultTo(true); 
            table.integer('pricing_plan_id').unsigned().notNullable()
                .references('id').inTable('pricing_plans').onDelete('RESTRICT'); // ربط بالخطة مع منع حذف الخطة المرتبطة
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('consultation_requests')
        .dropTableIfExists('pricing_plans');
};
