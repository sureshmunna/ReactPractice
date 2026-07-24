import React, { createContext, useContext, useReducer } from "react"

const initialState = {
    tasks:[{id:1,text:"Learn useReducer",completed:false},
        {id:2,text :"Build AI Project",completed:false}
    ],
    theme:"light"
}
const appReducer=(state,action)=>{
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
                    :task
                )
            }
        case "deleteTask":
            return{
                ...state,
                tasks:state.tasks.filter(task =>task.id!== action.payload)
            }
        case "toggleTheme":
            return{
                ...state,
                theme:state.theme === "light"?"dark":"light"
            }
        default:
            return state
    }
}

const AppContext = createContext();

export const AppProvider =({children}) =>{
    const [state,dispatch]=useReducer(appReducer,initialState)
    return(
        <AppContext.Provider value={{state,dispatch}}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = ()=>{
    const context = useContext(AppContext)
    if(!context)
        throw new Error("ussAppContext must be used inside the AppProvider")
    return context
}

const TaskInput = ()=>{
    const {dispatch}= useAppContext()
    const [text,setText]=useReducer(
        (_ ,e)=>e.target.value,""
    )
    const handleAdd = ()=>{
        if(!text.trim())return
        dispatch({type:"addTask",payload:text})
    }
    return(
        <div>
            <input value={text} onChange={setText} placeholder="Add New Task" />
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
                    textDecoration:task.completed?"line-through":"none",
                    margin : "6px 0"
                }}> 
                    <input type="checkbox" checked={task.completed} 
                    onChange={()=>dispatch({type:"toggleTask",payload:task.id})}
                    />{task.text}
                    <button onClick={()=>dispatch({type:"deleteTask",payload:task.id})} >Delete</button>
                </li>
            ))}
        </ul>
    )
}

const GlobalStateDemo = () =>{
    const {state,dispatch}=useAppContext()

    return(
        <div style={{
            padding:"1rem",
            background :state.theme ==="dark"?"#333":"#fff",
            color: state.theme === "dark"?"#fff":"#333",
            minHeight:  "300px"
        }}>
            <h2>Global state with reducer + context </h2>
            <button onClick={()=>dispatch({type:"toggleTheme"})} >Toggle Theme : {state.theme}</button>
            <TaskInput/>
            <TaskListComponent/>
        </div>
    )
}

const GlobalStateDemoWrapperjsx = ()=>(
    <AppProvider>
        <GlobalStateDemo/>
    </AppProvider>
)
export default GlobalStateDemoWrapperjsx