import { useState } from "react";

 const getInitialValue = (): number =>{
        console.log("expensive calculation is run");
        return 100
    }
const LazyInitDemo = ()=>{
    //const [value,setValue] = useState<number>(getInitialValue())
   const [value,setValue] = useState<number>(()=>getInitialValue())

   return(
    <>
       <h2> value :{value}</h2>
       <button onClick={()=>setValue((v:number)=>v+1)}>Increment</button>

    </>
   )

}
export default LazyInitDemo