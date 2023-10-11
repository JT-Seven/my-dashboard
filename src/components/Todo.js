import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, toggleComplete, deleteTodo, editTodoForm}) => {
    return (
        <div className={`${task.completed ? 'Todo completed' : "Todo"}`}>
            <p onClick={() => toggleComplete(task.id)}>{task.task}</p>
            <div className='box-icons'>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodoForm(task.id)} id='editIcon'/>
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
            </div>
        </div>
    )
}
