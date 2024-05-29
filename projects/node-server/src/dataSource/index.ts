import { DataSource } from 'typeorm';
import { User } from '../entity/User';

const password: string = process.env.PASSWORD_PG || 'root';
const port: number = parseInt(process.env.PORT_PG || '5432', 10);
const database: string = process.env.DATABASE_PG || 'nameDataBase';
const username: string = process.env.USER_NAME_PG || 'username';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: port,
  username: username,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  entities: [User],
});
