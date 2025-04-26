import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBoardStore } from '../store/board-store';

export default function HomePage() {
  const { boards, addBoard } = useBoardStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Your boards</h1>
        <button
          onClick={() => addBoard('New Board')}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
        >
          <Plus size={20} />
          <span>Create board</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            to={`/board/${board.id}`}
            className="group relative aspect-video bg-card hover:bg-card-hover rounded-lg p-4 transition-all"
          >
            <h3 className="text-lg font-semibold mb-2">{board.title}</h3>
            <p className="text-secondary text-sm line-clamp-2">{board.description}</p>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-lg transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}