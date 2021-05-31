exports.up = async knex => {
    await knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('code').notNullable();
        table.string('name').notNullable();
        table.integer('price').notNullable();
        table.timestamp('createdAt').notNullable();
        table.timestamp('updatedAt').notNullable();

        table.unique('code');
    });
};

exports.down = async knex => knex.schema.dropTable('products');
