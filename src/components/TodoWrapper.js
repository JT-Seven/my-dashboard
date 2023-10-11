import React, {useState} from 'react'
import { TodoForm } from './TodoForm'
import { EditTodoForm } from './EditTodoForm'
import {v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    const addTodo  = (todoValue) => {
        setTodos([...todos, {id: uuidv4(), task: todoValue, completed: false, isEditing: false}])
        console.log(todos);
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    //delete all tasks
    const deleteAll = () => {
        setTodos([]);
    }

    const editTodoForm = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, task: task, isEditing: !todo.isEditing} : todo))
    }

    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done !</h1>
            <div className='btn-removeAllTask' onClick={deleteAll}><FontAwesomeIcon icon={faTrash} /></div>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} />
                ) : (
                    <Todo key={index} task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodoForm={editTodoForm} />
                )
            ))}
        </div>
    )
}
