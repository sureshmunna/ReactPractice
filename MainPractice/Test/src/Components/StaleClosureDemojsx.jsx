import { useEffect ,useState} from "react"

let StaleClosureDemojsx = ()=>{
    const [count,setCount]= useState(0)

    useEffect(()=>{
        const timer = setInterval(()=>{
            console.log(count);
            
            setCount((c)=>c+1)
        },1000)
        return ()=> clearInterval(timer)
    },[])
    return(
        <div>
            <h2>counter : {count}</h2>
            should increment every second 
        </div>
    )
}
export default StaleClosureDemojsx