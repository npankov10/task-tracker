import { Header } from './Header';
import { CheckCheck, FilePenLine, FolderClosed, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-4 w-64 shrink-0 border-r bg-muted/30 p-6">
      <div className="flex items-end">
        <CheckCheck className="w-5" />
        <Header title="Task Tracker" />
      </div>
      <nav>
        <ul className="flex flex-col gap-4">
          <li>
            <a className="flex gap-1" href="#">
              <FilePenLine className="w-5" />
              <span>All tasks</span>
            </a>
          </li>
          <li>
            <a className="flex gap-1" href="#">
              <FolderClosed />
              <span>Projects</span>
            </a>
          </li>
          <li>
            <a className="flex gap-1" href="#">
              <Settings />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
