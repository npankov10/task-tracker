import express, { type Express, type Request, type Response } from 'express';
import type {
  Task,
  CreateTaskBody,
  TaskParams,
  UpdateTaskBody,
  TaskParamsCompleted,
} from './types/task.js';
import prisma from './lib/prisma.js';

const app: Express = express();
app.use(express.json());
const port = 3001;

const tasks: Task[] = [];

app.get('/', (req: Request, res: Response) => {
  res.json({ message: `Task Tracker API` });
});

app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal server error` });
  }
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

    try {
      const task = await prisma.task.create({ data: { title, description } });
      res.status(201).json({
        message: `New task successfully added`,
        task,
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
      const task = await prisma.task.findUnique({
        where: {
          id,
        },
      });

      if (!task) {
        return res.status(404).json({ message: `Task not found` });
      }

      return res.status(200).json({ message: `Task found successfully`, task });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Internal server error` });
    }
  },
);

// app.patch(
//   '/tasks/:id',
//   (req: Request<TaskParams, {}, UpdateTaskBody>, res: Response) => {
//     const id = Number(req.params.id);
//     const { title, description, completed } = req.body;

//     if (Number.isNaN(id)) {
//       return res.status(400).json({ message: 'Invalid id' });
//     }

//     try {
//       const task = tasks.find((item) => item.id === id);
//       if (!task) {
//         return res.status(404).json({ message: `Task with ${id} not found` });
//       }

//       if (title !== undefined && task.title !== title) {
//         task.title = title;
//       }
//       if (description !== undefined && task.description !== description) {
//         task.description = description;
//       }
//       if (completed !== undefined && task.completed !== completed) {
//         task.completed = completed;
//       }
//       res
//         .status(200)
//         .json({ message: `Task with ${id} changed successfully!`, task });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   },
// );

// app.delete('/tasks/:id', (req: Request<TaskParams, {}, {}>, res: Response) => {
//   const id = Number(req.params.id);
//   if (Number.isNaN(id)) {
//     return res.status(400).json({ message: 'Id not found' });
//   }

//   try {
//     const index = tasks.findIndex((item) => item.id === id);
//     if (index !== -1) {
//       const removed = tasks.splice(index, 1);
//       return res
//         .status(200)
//         .json({ message: `Task deleted successfully!`, removed: removed[0] });
//     } else {
//       return res.status(404).json({ message: `Task with id ${id} not found` });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.get(
//   '/tasks/completed/:status',
//   (req: Request<TaskParamsCompleted, {}, {}>, res: Response) => {
//     const completedStatus = req.params.status;
//     if (completedStatus !== 'true' && completedStatus !== 'false') {
//       return res.status(400).json({ message: `Status isn't correct` });
//     }

//     try {
//       const status = completedStatus === 'true';
//       const result = tasks.filter((item) => item.completed === status);
//       return res
//         .status(200)
//         .json({ message: `Requested task(s) returned`, result });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: `Internal server error` });
//     }
//   },
// );

app.listen(port, () => {
  console.log(`Task Tracker API listening on port ${port}`);
});
