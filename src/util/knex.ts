import path from 'path';

import Knex from 'knex';

import { config, isDevelopment } from './config';

export const knex = Knex({
  client: 'pg',
  connection: config.postgres,
  migrations: {
    directory: path.join(`${__dirname}/../../migrations`),
  },
  seeds: {
    directory: path.join(`${__dirname}/../../seeds`),
  },
});

export const ensureKnexConnection = async () => {
  await knex.client.acquireRawConnection();

  if (isDevelopment) {
    const [seedsLog]: [readonly string[]] = await knex.seed.run();
    const seedsRun = seedsLog.length !== 0;
    if (seedsRun) {
      console.log(
        `Ran ${seedsLog.length} seed files ${`\n${seedsLog.join('\n')}`}`,
      );
    }
  }
};
