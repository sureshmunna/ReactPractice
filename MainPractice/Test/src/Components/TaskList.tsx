import { memo, useCallback, useState } from "react"

interface TaskItemProperties{
    task : string
    onDelete :(task:string) => void
}

const TaskItem = memo(({task,onDelete}:TaskItemProperties)=>{
    console.log("Task Item rendered:",task);
    return(
        <div style={{display:"flex",gap:"10px",margin:"4px"}}>
            <span>{task}</span>
            <button onClick={()=>onDelete(task)}>Delete</button>
        </div>
    )
    
})
const TaskList = ()=>{
    const [tasks,setTasks]=useState<string[]>(["Task 1", "Task 2", "Task 3"])
    const [count, setCount]=useState<number>(0)

    const handleDelete = useCallback((task:string):void=>{
        setTasks(prev =>prev.filter(t=>t!==task))
    },[])
// const handleDelete = (task:string):void=>{
//         setTasks(prev =>prev.filter(t=>t!==task))
//     }
    return(
        <div>
            <h2>useCallback + memo Demo</h2>
            <button onClick={()=>setCount(c=>c+1)}>Count : {count}</button>
            <h3>Tasks :</h3>
            {tasks.map((task)=>(
                <TaskItem 
                    key={task}
                    task={task}
                    onDelete={handleDelete}
                ></TaskItem>
            ))}
        </div>
    )
}
export default TaskList