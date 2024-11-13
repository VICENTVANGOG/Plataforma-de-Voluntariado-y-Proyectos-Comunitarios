import { FolderKanban } from 'lucide-react';
import { Menu } from '@/UI/organims/menu/menuAtomic';

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const menuItems = [
    {
      id: 'projects',
      label: 'Proyectos',
      icon: FolderKanban,
      path: '/projects'
    },

  ];

  return (
    <div className="flex">
      <Menu items={menuItems} />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default SidebarLayout;
