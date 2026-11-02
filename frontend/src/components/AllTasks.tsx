import { Circle, CircleCheck } from 'lucide-react';

const AllTasks = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">All tasks</h2>
        <p>Manage your work in one place.</p>
      </div>
      <ul className="flex flex-col gap-2">
        <li>
          <a className="flex gap-2" href="#">
            <Circle />
            <span>Learn React</span>
          </a>
        </li>
        <li>
          <a className="flex gap-2" href="#">
            <CircleCheck />
            <span>Learn Prisma</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AllTasks;
