import { memo, useMemo, useState } from "react";

const Child = memo(({user})=>{
    console.log("child Rendered");
    return <h3>user: {user?.name}</h3>
})
const ReferenceEqualityjsx = ()=>{
    const [count,setCount]= useState(0)
    const [name,setName]=useState("suresh")

    // const user = {name}
    const user = useMemo(()=>({name}),[name])

    return(
        <>
            <div>
                <h2>Reference Equality Demo</h2>
                <button onClick={()=>setCount(c=>c+1)}>count  : {count}</button>
                <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Change name"></input>
                <Child user={user}></Child>
            </div>
        </>
    )
}
export default ReferenceEqualityjsx