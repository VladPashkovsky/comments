import {create} from 'zustand';

export interface Todo {
  id: number;
  text: string;
}

interface Store {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
}

const useStore = create<Store>((set) => ({
  todos: [],
  addTodo: (todo) =>
    set((state) => ({ todos: [...state.todos, todo] })),
}));

export default useStore;