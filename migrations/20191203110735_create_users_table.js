exports.up = async knex => knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('passwordHash').notNullable();
    table.string('firstName');
    table.string('lastName');
    table.timestamp('createdAt');
    table.timestamp('updatedAt');

    table.unique('email');
});

exports.down = async knex => knex.schema.dropTable('users');
