/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  if (!(await knex.schema.hasTable('users'))) {
     await knex.schema.createTable('users', (table) => {
      table.increments('id').primary(); 
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').unique().notNullable().index();  
      table.string('password_hash').notNullable(); 
      table.string('salt'); 
      table.string('username').index(); 
      table.string('is_verified').notNullable().defaultTo('false'); 
      table.timestamp('last_login'); 
      table.enum('role', ['user', 'admin']).defaultTo('user'); 
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  }

  if (!(await knex.schema.hasTable('sessions'))) {
    await knex.schema.createTable('sessions', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.string('user_email').notNullable();
      table.string('session_id').notNullable();
      table.string('refresh_token').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('expires_at').notNullable();
    });
  }
 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('sessions');
};
