import React, {  createContext ,ReactNode, useContext, useReducer} from "react"

interface Task{
    id: number
    text :string
    completed:boolean
}
interface AppState{
    tasks:Task[]
    theme:"light"|"dark"
}
type AppAction =|{type:"addTask";payload:string}|{type:"toggleTask";payload:number}|{type:"deleteTask";payload:number}|{type:"toogleTheme"}

const initialState :AppState={
    tasks:[{id:1,text :"learn useReducer",completed:false},
        {id:2,text:"Build AI Project",completed:false}
    ],
    theme:"light"
}

const appReducer = (state:AppState,action:AppAction):AppState =>{
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
                    task.id === action.payload
                    ?{...task,completed:!task.completed}
                    : task
                )
            }
        case "deleteTask":
            return{
                ...state,
                tasks:state.tasks.filter(task =>task.id !== action.payload)
            }
        case "toogleTheme":
            return{
                ...state,
                theme:state.theme === "light"?"dark":"light"
            }
        default:
            return state
    }
}
const AppContext = createContext<{state:AppState
    dispatch : React.Dispatch<AppAction>
}|null>(null)

export const AppProvider = ({children}:{children: ReactNode})=>{
    const [state,dispatch]=useReducer(appReducer,initialState)

    return(
        <AppContext.Provider value={{state,dispatch}}>
           {children}
        </AppContext.Provider>
    )
}
//--------Custom Hook----------
export const useAppContext = ()=>{
    const context = useContext(AppContext)
    if(!context) throw new Error("useAppContext must be uside inside AppProvider")
        return context
}


const TaskInput = ()=>{
    const{dispatch}= useAppContext()
    const [text,setText]=useReducer(
        (_: string ,e:React.ChangeEvent<HTMLInputElement>) => e.target.value,""
    )
    const handleAdd = ()=>{
        if(!text.trim()) return
        dispatch({type:"addTask",payload:text})
    }
    return(
        <div>
            <input value={text} onChange={setText} placeholder="Add new Task" />
            <button onClick={handleAdd}>Add Task</button>
        </div>
    )
}

const TaskListComponent = ()=>{
    const {state,dispatch}= useAppContext()

    return(
        <ul>
            {state.tasks.map(task=>(
                <li key={task.id} style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    margin: "6px 0"
                }}>
                 <input type="checkbox" checked={task.completed}
                 onChange={()=>dispatch({type:"toggleTask",payload:task.id})}
                 />{task.text}
                 <button onClick={()=>dispatch({type:"deleteTask",payload:task.id})}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

const GlobalStateDemo = ()=>{
    const {state,dispatch}= useAppContext()

    return(
        <div style={{
            padding: "1rem",
            background: state.theme === "dark" ? "#333" : "#fff",
            color: state.theme === "dark" ? "#fff" : "#333",
            minHeight: "300px"
        }}>
            <h2>Global State with useReducer + Context</h2>
            <button onClick={()=>dispatch({type:"toogleTheme"})}>Toggle Theme: {state.theme}</button>
            <TaskInput/>
            <TaskListComponent/>
        </div>
    )
}
const GlobalStateDemoWrapper =()=>(
    <AppProvider>
        <GlobalStateDemo/>
    </AppProvider>
)
export default GlobalStateDemoWrapper