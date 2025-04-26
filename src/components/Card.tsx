import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Clock, MessageSquare, Paperclip, X, Tag, Calendar, User, Plus } from 'lucide-react';
import type { Card as CardType } from '../types';
import { cn } from '../lib/utils';

interface CardProps {
  card: CardType;
  listId: string;
}

const Card: React.FC<CardProps> = ({ card, listId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('cardId', card.id);
    e.dataTransfer.setData('listId', listId);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        <div 
          className={cn(
            "bg-background rounded p-2 shadow-sm cursor-pointer",
            "hover:bg-card-hover transition-colors",
            "active:cursor-grabbing"
          )}
          draggable
          onDragStart={handleDragStart}
        >
          {card.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {card.labels.map((label) => (
                <div 
                  key={label.id}
                  className="h-2 w-10 rounded-sm"
                  style={{ backgroundColor: label.color }}
                  title={label.name}
                />
              ))}
            </div>
          )}
          <p className="text-sm">{card.title}</p>
          {(card.dueDate || card.description) && (
            <div className="flex items-center mt-2 space-x-2 text-secondary">
              {card.dueDate && (
                <div className="flex items-center text-xs">
                  <Clock size={12} className="mr-1" />
                  <span>{new Date(card.dueDate).toLocaleDateString()}</span>
                </div>
              )}
              {card.description && (
                <div className="flex items-center text-xs">
                  <MessageSquare size={12} className="mr-1" />
                  <Paperclip size={12} />
                </div>
              )}
            </div>
          )}
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[768px] max-h-[90vh] bg-background rounded-lg shadow-xl",
          "overflow-y-auto"
        )}>
          <div className="sticky top-0 bg-background z-10 p-6 border-b border-border">
            <Dialog.Title className="text-2xl text-white font-semibold">
              {card.title}
            </Dialog.Title>
            <div className="flex items-center mt-2 text-secondary text-sm">
              <User size={14} className="mr-1" />
              <span>Created by John Doe</span>
              <span className="mx-2">•</span>
              <Calendar size={14} className="mr-1" />
              <span>Created on {new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            <div className="flex gap-8">
              <div className="flex-1 space-y-6">
                {card.description && (
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-white">Description</h4>
                    <p className="text-sm text-secondary bg-card-hover p-4 rounded-lg">
                      {card.description}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium mb-3 text-white">Activity</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <User size={16} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <textarea
                          placeholder="Write a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className={cn(
                            "w-full p-3 rounded-lg bg-card-hover border border-border",
                            "text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50",
                            "placeholder:text-secondary min-h-[80px]"
                          )}
                        />
                        <button className="mt-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-medium">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-64 shrink-0 space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3 text-white">Add to card</h4>
                  <div className="space-y-2">
                    <button className={cn(
                      "w-full flex items-center gap-2 px-3 py-2",
                      "bg-card-hover hover:bg-card-active rounded-md transition-colors",
                      "text-sm text-secondary"
                    )}>
                      <Tag size={16} />
                      <span>Labels</span>
                    </button>
                    <button className={cn(
                      "w-full flex items-center gap-2 px-3 py-2",
                      "bg-card-hover hover:bg-card-active rounded-md transition-colors",
                      "text-sm text-secondary"
                    )}>
                      <Clock size={16} />
                      <span>Due date</span>
                    </button>
                  </div>
                </div>

                {card.labels.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-white flex items-center justify-between">
                      Labels
                      <button className="p-1 hover:bg-card-active rounded-md">
                        <Plus size={14} className="text-secondary" />
                      </button>
                    </h4>
                    <div className="space-y-2">
                      {card.labels.map((label) => (
                        <div
                          key={label.id}
                          className={cn(
                            "px-3 py-2 rounded-md text-sm font-medium",
                            "flex items-center justify-between group"
                          )}
                          style={{ backgroundColor: label.color }}
                        >
                          {label.name}
                          <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/20 rounded transition-opacity">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {card.dueDate && (
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-white">Due date</h4>
                    <div className={cn(
                      "px-3 py-2 bg-card-hover rounded-md",
                      "flex items-center justify-between"
                    )}>
                      <div className="flex items-center text-sm">
                        <Clock size={16} className="mr-2 text-secondary" />
                        <span>{new Date(card.dueDate).toLocaleDateString()}</span>
                      </div>
                      <button className="p-1 hover:bg-card-active rounded">
                        <X size={14} className="text-secondary" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Dialog.Close className="absolute top-4 right-4 p-2 hover:bg-card-hover rounded text-secondary">
            <X size={16} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Card;