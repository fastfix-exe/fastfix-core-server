import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'localenv';

if (env === 'localenv') {
  dotenv.config({
    path: path.resolve(process.cwd() + '/src/config', env + '.env')
  });
} else {
  dotenv.config();
}


export const envConfig = {

  PORT: process.env.PORT,
  PROXY: process.env.PROXY,

  NODE_ENV: env,

  // connection string
  PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,

  // log level
  LOG_LEVEL: process.env.LOG_LEVEL || 'ERROR',

  // google secret
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || '',

  // admin email
  ADMINISTRATOR_EMAIL: process.env.ADMINISTRATOR_EMAIL?.split(/ /g) || [],

  // jwt secret
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
  ACCESS_TOKEN_TIMEOUT: process.env.ACCESS_TOKEN_TIMEOUT || '90s'
};