import 'reflect-metadata';
import express from 'express';
import { Repository } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

import { AppDataSource } from './src/dataSource';
import { User } from './src/entity/User';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    app.get('/users', async (req, res) => {
      const users = await userRepository.find();
      res.json(users);
    });

    app.post('/users', async (req, res) => {
      const user = userRepository.create(req.body);
      const result = await userRepository.save(user);
      res.send(result);
    });
  })
  .catch((error) => console.log(error));

app.get('/', (_, res) => {
  res.send('hi');
});
