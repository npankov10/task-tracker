import express, { type Express, type Request, type Response } from 'express';
import Task from './types/task.js';

const app: Express = express();
const port = 3001;

const tasks: Task[] = [];

app.get('/', (req: Request, res: Response) => {
  res.json({ message: `Task Tracker API` });
});

app.get('/tasks', (req: Request, res: Response) => {
  res.status(200).json({ tasks });
});

app.listen(port, () => {
  console.log(`Task Tracker API listening on port ${port}`);
});
