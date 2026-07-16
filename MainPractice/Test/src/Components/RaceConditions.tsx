import { useEffect, useState } from "react"

interface user {
    id : number
    name : string
    email:string 
    phone : string
}

const RaceCondition = ()=>{
    const [userId,setUserId]= useState<number>(1)
    const [user,setUser]=useState<user | null>(null)
    const [laoding,setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const controller = new AbortController()
        console.log("🟢 Effect ran — fetching userId:", userId)
        setLoading(true)

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`,{  
            signal:controller.signal
        })
        .then(res=>res.json())
        .then(data =>{
            setUser(data)
            setLoading(false)
        })
        .catch(err =>{
            if(err.name==="AbortError"){
                console.log("Fetch cancelled for the userId :",{userId});
                return
            }
            console.log(err);
            
        })
        return ()=>{
            console.log("cleanup- cancelling fetch for userId:",{userId});
                controller.abort()
        }
    },[userId])
    return(
        <>
        <h2>Race Condition Demo</h2>
         <div>
            {[1,2,3,4,5].map(id=> (
                <button key={id} onClick={()=>setUserId(id)} 
                style={{
                    margin: "4px",
                    background : userId === id ?"green":"red",
                    color:"white",
                    padding:"6px 12px",
                    border:"none",
                    borderRadius:"4px",
                    cursor:"pointer"
                }}>user {id}
                </button>
            ))}
        </div>
        {laoding ? <p>Loading...</p>
                 :<div>
                    <h3>{user?.name}</h3>
                    <h3>{user?.email} </h3>
                    <h3>{user?.phone} </h3>
                  </div>}
        </>
    )
}
export default RaceCondition