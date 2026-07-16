import { useState } from "react"

const BatchDemo =()=>{
    const[count,setCount]= useState<number>(0)
    const[name,SetName]= useState<string>("")
    console.log("Component Render");
    const handleClick =()=>{
        setCount((c)=>c+1)
        SetName("Suresh")
    }
    const handleAsyncClick = async()=>{
        await new Promise((resolve)=>{
             setTimeout(resolve,100)
        })
        setCount((c)=>c+1)
        SetName("suresh babu")
    }
    return (
        <div>
            <h2>Count :{count}</h2>
            <h2>Name :{name}</h2>
            <button onClick={handleClick}>sync click</button>
            <button onClick={handleAsyncClick}>Asuyn click</button>
        </div>
    )
}
export default BatchDemo