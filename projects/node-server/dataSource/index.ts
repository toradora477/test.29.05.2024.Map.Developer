import { DataSource } from 'typeorm';
import { Marker } from '../entity/Marker';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.PORT_PG || '5432', 10),
  username: process.env.USER_NAME_PG || 'username',
  password: process.env.PASSWORD_PG || 'root',
  database: process.env.DATABASE_PG || 'nameDataBase',
  synchronize: true,
  logging: false,
  entities: [Marker],
});
