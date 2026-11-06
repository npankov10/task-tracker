import { Circle, CircleCheck, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type TaskItemProps = {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

const TaskItem = ({ title, completed, onToggle, onDelete }: TaskItemProps) => {
  return (
    <li className="flex justify-between">
      <button
        onClick={onToggle}
        className={cn(
          'cursor-pointer flex gap-2',
          completed && 'line-through',
        )}>
        {completed ? <CircleCheck /> : <Circle />}
        <span>{title}</span>
      </button>
      <Trash2
        onClick={onDelete}
        className="cursor-pointer duration-200 hover:text-destructive"
      />
    </li>
  );
};

export default TaskItem;
