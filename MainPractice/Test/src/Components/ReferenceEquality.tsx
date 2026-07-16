import { memo } from "react";

const Child = memo(({user}:{user:{name:string}})=>{
    console.log("Child rendered");
    return <h3>User :{user?.name}</h3>
})
