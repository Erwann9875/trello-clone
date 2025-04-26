import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface AddListProps {
  onAddList: (title: string) => void;
}

const AddList: React.FC<AddListProps> = ({ onAddList }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleAddList = () => {
    if (title.trim()) {
      onAddList(title.trim());
      setTitle('');
      setIsAdding(false);
    }
  };

  if (isAdding) {
    return (
      <div className="w-72 shrink-0 bg-card rounded-md p-2">
        <input
          type="text"
          className={cn(
            "w-full p-2 rounded bg-background border border-border",
            "text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          )}
          placeholder="Enter list title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <div className="flex items-center mt-2 space-x-2">
          <button 
            className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-white rounded text-sm font-medium"
            onClick={handleAddList}
          >
            Add list
          </button>
          <button 
            className="p-1.5 hover:bg-card-hover rounded text-secondary"
            onClick={() => setIsAdding(false)}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button 
      className={cn(
        "w-72 shrink-0 p-3 rounded-md",
        "bg-card/50 hover:bg-card transition-colors",
        "flex items-center text-secondary"
      )}
      onClick={() => setIsAdding(true)}
    >
      <Plus size={16} className="mr-2" />
      <span className="text-sm">Add another list</span>
    </button>
  );
};

export default AddList;