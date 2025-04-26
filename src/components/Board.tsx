import React from 'react';
import type { Board as BoardType } from '../types';
import List from './List';
import AddList from './AddList';
import { useBoardStore } from '../store/board-store';

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  const { addList, addCard, moveCard } = useBoardStore();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div 
      className="flex-1 overflow-x-auto overflow-y-hidden"
      onDragOver={handleDragOver}
    >
      <div className="flex gap-3 p-6 h-full items-start">
        {board.lists.map(list => (
          <List
            key={list.id}
            list={list}
            boardId={board.id}
            onAddCard={addCard}
            onMoveCard={moveCard}
          />
        ))}
        <AddList onAddList={(title) => addList(board.id, title)} />
      </div>
    </div>
  );
};

export default Board;