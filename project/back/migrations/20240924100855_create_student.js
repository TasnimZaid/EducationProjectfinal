exports.up = function(knex) {
  return knex.schema.createTable('student', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('password').notNullable(); 
      table.string('subject').nullable(); 
      table.string('email').notNullable().unique();
      table.enu("gender", ["male", "female"]); 
      table.boolean("isActivate").defaultTo(true);
      table.string("otp").nullable(); 
      table.string('national_id').notNullable().unique(); // Add national ID column
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('student');
};
