import express from 'express';
import { createConnection } from 'typeorm';

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// createConnection()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port}`);
//     });
//   })
//   .catch((error) => console.log(error));

// import { Request, Response } from 'express';
// import { getRepository } from 'typeorm';
// import { User } from './entity/User';

// app.get('/users', async (req: Request, res: Response) => {
//   const userRepository = getRepository(User);
//   const users = await userRepository.find();
//   res.json(users);
// });

// app.post('/users', async (req: Request, res: Response) => {
//   const userRepository = getRepository(User);
//   const user = userRepository.create(req.body);
//   const result = await userRepository.save(user);
//   res.send(result);
// });

app.get('/', (_, res) => {
  res.send('hi');
});
