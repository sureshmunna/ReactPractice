import { useState } from "react";

const getInitialValue = ()=>{
    console.log("expensive calculation is run");
    return 100
    
}
const LazyInitDemojsx = ()=>{
    //const [value,setValue]= useState(getInitialValue())
    const [value,setValue]= useState(()=>getInitialValue())
    return (
        <div>
            <h2>Count : {value}</h2>
            <button onClick={setValue((v)=>v+1)}>Increment</button>
            <p>see the  console</p>
        </div>
    )
}
export default LazyInitDemojsx