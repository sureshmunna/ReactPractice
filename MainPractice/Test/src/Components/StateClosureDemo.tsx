import { useEffect, useState } from "react"

const StateClosureDemo = () =>{
    const [count,setCount] = useState<number>(0);

    // useEffect(()=>{
    //     const timer= setInterval(()=>{
    //         console.log(count);
            
    //         setCount(count+1)// stale closure -count always 0 
    //     },1000)
    //     console.log(count);
        
    //     return clearInterval(timer)
    // },[])

    useEffect(()=>{
        const timer = setInterval(()=>{
            console.log(timer);
            
            console.log(count);
            
            setCount((c:number)=>{
                console.log("number:" , c);
                return c+1
                
            } )
            
            
        },1000)
        return ()=>{clearInterval(timer) 
            console.log(timer +"clouser timer");
        }
    },[])
    return(
        <>
        <h1>count :{count}</h1>
        <p>Should Increment every second </p>
        </>
    )
}
export default StateClosureDemo

