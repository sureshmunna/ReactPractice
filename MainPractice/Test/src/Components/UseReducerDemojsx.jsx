import { useReducer } from "react"

const countReducer =(state,action)=>{
    switch(action.type){
        case "increment":
        return state +1
        case "decrement":
            return state -1
        case "incrementBy":
            return state+action.payload
        case "reset":
            return 0
        default:
            return state
    }
}
const intialUser={
    name:"",
    email:"",
    age:0
}
const userReducer=(state,action)=>{
    switch(action.type){
        case "updateName":
            return {...state,name:action.payload}
        case "updateEmail":
            return {...state,email:action.payload}
        case "incrementAge":
            return {...state,age:state.age+1}
        case "reset":
            return intialUser
            default :
                return state
    }

}

const UseReducerDemojsx =()=>{
    const [count,countDispatch]=useReducer(countReducer,0)
    const [user,userDispatch]=useReducer(userReducer,intialUser)
    return(
        <div style={{padding:"1rem"}}>
            <h2>Counter With Reducer</h2>
            <h3>Count : {count}</h3>
            <button onClick={()=>countDispatch({type:"increment"})}>+</button>
            <button onClick={()=>countDispatch({type:"decrement"})} >-</button>
            <button onClick={()=>countDispatch({type:"incrementBy",payload:5})}>+5</button>
            <button onClick={()=>countDispatch({type:"reset"})}>Reset</button>
            <hr/>
            <input onChange={(e)=>userDispatch({type:"updateName",payload:e.target.value})} value={user.name} placeholder="Name" />
            <input onChange={(e)=>userDispatch({type:"updateEmail",payload:e.target.value})} value={user.email } placeholder="Email" />
            <button onClick={()=>userDispatch({type:"incrementAge"})}>Age :{user.age}</button>
            <button onClick={()=>userDispatch({type:"reset"})} >Reset All</button>
            <div>
                <h2>Customer User state</h2>
                <p>Name :{user.name}</p>
                <p>Email:{user.email} </p>
                <p>Age:{user.age} </p>
            </div>
        </div>
    )
}
export default UseReducerDemojsx