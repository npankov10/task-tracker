import { cn } from '@/lib/utils';
import { Header } from './Header';
import { CheckCheck, FilePenLine, FolderClosed, Settings } from 'lucide-react';
import { useState } from 'react';

const navigationItems = [
  { id: 'tasks', label: 'All tasks', icon: FilePenLine },
  { id: 'projects', label: 'Projects', icon: FolderClosed },
  { id: 'settings', label: 'Settings', icon: Settings },
];
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('tasks');

  return (
    <aside className="flex flex-col gap-4 w-64 shrink-0 border-r bg-muted/30 p-6">
      <div className="flex items-end">
        <CheckCheck className="w-5" />
        <Header title="Task Tracker" />
      </div>
      <nav>
        <ul className="flex flex-col gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveItem(item.id)}
                  className={cn(
                    'cursor-pointer flex w-full items-center gap-2 rounded-md p-2 transition-colors duration-150 hover:bg-accent hover:text-accent-foreground',
                    activeItem === item.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground',
                  )}>
                  <Icon className="w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
