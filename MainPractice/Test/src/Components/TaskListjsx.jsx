import { memo, useCallback, useState } from "react";

const TakItem = memo(({task,onDelete})=>{
    console.log("Task Item rendered:",task);
    return(
            <div style={{display:"flex",gap:"10px",margin:"4px"}}>
                <span>{task}</span>
                <button onClick={()=>onDelete(task)}>Delete</button>
            </div>
    )
})

const TaskListjsx = ()=>{
    const[tasks,setTasks]= useState(["Task 1","Task 2","Task 3"])
    const[count , setCount]=useState(0)

    // const handleDelete =(task)=>{
    //     setTasks(prev=>prev.filter(t=>t!==task))
    // }

    const handleDelete =useCallback((task)=>{
        setTasks(prev=>prev.filter(t=>t!==task))
    },[])
    return (
        <div>
            <h2>useCallback + memo Demo</h2>
            <button onClick={()=>setCount(c=>c+1)}>Count : {count}</button>
            <h3>Tasks :</h3>
            {tasks.map((task)=>(
                <TakItem
                    key={task}
                    task={task}
                    onDelete={handleDelete}
                ></TakItem>
            ))}
        </div>
    )
}
export default TaskListjsx