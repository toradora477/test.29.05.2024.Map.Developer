import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { Repository } from 'typeorm';
import dotenv from 'dotenv';
const cors = require('cors');
const timeout = require('connect-timeout');

dotenv.config();

const port = process.env.PORT || 3005;

const app = express();

import { AppDataSource } from './src/dataSource';
import { User } from './src/entity/User';
import routesConfig from './configs/routesConfig';

app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(timeout(240000));
// app.use(require('./configs/routesConfig'));
app.use((req, res, next) => {
  console.log(`Запит на адресу ${req.url} методом ${req.method}`);
  console.log('Тіло запиту:', req.body); // Виведення тіла запиту (якщо воно є)
  next(); // Продовження обробки запиту
});
app.use(routesConfig);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    // Get all users
    app.get('/users', async (req: Request, res: Response) => {
      try {
        const users = await userRepository.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
      }
    });

    // Create a new user
    app.post('/users', async (req: Request, res: Response) => {
      try {
        const user = userRepository.create(req.body);
        const result = await userRepository.save(user);
        res.status(201).send(result);
      } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
      }
    });

    // Get a user by ID
    app.get('/users/:id', async (req: Request, res: Response) => {
      try {
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id, 10) });
        if (user) {
          res.json(user);
        } else {
          res.status(404).send('User not found');
        }
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
      }
    });

    // Update a user
    app.put('/users/:id', async (req: Request, res: Response) => {
      try {
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id, 10) });
        if (user) {
          userRepository.merge(user, req.body);
          const result = await userRepository.save(user);
          res.send(result);
        } else {
          res.status(404).send('User not found');
        }
      } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
      }
    });

    // Delete a user
    app.delete('/users/:id', async (req: Request, res: Response) => {
      try {
        const result = await userRepository.delete(parseInt(req.params.id, 10));
        if (result.affected) {
          res.send('User deleted');
        } else {
          res.status(404).send('User not found');
        }
      } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
      }
    });
  })
  .catch((error) => console.log('Database connection error:', error));

app.get('/', (_, res: Response) => {
  res.send('hi');
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});
