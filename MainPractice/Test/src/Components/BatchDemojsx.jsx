import { useState } from "react"

const BatchDemoJsx = ()=>{
    const [count,setCount]= useState(0)
    const [name,setName] = useState("")

    console.log("Component Render");

    const handleClick = ()=>{
        setCount((c)=>{ return c+1})
        setName("suresh")
    }
    const handleAsyncClick = async ()=>{
        await new Promise ((resolve)=>{
            setTimeout(resolve,100)
        })
        setCount((c)=>c+1)
        setName("Suresh Babu")
    }
    return(
        <>
            <h2>count : {count}</h2>
            <h2>Name : {name}</h2>
            <button onClick={handleClick}>Sync Click</button>
            <button onClick={handleAsyncClick}>Async Click</button>
            <p>watch console how many times its rendered</p>
        </>
    )
}
export default BatchDemoJsx