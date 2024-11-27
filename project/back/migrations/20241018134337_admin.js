exports.up = function(knex) {
    return knex.schema.createTable('admin', function(table) {
      table.increments('id').primary();  
      table.string('name').nullable();   
      table.string('email').notNullable().unique(); 
      table.string('password').notNullable();        
      table.string('role').notNullable().defaultTo('admin');  
      table.boolean('is_enabled').notNullable().defaultTo(true); 
      table.timestamp('created_at').defaultTo(knex.fn.now());  
      table.timestamp('updated_at').defaultTo(knex.fn.now()); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('admin');
  };
  