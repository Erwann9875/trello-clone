import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBoardStore } from '../store/board-store';
import BoardHeader from '../components/BoardHeader';
import Board from '../components/Board';

export default function BoardPage() {
  const { boardId } = useParams();
  const { setActiveBoard, activeBoard } = useBoardStore();

  useEffect(() => {
    if (boardId) {
      setActiveBoard(boardId);
    }
  }, [boardId, setActiveBoard]);

  if (!activeBoard) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <p className="text-secondary">Board not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <BoardHeader board={activeBoard} />
      <Board board={activeBoard} />
    </div>
  );
}