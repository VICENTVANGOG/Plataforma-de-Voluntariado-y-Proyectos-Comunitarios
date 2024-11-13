import React from 'react';
import { LucideIcon } from 'lucide-react';
import './Sidebar.scss'; // Importa los estilos SCSS

interface MenuItemData {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

interface MenuProps {
  items: MenuItemData[];
}

export const Menu = ({ items }: MenuProps) => {
  return (
    <nav className="sidebar">
      <div className="menu">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.path}
            className="menuItem"
          >
            <item.icon className="icon" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};
