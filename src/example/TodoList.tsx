import React, { useState } from 'react'
import TodoFormExample from './TodoForm'

interface Todo {
  id: number;
  text: string;
}

const TodoListExample = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo])
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoFormExample onAddTodo={handleAddTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default TodoListExample

