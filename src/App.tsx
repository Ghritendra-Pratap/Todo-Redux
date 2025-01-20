// src/App.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from './redux/slices/TodoSlices';
import { RootState, AppDispatch } from './redux/store';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const todos = useSelector((state: RootState) => state.todos.Todo);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      dispatch(addTodo({ title: input }));
      setInput('');
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo({ id }));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(removeTodo({ id }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">To-Do List</h1>

        {/* Input field */}
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-l-md"
            placeholder="Add a new to-do"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-2 border-b ${
                todo.completed ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <span
                onClick={() => handleToggleTodo(todo.id)}
                className={`flex-1 cursor-pointer ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
