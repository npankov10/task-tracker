import { Plus } from 'lucide-react';
import { Header } from './Header';
import { Button } from './ui/button';
import TaskItem from './TaskItem';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';

type TaskFilter = 'all' | 'active' | 'completed';
const filterItems: TaskFilter[] = ['all', 'active', 'completed'];

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskResponse = {
  tasks: Task[];
};

const AllTasks = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/tasks');
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const tasks: TaskResponse = await response.json();
        setAllTasks(tasks.tasks);
      } catch (error) {
        console.error('Failed to fetch tasks: ', error);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((task) => task.completed).length;
  const activeTasks = allTasks.filter((task) => !task.completed).length;

  const toggleTask = async (id: number) => {
    try {
      const task = allTasks.find((task) => task.id === id);
      if (!task) {
        console.log(`Task wasn't found`);
        return;
      }

      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      setAllTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      );
    } catch (error) {
      console.error('Failed to update the task: ', error);
    }
  };

  const addTask = async (
    event: React.SyntheticEvent<HTMLFormElement>,
    task: string,
  ) => {
    event.preventDefault();
    const title = task.trim();
    if (!title) return;

    try {
      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: 1, title, description: title }),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      setAllTasks((prevTasks) => {
        return [...prevTasks, data.task];
      });

      setNewTaskTitle('');
    } catch (error) {
      console.error('Failed to add the task: ', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete the task: ', error);
    }
  };

  const filteredTasks = allTasks.filter((task) => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'active') {
      return !task.completed;
    }
    if (filter === 'completed') {
      return task.completed;
    }
  });

  return (
    <div className="w-full max-w-[500px] flex flex-col gap-15 p-6">
      <div className="flex flex-col items-start gap-8">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-end justify-between">
            <Header title="All tasks" />
            <span>{`${completedTasks} of ${totalTasks} completed`}</span>
          </div>
          <p className="text-muted-foreground">
            Manage your work in one place.
          </p>
        </div>
        <form
          className="w-full flex flex-col items-end gap-4"
          onSubmit={(event) => addTask(event, newTaskTitle)}>
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full px-4 py-5 cursor-pointer"
            variant="secondary">
            <Plus />
            Add task
          </Button>
        </form>
      </div>
      <div className="flex gap-5">
        {filterItems.map((item) => {
          const text = item.slice(0, 1).toUpperCase() + item.slice(1);
          let statistics = 0;
          switch (item) {
            case 'all':
              statistics = totalTasks;
              break;
            case 'active':
              statistics = activeTasks;
              break;
            case 'completed':
              statistics = completedTasks;
              break;
          }
          return (
            <div key={item} className="flex items-center">
              <Button
                onClick={() => setFilter(item)}
                variant={filter === item ? 'secondary' : 'ghost'}
                size="lg"
                className="cursor-pointer">
                {`${text} (${statistics})`}
              </Button>
              <span className="px-4 after:content-['·'] last:after:content-['']"></span>
            </div>
          );
        })}
      </div>

      <ul className="flex flex-col gap-6">
        {filteredTasks.map((item) => (
          <TaskItem
            key={item.id}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(item.id)}
            title={item.title}
            completed={item.completed}
          />
        ))}
      </ul>
    </div>
  );
};

export default AllTasks;
