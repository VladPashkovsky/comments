import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
}

interface Props {
  onAddTodo: (todo: Todo) => void;
}

const TodoFormExample = ({ onAddTodo }: Props) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
    };
    onAddTodo(newTodoItem);
    setNewTodo('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Enter new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoFormExample;
