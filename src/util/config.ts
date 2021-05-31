import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const ENVIRONMENT = process.env.NODE_ENV;

export const isDevelopment = ENVIRONMENT === 'development';
export const isProduction = ENVIRONMENT === 'production';

export const config = {
  server: {
    port: process.env.APP_PORT,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  },
};
