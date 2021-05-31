exports.seed = async knex => {
  await knex('products').del();
  await knex('products').insert([
    {
        code: 'CC',
        name: 'Coca-Cola',
        price: 1.5 * 100,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        code: 'PC',
        name: 'Pepsi-Cola',
        price: 2.0 * 100,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        code: 'WA',
        name: 'Water',
        price: 0.85 * 100,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
  ]);

  await knex('discount_rules').del();
  await knex('discount_rules').insert([
    {
        productCode: 'CC',
        type: 'bogof',
        quantity: 0,
        discount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        productCode: 'PC',
        type: 'bulk',
        quantity: 3,
        discount: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
])
};
