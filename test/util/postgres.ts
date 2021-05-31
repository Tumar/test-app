import knexCleaner from 'knex-cleaner';

import { knex } from 'src/util/knex';

export const setUpPostgres = (() => {
  let executed = false;

  return async () => {
    if (!executed) {
      executed = true;

      await knex.schema.raw(`
          drop schema public cascade;
          create schema public;
      `);

      await knex.migrate.latest();
    }
  };
})();

export const tearDownPostgres = async () => {
  await knex.destroy();
};

export const resetPostgresData = async () => {
  await knexCleaner.clean(knex as any, {
    mode: 'truncate',
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
};
