import React, { useState, useEffect } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { TodoForm } from './TodoForm'
import { EditTodoForm } from './EditTodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { RandomPictures } from './RandomPictures';
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todoValue) => {
        const newTodo = { id: uuidv4(), task: todoValue, completed: false, isEditing: false };
        setTodos([...todos, newTodo]);
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
        localStorage.setItem('todos', JSON.stringify(todos.filter(todo => todo.id !== id)));
    }

    const deleteAll = () => {
        setTodos([]);
        localStorage.setItem('todos', JSON.stringify([]));
    }

    const editTodoForm = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    }

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task: task, isEditing: !todo.isEditing } : todo))
    }

    const [{ background }] = useSpring(
        () => ({
            from: { background: 'var(--step0)' },
            to: [
                { background: 'var(--step0)' },
                { background: 'var(--step1)' },
                { background: 'var(--step2)' },
                { background: 'var(--step3)' },
                { background: 'var(--step4)' },
            ],
            config: config.molasses,
            loop: {
                reverse: true,
            },
        }),
        []
    )

    return (
        <>
            <animated.div style={{ background }} className={`TodoWrapper`}>
                <h1>Get Things Done !</h1>
                <animated.div style={{ background }} className={`btn-removeAllTask`} onClick={deleteAll}><FontAwesomeIcon icon={faTrash} /></animated.div>
                <TodoForm addTodo={addTodo} />
                {todos.map((todo, index) => (
                    todo.isEditing ? (
                        <EditTodoForm editTodo={editTask} task={todo} />
                    ) : (
                        <Todo key={index} task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodoForm={editTodoForm} />
                    )
                ))}
            </animated.div>
            <RandomPictures />
        </>
    )
}
