import 'reflect-metadata';
import express, { Request, Response } from 'express';
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
