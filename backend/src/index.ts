import express, { type Express, type Request, type Response } from 'express';
import type {
  Task,
  CreateTaskBody,
  TaskParams,
  UpdateTaskBody,
} from './types/task.js';

const app: Express = express();
app.use(express.json());
const port = 3001;

const tasks: Task[] = [];

app.get('/', (req: Request, res: Response) => {
  res.json({ message: `Task Tracker API` });
});

app.get('/tasks', (req: Request, res: Response) => {
  res.status(200).json({ tasks });
});

app.post(
  '/tasks',
  async (req: Request<{}, {}, CreateTaskBody>, res: Response) => {
    const { title, description } = req.body;
    if (
      !title ||
      title.trim() === '' ||
      !description ||
      description.trim() === ''
    ) {
      return res
        .status(400)
        .json({ message: `Title and description are required` });
    }

    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
      completed: false,
    };

    try {
      tasks.push(newTask);
      res.status(201).json({
        message: `New task successfully added`,
        task: newTask,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: `500 Internal Server Error` });
    }
  },
);

app.get(
  '/tasks/:id',
  async (req: Request<TaskParams, {}, {}>, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: `Invalid id` });
    }

    try {
      const task = tasks.find((task) => task.id === id);

      if (task) {
        return res
          .status(200)
          .json({ message: `Task found successfully`, task });
      } else {
        return res.status(404).json({ message: `Task not found` });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Internal server error` });
    }
  },
);

app.patch(
  '/tasks/:id',
  (req: Request<TaskParams, {}, UpdateTaskBody>, res: Response) => {
    const id = Number(req.params.id);
    const { title, description, completed } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    try {
      const task = tasks.find((item) => item.id === id);
      if (!task) {
        return res.status(404).json({ message: `Task with ${id} not found` });
      }

      if (title !== undefined && task.title !== title) {
        task.title = title;
      }
      if (description !== undefined && task.description !== description) {
        task.description = description;
      }
      if (completed !== undefined && task.completed !== completed) {
        task.completed = completed;
      }
      res
        .status(200)
        .json({ message: `Task with ${id} changed successfully!`, task });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
);

app.listen(port, () => {
  console.log(`Task Tracker API listening on port ${port}`);
});
