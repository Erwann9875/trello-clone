import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Search, Plus, Home, Bell, Settings, User, LogOut, CheckCircle2, Clock, Layout, Users } from 'lucide-react';
import { cn } from '../lib/utils';

const Header: React.FC = () => {
  const [notifications] = useState([
    { id: 1, title: 'John Doe mentioned you', time: '2 hours ago', isRead: false },
    { id: 2, title: 'Due date approaching', time: '5 hours ago', isRead: true },
  ]);

  return (
    <header className="h-16 bg-card border-b border-border px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="p-2 hover:bg-card-hover rounded-md transition-colors"
        >
          <Home size={20} />
        </Link>
        <Link
          to="/"
          className="font-semibold text-sm px-3 py-1.5 hover:bg-card-hover rounded-md transition-colors"
        >
          Boards
        </Link>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
          <input
            type="text"
            placeholder="Search"
            className={cn(
              "h-9 w-64 pl-9 pr-4 rounded-md bg-card-hover text-sm",
              "placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
          />
        </div>
      </div>
      
      <Link to="/" className="absolute left-1/2 -translate-x-1/2">
        <h1 className="font-bold text-xl">Trello Clone</h1>
      </Link>
      
      <div className="flex items-center space-x-2">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-2 hover:bg-card-hover rounded-md transition-colors relative">
              <Bell size={20} />
              {notifications.some(n => !n.isRead) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="w-80 bg-background rounded-lg shadow-xl border border-border p-2 z-50"
              sideOffset={5}
              align="end"
            >
              <div className="px-3 py-2 text-sm font-medium text-foreground">Notifications</div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <DropdownMenu.Item
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-3 px-3 py-2 rounded-md cursor-pointer text-foreground",
                      "hover:bg-card focus:bg-card outline-none",
                      !notification.isRead && "bg-primary/5"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      notification.isRead ? "bg-secondary/20" : "bg-primary/20"
                    )}>
                      {notification.isRead ? (
                        <CheckCircle2 size={16} className="text-secondary" />
                      ) : (
                        <Clock size={16} className="text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-foreground">{notification.title}</div>
                      <div className="text-xs text-secondary mt-0.5">{notification.time}</div>
                    </div>
                  </DropdownMenu.Item>
                ))}
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-2 hover:bg-card-hover rounded-md transition-colors">
              <Plus size={20} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="w-64 bg-background rounded-lg shadow-xl border border-border p-2 z-50"
              sideOffset={5}
              align="end"
            >
              <DropdownMenu.Item
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-card focus:bg-card outline-none text-foreground"
              >
                <Layout size={16} className="text-secondary" />
                <span>Create board</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-card focus:bg-card outline-none text-foreground"
              >
                <Users size={16} className="text-secondary" />
                <span>Create workspace</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <Link
          to="/settings"
          className="p-2 hover:bg-card-hover rounded-md transition-colors"
        >
          <Settings size={20} />
        </Link>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User size={20} className="text-primary" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="w-64 bg-background rounded-lg shadow-xl border border-border p-2 z-50"
              sideOffset={5}
              align="end"
            >
              <div className="px-3 py-2 border-b border-border">
                <div className="font-medium text-foreground">John Doe</div>
                <div className="text-sm text-secondary">john@example.com</div>
              </div>
              <DropdownMenu.Item
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-card focus:bg-card outline-none mt-1 text-foreground"
              >
                <LogOut size={16} className="text-secondary" />
                <span>Sign out</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
};

export default Header;