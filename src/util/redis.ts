import Redis from 'redis';

import { config } from './config';

export const redis = Redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});
