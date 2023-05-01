import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

export default new DataSource({
  type: 'postgres',
  host: process.env.PSQL_HOST,
  port: parseInt(process.env.PSQL_PORT as string),
  username: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD as string,
  database: process.env.PSQL_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.js'],
});
