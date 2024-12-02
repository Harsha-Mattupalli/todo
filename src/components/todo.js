import { useEffect, useState } from "react"
import AddTodo from "./add-todo"
import FilterTodoList from "./todo-filter"
import Todolist from "./todolist"
import axios from "axios";


function Todo() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks)
        } else {
            axios.get("https://dummyjson.com/todos")
                .then((response) => {
                    setTasks(response.data.todos);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });

        }
    }, [])
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    const addTask = (text) => {
        const newTask = {
            id: Date.now(),
            todo: text,
            completed: false
        }
        setTasks([newTask, ...tasks]);
    }

    const toggleTask = (id) => {
        setTasks(
            tasks &&
            tasks.map((task) =>
                task && task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );

    }
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }
    const filteredTasks = tasks && tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    return (
        <div>
            <h1>To-Do List</h1>
            <AddTodo addTask={addTask} />
            <FilterTodoList setFilter={setFilter} />
            <Todolist
                tasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask} />
        </div>
    )
}

export default Todo