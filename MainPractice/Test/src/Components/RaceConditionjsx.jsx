import { useEffect ,useState} from "react";

const RaceConditionjsx = ()=>{
    const [user,setUser]=useState(null);
    const [userId,setUserId]=useState(1)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const controller = new AbortController()

        setLoading(true);

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`,{
            signal:controller.signal
        })
        .then(res =>res.json())
        .then(data=>{
            setUser(data) 
            setLoading(false)
        })
        .catch(err =>{
            if(err.name === "AbortError"){
                console.log("Fetch cancelled for the userId",{userId});
                return
            }
            console.log(err);
        })
        return ()=>{
            console.log("cleanup - cancellinf the fetch for userId ",{userId});
            controller.abort()            
        }

    },[userId])

    return(
        <>
            <h2>Race Condition Demo with jsx</h2>
            <div>
                {[1,2,3,4,5].map(id=>(
                    <button key={id} onClick={()=>setUserId(id)} 
                    style={{
                        margin:"4px",
                        background: userId===id?"green":"red",
                        color:"white",
                        border:"none",
                        borderRadius:"4px",
                        cursor:"pointer",
                        padding:"6px 12px"
                    }}>user {id}</button>
                  ))}
            </div>
            {loading ?<p>Loading,,,,</p>
            :<div>
                <h3>{user?.name}</h3>
                <h3>{user?.phone}</h3>
                <h3>{user?.email}</h3>
            </div>}
        </>
    )
}
export default RaceConditionjsx