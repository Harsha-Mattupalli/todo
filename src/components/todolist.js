import React from "react";
import TodoItem from "./todo-item";

const Todolist = ({ tasks, toggleTask, deleteTask }) => {
    return (
        <ul>
            {
                tasks && tasks.length > 0 && tasks.map((task, index) => {
                    return (<TodoItem
                        key={task.id}
                        task={task}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                    />)
                })
            }

        </ul>
    )
}
export default Todolist