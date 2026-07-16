import { useState } from "react"

const WhenToNotUseEffectjsx = ()=>{
    const [firstName,setFirstname] = useState("suresh")
    const [lastname,setlastname]=useState("babu")
    const [user,setUser]= useState([{id:1,name:"ramesh",active:true},
        {id:2,name:"balu",active:false}]
    )
    const fullName = firstName + " "+lastname
    const activeUser = user.filter(u=>u.active===true)
    return(
        <div>
            <h2>FullName : {fullName}</h2>
            <input onChange={(e)=>setFirstname(e.target.value)}></input>
            <input onChange={(e)=>setlastname(e.target.value)}></input>
            <ul>
            {activeUser.map((u)=>{ let {id,name,active} = u
            return(
                <div  key={id}>
                    <li>{name}</li>
                    
                </div>
            )
            })}
            </ul>
        </div>
    )
}
export default WhenToNotUseEffectjsx