import { useEffect, useState } from "react"

const useDebounce = <T,>(value : T,delay:number):T =>{
    const[debouncedValue,setDebouncedValue]= useState<T>(value)

    useEffect(()=>{
        // Set a timer to update debouncedValue after delay
        const timer = setTimeout(()=>{
            setDebouncedValue(value)
        },delay)
        // Cleanup — cancel timer if value changes before delay
        return ()=>clearTimeout(timer)
    },[value,delay])
    return debouncedValue
}

export default useDebounce