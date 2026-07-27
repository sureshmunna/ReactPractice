import React, { ReactNode, createContext, Dispatch, useReducer, useCallback, useContext, memo } from "react"

interface Task{
    id: number,
    text :string,
    completed : boolean
}

interface AppState{
    tasks : Task[], 
    theme : "light"|"dark"
}

type AppAction = |{type:"addTask",payload:string}|{type:"toggleTask",payload:number}|{type:"deleteTask",payload:number}|{type:"toggleTheme"}

const initialState :AppState ={
    tasks:[{id:1,text:"Learn userReducer",completed:false},
        {id:2,text:"Build AI project",completed:false}
    ],
    theme:"light"
}

const appReducer = (state :AppState,action:AppAction):AppState=>{
    switch(action.type){
        case "addTask":
            return{
                ...state,
                tasks:[
                    ...state.tasks,
                    {id:Date.now(),text:action.payload,completed:false}
                ]
            }
        case "toggleTask":
            return{
                ...state,
                tasks:state.tasks.map(task=>
                    task.id===action.payload
                    ?{...task,completed:!task.completed}
                    :task
                )
            }
        case "deleteTask":
            return{
                ...state,
                tasks:state.tasks.filter(task=>task.id !==action.payload)
            }    
        case "toggleTheme":
            return{
                ...state,
                theme : state.theme === "light" ? "dark" :"light"
            }
        default :
            return state
    }
}
const AppStateContext = createContext<AppState | null>(null)
const AppDispatchContext = createContext<React.Dispatch<AppAction>|null>(null)

export const SplitAppProvider = ({children}:{children:ReactNode})=>{
    const [state,dispatch]=useReducer(appReducer,initialState)

    return(
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    )
}

export const useAppState = ()=>{
    const context = useContext(AppStateContext)
    if(!context) throw new Error("useAppState must be inside SplitAppProvider")
        return context
}

export const useAppDispatch =()=>{
    const context = useContext(AppDispatchContext)
    if(!context) throw new Error("useAppDispatch must be inside SplitAppProvider")
        return context
}

const TaskInput = memo(()=>{
    const dispatch = useAppDispatch()
    const [text , setText]=useReducer(
        (_:string,e:React.ChangeEvent<HTMLInputElement>)=>e.target.value,""
    )

    console.log("TaskInput Rendered");

    const handleAdd=()=>{
        if(!text.trim())return
        dispatch({type:"addTask",payload:text})
    }
    return(
        <div>
            <input value={text} onChange={setText} placeholder="Add New Task" />
            <button onClick={handleAdd}>Add Task</button>
        </div>
    )
    
})
const TaskItem = memo(({task}:{task:Task})=>{
    const dispatch = useAppDispatch()
    console.log("TaskItem rendered", task.text);
    return(
        <li style={{
            textDecoration: task.completed ? "line-through" : "none",
            margin: "6px 0",
            display: "flex",
            gap: "10px"
        }}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch({ type: "toggleTask", payload: task.id })}
            />
            {task.text}
            <button onClick={() => dispatch({ type: "deleteTask", payload: task.id })}>
                Delete
            </button>
        </li>
    )
})

const TaskList = () => {
    const state = useAppState() // only state context

    console.log("TaskList rendered")

    return (
        <ul>
            {state.tasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    )
}

// TaskStats — needs state only
const TaskStats = () => {
    const state = useAppState() // only state

    console.log("TaskStats rendered")

    const completed = state.tasks.filter(t => t.completed).length
    const total = state.tasks.length

    return (
        <div style={{
            padding: "8px",
            background: "#f0f0f0",
            borderRadius: "8px",
            margin: "8px 0"
        }}>
            <p>Total: {total} | Completed: {completed} | Pending: {total - completed}</p>
        </div>
    )
}

// ThemeToggle — needs both state and dispatch
const ThemeToggle = () => {
    const state = useAppState()      // state context
    const dispatch = useAppDispatch() // dispatch context

    console.log("ThemeToggle rendered")

    return (
        <button
            onClick={() => dispatch({ type: "toggleTheme" })}
            style={{
                background: state.theme === "dark" ? "#fff" : "#333",
                color: state.theme === "dark" ? "#333" : "#fff",
                padding: "8px 16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "12px"
            }}
        >
            {state.theme === "dark" ? "Light" : "Dark"}
        </button>
    )
}

// Main Component
const SplitContextDemo = () => {
    const state = useAppState()

    return (
        <div style={{
            padding: "1rem",
            background: state.theme === "dark" ? "#333" : "#fff",
            color: state.theme === "dark" ? "#fff" : "#333",
            minHeight: "300px"
        }}>
            <h2>Context Performance Splitting</h2>
            <ThemeToggle />
            <TaskStats />
            <TaskInput />
            <TaskList />
        </div>
    )
}

// Wrapper with Provider
const SplitContextDemoWrapper = () => (
    <SplitAppProvider>
        <SplitContextDemo />
    </SplitAppProvider>
)

export default SplitContextDemoWrapper