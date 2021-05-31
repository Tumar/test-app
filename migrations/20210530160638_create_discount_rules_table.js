exports.up = async knex => {
    await knex.schema.raw(`
        create type enum_discount_rules_type as enum ('bogof', 'bulk');
    `)

    await knex.schema.createTable('discount_rules', table => {
        table.increments('id').primary();
        table.string('productCode').notNullable();
        table.specificType('type', 'enum_discount_rules_type').notNullable();
        table.integer('quantity').notNullable();
        table.integer('discount').notNullable();
        table.timestamp('createdAt').notNullable();
        table.timestamp('updatedAt').notNullable();

        table.foreign('productCode').references('products.code')
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('discount_rules');
    await schema.raw(`drop type enum_discount_rules_type;`);
}
