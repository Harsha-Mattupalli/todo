import React, { useState } from "react"


const AddTodo = ({ addTask }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            addTask(text);
            setText("");
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new Task.." />
            <button type="submit">Add</button>
        </form>

    )
}
export default AddTodo