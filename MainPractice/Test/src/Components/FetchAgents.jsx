import { Fragment, useEffect, useState } from "react"



let FetchFunction = ()=>{
  let [allUsers,setAllUsers]= useState([])
  let [loading,setLoading] = useState (true)
  let [error,setError] = useState(null)

  useEffect(()=>{
    const controller = new AbortController()
    const fetchUsers= async ()=>{
      try{
        setLoading(true)
        let result = await fetch("https://fakestoreapi.com/users",{
          signal : controller.signal
        })
        let data = await result.json()
        setAllUsers(data)
      }
      catch (err){
        if(err.name='AbortError'){
          console.log("Fetch cancelled - Component Unmounted")
        }
        else{
          setError(err.message)
        }
      }
      finally{
        setLoading(false)
      }
    }
    fetchUsers()
    return ()=> controller.abort()
  },[])

  if(loading)return <h2>Loading....</h2>
  if(error) return <h2>Error...{error}</h2>

  return(
    <>
      <h2>Users List</h2>
      <ul>
        {allUsers.map((user)=>{
          let {id,email,username} = user
          return(
            <Fragment key={id}>
              <li style={{color:"blue"}}>{email}</li>
              <li style={{color:"red"}}>{username}</li>
            </Fragment>
          )
        })}
      </ul>
    </>
  )
}
export default FetchFunction





// import { Fragment, useEffect, useState } from "react"

// let FetchAgents = () =>{
//     let [allAgents , setAllAgents] = useState([]);
//     let [loading,setLoading] = useState(true);
//     let [error,setError]= useState(null);

//     useEffect(()=>{
//         const controller = new AbortController()
//         const fetchUsers = async ()=>{
//             try {
//                 setLoading(true);
//                 let result= await fetch("https://fakestoreapi.com/users",{
//                     signal : controller.signal
//                 })
//                 let data = await result.json()
//                 setAllAgents(data);
//             } catch (error) {
//                 if(error.name =="AbortError"){
//                     console.log("Fetch cancelled - component unmounted");
//                 }
//                 else{
//                     setError(error.message)
//                 }
//             }
//             finally{
//                 setLoading(false)
//             }
//         }  
//         fetchUsers()
//         return ()=>
//             controller.abort()
        
//     },[])
//     if(loading)return<h2>Loading....</h2>
//     if(error) return <h2> Error .. {error}</h2>

//     return(
//         <>
//         <h2>Users List</h2>
//         <ul>
//         {allAgents.map((user)=>{
//             let {id,email,username} = user
//             return(
//                 <Fragment key={id}>
//                     <li style={{color:"red"}}>User Name : {username}</li>
//                     <li style={{color:"blue"}}>User Email :{email}</li>
//                 </Fragment>
//             )
//         })}
//         </ul>
        
//         </>
//     )
// }
// export default FetchAgents