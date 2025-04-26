import React from 'react';
import { Star, Users, Lock, MoreHorizontal } from 'lucide-react';
import type { Board } from '../types';
import { cn } from '../lib/utils';

interface BoardHeaderProps {
  board: Board;
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ board }) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between border-b border-border">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">{board.title}</h2>
        <button className="p-1.5 hover:bg-card-hover rounded-md transition-colors text-secondary">
          <Star size={16} />
        </button>
        <div className="h-6 border-r border-border"></div>
        <button className={cn(
          "flex items-center space-x-2 px-3 py-1.5 rounded-md",
          "hover:bg-card-hover transition-colors text-secondary"
        )}>
          <Lock size={16} />
          <span className="text-sm">Private</span>
        </button>
        <div className="h-6 border-r border-border"></div>
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Users size={16} className="text-primary" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className={cn(
          "flex items-center space-x-2 px-3 py-1.5 rounded-md",
          "bg-card hover:bg-card-hover transition-colors text-secondary"
        )}>
          <span className="text-sm">Automation</span>
        </button>
        <button className={cn(
          "flex items-center space-x-2 px-3 py-1.5 rounded-md",
          "bg-card hover:bg-card-hover transition-colors text-secondary"
        )}>
          <span className="text-sm">Filters</span>
        </button>
        <button className="p-2 hover:bg-card-hover rounded-md transition-colors text-secondary">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default BoardHeader;