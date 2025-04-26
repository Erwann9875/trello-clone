import React, { useState } from 'react';
import { MoreHorizontal, Plus, X } from 'lucide-react';
import type { List as ListType, Card as CardType } from '../types';
import Card from './Card';
import { cn } from '../lib/utils';

interface ListProps {
  list: ListType;
  boardId: string;
  onAddCard: (boardId: string, listId: string, title: string) => void;
  onMoveCard: (boardId: string, fromListId: string, toListId: string, cardId: string) => void;
}

const List: React.FC<ListProps> = ({ 
  list,
  boardId,
  onAddCard,
  onMoveCard
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onAddCard(boardId, list.id, newCardTitle.trim());
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-card-active');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-card-active');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-card-active');
    
    const cardId = e.dataTransfer.getData('cardId');
    const sourceListId = e.dataTransfer.getData('listId');
    
    if (sourceListId !== list.id) {
      onMoveCard(boardId, sourceListId, list.id, cardId);
    }
  };

  return (
    <div 
      className={cn(
        "w-72 shrink-0 bg-card rounded-md pb-2",
        "transition-colors duration-200"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-3 flex items-center justify-between">
        <h3 className="font-medium text-sm">{list.title}</h3>
        <button className="p-1 hover:bg-card-hover rounded transition-colors text-secondary">
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      <div className="px-2 space-y-2">
        {list.cards.map((card) => (
          <Card 
            key={card.id}
            card={card}
            listId={list.id}
          />
        ))}
        
        {isAddingCard ? (
          <div className="p-2 bg-card-hover rounded">
            <textarea
              className={cn(
                "w-full p-2 rounded bg-background border border-border",
                "text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
              placeholder="Enter a title for this card..."
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              rows={3}
              autoFocus
            />
            <div className="flex items-center mt-2 space-x-2">
              <button 
                className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-white rounded text-sm font-medium"
                onClick={handleAddCard}
              >
                Add card
              </button>
              <button 
                className="p-1.5 hover:bg-card-active rounded text-secondary"
                onClick={() => setIsAddingCard(false)}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <button 
            className={cn(
              "flex items-center w-full p-2 text-secondary text-sm rounded",
              "hover:bg-card-hover transition-colors"
            )}
            onClick={() => setIsAddingCard(true)}
          >
            <Plus size={16} className="mr-1" />
            <span>Add a card</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default List;