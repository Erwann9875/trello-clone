export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  labels: Label[];
  dueDate: string;
  members: string[];
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
}

export interface Board {
  id: string;
  title: string;
  description: string;
  backgroundColor: string;
  lists: List[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}