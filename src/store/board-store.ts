import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Board, List, Card } from '../types';

interface BoardState {
  boards: Board[];
  activeBoard: Board | null;
  setActiveBoard: (boardId: string) => void;
  addBoard: (title: string) => void;
  addList: (boardId: string, title: string) => void;
  addCard: (boardId: string, listId: string, title: string) => void;
  moveCard: (boardId: string, fromListId: string, toListId: string, cardId: string) => void;
}

const defaultBoard: Board = {
  id: 'board-1',
  title: 'Getting started',
  description: 'Test description !',
  backgroundColor: '#1a1b1e',
  lists: [
    {
      id: 'list-1',
      title: 'To Do',
      cards: [
        {
          id: 'card-1',
          title: 'Create login page',
          description: 'Implement user authentication flow',
          labels: [
            { id: 'label-1', name: 'Frontend', color: '#61BD4F' },
            { id: 'label-2', name: 'High Priority', color: '#EB5A46' }
          ],
          dueDate: '2024-03-20',
          members: ['user-1']
        }
      ]
    }
  ]
};

export const useBoardStore = create<BoardState>((set) => ({
  boards: [defaultBoard],
  activeBoard: defaultBoard,
  setActiveBoard: (boardId) => 
    set((state) => ({
      activeBoard: state.boards.find((board) => board.id === boardId) || null
    })),
  addBoard: (title) =>
    set((state) => ({
      boards: [...state.boards, {
        id: uuidv4(),
        title,
        description: '',
        backgroundColor: '#1a1b1e',
        lists: []
      }]
    })),
  addList: (boardId, title) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              lists: [
                ...board.lists,
                { id: uuidv4(), title, cards: [] }
              ]
            }
          : board
      )
    })),
  addCard: (boardId, listId, title) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.id === listId
                  ? {
                      ...list,
                      cards: [
                        ...list.cards,
                        {
                          id: uuidv4(),
                          title,
                          description: '',
                          labels: [],
                          dueDate: '',
                          members: []
                        }
                      ]
                    }
                  : list
              )
            }
          : board
      )
    })),
  moveCard: (boardId, fromListId, toListId, cardId) =>
    set((state) => {
      const board = state.boards.find((b) => b.id === boardId);
      if (!board) return state;

      const fromList = board.lists.find((l) => l.id === fromListId);
      const toList = board.lists.find((l) => l.id === toListId);
      if (!fromList || !toList) return state;

      const card = fromList.cards.find((c) => c.id === cardId);
      if (!card) return state;

      return {
        boards: state.boards.map((board) =>
          board.id === boardId
            ? {
                ...board,
                lists: board.lists.map((list) => {
                  if (list.id === fromListId) {
                    return {
                      ...list,
                      cards: list.cards.filter((c) => c.id !== cardId)
                    };
                  }
                  if (list.id === toListId) {
                    return {
                      ...list,
                      cards: [...list.cards, card]
                    };
                  }
                  return list;
                })
              }
            : board
        )
      };
    })
}));