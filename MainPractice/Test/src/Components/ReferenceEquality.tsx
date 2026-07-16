import { memo, useMemo, useState } from "react";

const Child = memo(({user}:{user:{name:string}})=>{
    console.log("Child rendered");
    return <h3>User :{user?.name}</h3>
})

const ReferenceEquality =()=>{
    const [count,setCount]= useState(0)
    const [name,setName]= useState("suresh")

    //const user = {name:name}
    const user= useMemo(()=>({name}),[name])

    return(
        <div>
            <h2>Reference Equqlity Demo</h2>
            <button onClick={()=>setCount(c=>c+1)}>
                Count : {count}
            </button>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Change Name"></input>
            <Child user={user}/>
        </div>
    )
}
export default ReferenceEquality
