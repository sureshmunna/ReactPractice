import { useState } from "react"
import useCounterStore from "./useCounterStore"
import useAppStore from "./useAppStore"

const Counter = () => {
    const count = useCounterStore(state => state.count)
    const increment = useCounterStore(state => state.increment)
    const decrement = useCounterStore(state => state.decrement)
    const reset = useCounterStore(state => state.reset)
    const incrementBy = useCounterStore(state => state.incrementBy)

    console.log("Counter rendered")

    return (
        <div style={{ marginBottom: "1rem" }}>
            <h3>Counter: {count}</h3>
            <button onClick={increment}>+1</button>{" "}
            <button onClick={decrement}>-1</button>{" "}
            <button onClick={() => incrementBy(5)}>+5</button>{" "}
            <button onClick={reset}>Reset</button>
        </div>
    )
}

const CountDisplay = () => {
    const count = useCounterStore(state => state.count)
    console.log("CountDisplay rendered")
    return <p>Count from another component: {count}</p>
}

const TaskInput = () => {
    const addTask = useAppStore(state => state.addTask)
    const [text, setText] = useState("")

    console.log("TaskInput rendered")

    const handleAdd = () => {
        if (!text.trim()) return
        addTask(text)
        setText("")
    }

    return (
        <div>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Add new task"
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    )
}

const TaskList = () => {
    const tasks = useAppStore(state => state.tasks)
    const deleteTask = useAppStore(state => state.deleteTask)
    const toggleTask = useAppStore(state => state.toggleTask)

    console.log("TaskList rendered")

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id} style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    margin: "4px 0",
                    display: "flex",
                    gap: "8px"
                }}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                    />
                    {task.text}
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

const TaskStats = () => {
    const tasks = useAppStore(state => state.tasks)
    const completed = tasks.filter(t => t.completed).length

    console.log("TaskStats rendered")

    return (
        <p style={{
            padding: "6px 10px",
            background: "#f0f0f0",
            borderRadius: "6px",
            fontSize: "13px"
        }}>
            Total: {tasks.length} | Done: {completed} | Left: {tasks.length - completed}
        </p>
    )
}

const ThemeToggle = () => {
    const theme = useAppStore(state => state.theme)
    const toggleTheme = useAppStore(state => state.toggleTheme)

    console.log("ThemeToggle rendered")

    return (
        <button
            onClick={toggleTheme}
            style={{
                background: theme === "dark" ? "#fff" : "#333",
                color: theme === "dark" ? "#333" : "#fff",
                padding: "6px 14px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginBottom: "12px"
            }}
        >
            {theme === "dark" ? "Light" : "Dark"}
        </button>
    )
}

const ZustandDemo = () => {
    const theme = useAppStore(state => state.theme)

    return (
        <div style={{
            padding: "1rem",
            background: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
            minHeight: "100vh"
        }}>
            <h2>Zustand Demo</h2>

            <section>
                <h3>Counter Store</h3>
                <Counter />
                <CountDisplay />
                <p style={{ fontSize: "12px", color: "gray" }}>
                    Open console — both update when count changes
                </p>
            </section>

            <hr />

            <section>
                <h3>App Store — Tasks + Theme</h3>
                <ThemeToggle />
                <TaskStats />
                <TaskInput />
                <TaskList />
                <p style={{ fontSize: "12px", color: "gray" }}>
                    Open console — toggle theme, watch which components render
                </p>
            </section>
        </div>
    )
}

export default ZustandDemo