import React, { useState } from 'react';
import './ToDoList.css';

// ToDoList Component
const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Function to add a new todo
    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { text: newTodo, completed: false, isEditing: false }]);
            setNewTodo('');
        }
    };

    // Function to delete a todo
    const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    // Function to mark a todo as completed
    const toggleComplete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    };

    // Function to start editing a todo
    const startEditing = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].isEditing = true;
        setTodos(updatedTodos);
    };

    // Function to update a todo
    const updateTodo = (index, newText) => {
        const updatedTodos = [...todos];
        updatedTodos[index].text = newText;
        updatedTodos[index].isEditing = false;
        setTodos(updatedTodos);
    };

    // Function to cancel editing
    const cancelEditing = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].isEditing = false;
        setTodos(updatedTodos);
    };

    return (
        <div className="todo-container">
            <h2>TODO List</h2>
            <div className="todo-input">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        className={`todo-item ${todo.completed ? 'completed' : ''}`}
                    >
                        {todo.isEditing ? (
                            <span>
                                <input
                                    type="text"
                                    className="editing-input"
                                    defaultValue={todo.text}
                                    onChange={(e) => updateTodo(index, e.target.value)}
                                />
                                <button onClick={() => updateTodo(index, todo.text)} className="edit-btn">Update</button>
                                <button onClick={() => cancelEditing(index)} className="delete-btn">Cancel</button>
                            </span>
                        ) : (
                            <span>
                                <span>{todo.text}</span>
                                <button onClick={() => toggleComplete(index)} className="complete-btn">
                                    {todo.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                                </button>
                                <button onClick={() => startEditing(index)} className="edit-btn">Edit</button>
                                <button onClick={() => deleteTodo(index)} className="delete-btn">Delete</button>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
