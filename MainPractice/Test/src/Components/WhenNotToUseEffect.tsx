import { useState } from "react"

interface User{
    id : number
    name : string
    active :   boolean
}

const WhenNotToUseEffect = ()=>{
   const [firstName, setFirstName]=useState<string>("Suresh")
   const [lastName,setLastName] = useState<string>("Babu")
   const [user,setUser]=useState<Array<User>>(
    [{id:1,name :"suresh", active:true},
   {id: 2 ,name:"babu",active:false },
   {id:3,name:"dudekula",active:false}]
)
console.log(firstName);
console.log(lastName);
console.log(user[0].name);

const fullName = firstName + " " +lastName;
const activeUsers = user.filter(u=>u.active===true)

return(
    <>
        <h2>FullName: {fullName}</h2>
        <input value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder="first Name"/>
        <input value={lastName} onChange={(e)=>{setLastName(e.target.value)}} placeholder="last name"></input>
        <h2>Active Users</h2>
        
        <ul>
            {activeUsers.map((u)=>{let{id,name,active} = u
            console.log(active);
        return(
            
            <div key={u.id}>
                <li  >UserName : {name}</li>
                
            </div>
        )
        })}
        </ul>
    </>
)



}
export default WhenNotToUseEffect