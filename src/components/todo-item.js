import React from "react";

const TodoItem = ({ task, toggleTask, deleteTask }) => {
    return (
        <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            <span onClick={() => toggleTask(task.id)}>{task.todo}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>

    )
}
export default TodoItem