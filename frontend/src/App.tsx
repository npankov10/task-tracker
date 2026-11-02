import { useState } from 'react';
import { Header } from './components/Header';
import './App.css';
import { Button } from '@/components/ui/button';
import Sidebar from './components/Sidebar';
import AllTasks from './components/AllTasks';

function App() {
  const [showTasks, setShowTasks] = useState(true);
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React', completed: false },
    { id: 2, title: 'Learn Prisma', completed: true },
    { id: 3, title: 'Build Task Tracker', completed: false },
  ]);

  const addTask = () => {
    if (title.trim().length > 0) {
      const count = tasks.map((item) => item.id);
      let largest = 1;

      if (count.length > 0) {
        largest = Math.max(...count) + 1;
      }

      const newTask = {
        id: largest,
        title: title.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTitle('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, completed: !task.completed };
          return updatedTask;
        } else {
          return task;
        }
      }),
    );
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1">
        <AllTasks />
      </main>

      {/* <p>Manage your projects and tasks in one place.</p>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Enter task title"
        value={title}
      />
      <button onClick={() => setShowTasks(!showTasks)}>
        {showTasks === true ? `Hide` : `Show`} tasks
      </button>
      <Button onClick={addTask}>Add Task</Button>
      {showTasks && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} -
              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? 'Complete' : 'Undo'}
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default App;
