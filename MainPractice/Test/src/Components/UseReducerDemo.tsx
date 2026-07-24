import { useReducer } from "react"
type CountActioon = |{type:"increment"}
                    |{type:"decrement"}
                    |{type:"reset"}
                    |{type:"incrementedBy"; payload:number}

const countReducer = (state:number,action:CountActioon):number =>{
    switch(action.type){
        case "increment":
            return state+1
        case "decrement":
            return state-1
        case "incrementedBy":
            return state+ action.payload
        case "reset":
            return 0
        default:
            return state;
        
    }
    
}
interface UserState {
    name : string
    email : string
    age : number
}

type UserAction = |{type : "updateName";payload:string}|{type:"updateEmail";payload:string}|{type:"incrementAge";}|{type:"reset"}

const initialUserState :UserState = {
    name :"",
    email:"",
    age:0
}

const userReducer = (state:UserState,action:UserAction):UserState =>{
    switch (action.type) {
        case "updateName":
            return {...state,name:action.payload}
        case "updateEmail":
            return{...state,email:action.payload}
        case "incrementAge":
            return {...state , age:state.age+1}  
        case "reset":
            return initialUserState
    
        default:
            return state
    }
}

const UseReducerDemo = ()=>{
    const [count,countDispatch] = useReducer(countReducer,0)
    const [user,userDispatch]= useReducer(userReducer,initialUserState)

    return(
        <div style={{padding:"1rem"}}>
            <h2>Counter with Reducer</h2>
            <h3>Count : {count}</h3>
            <button onClick={()=> countDispatch({type:"increment"})}>+</button>
            <button onClick={()=> countDispatch({type:"decrement"})}>-</button>
            <button onClick={()=>countDispatch({type:"incrementedBy",payload:5})}>+5</button>
            <button onClick={()=>countDispatch({type:"reset"})}>Reset</button>
            <hr/>
            <h2>User from with useReducer</h2>
            <input placeholder="Name" value={user.name} onChange={e=>userDispatch({type:"updateName" , payload:e.target.value})}/>
            <input placeholder="Email" value={user.email} onChange={e=>userDispatch({type:"updateEmail",payload:e.target.value})} />
            <button onClick={()=>userDispatch({type:"incrementAge"})}>Age :{user.age}</button>
            <button onClick={()=> userDispatch({type:"reset"})}>Reset All</button>
            <div>
                <h2> Customer User State:</h2>
                <p>Name : {user.name}</p>
                <p>Email:{user.email} </p>
                <p>Age: {user.age}</p>
            </div>
        </div>
    )
}
export default UseReducerDemo