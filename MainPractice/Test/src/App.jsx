import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import FetchAgents from './Components/FetchAgents'
//import StateClosureDemo from './Components/StateClosureDemo'
import StaleClosureDemojsx from './Components/StaleClosureDemojsx'
import BatchDemoJsx from './Components/BatchDemojsx'
import BatchDemo from './Components/BatchDemo'
import LazyInitDemo from './Components/LazyInitDemo'
import LazyInitDemojsx from './Components/LazyInitDemojsx'
import WhenNotToUseEffect from'./Components/WhenNotToUseEffect'
import WhenToNotUseEffectjsx from './Components/WhenToNotUseEffectjsx'
import RaceCondition from './Components/RaceConditions'
import RaceConditionjsx from './Components/RaceConditionjsx'
import ReferenceEquality from './Components/ReferenceEquality'
import ReferenceEqualityjsx from './Components/ReferenceEqualityjsx'
import TaskList from './Components/TaskList'
import TaskListjsx from './Components/TaskListjsx'
import UseReducerDemo from './Components/UseReducerDemo'
import UseReducerDemojsx from './Components/UseReducerDemojsx'
import GlobalStateDemoWrapper from './Components/GlobalStateDemo'
import GlobalStateDemoWrapperjsx from './Components/GlobalStateDemojsx'
import SplitContextDemoWrapper from './Components/SplitContextDemo'
import CustomHooksDemo from './Components/CustomHooksDemo'
import ZustandDemo from './Components/ZustandDemo'
import ReactQueryDemo from './Components/ReactQueryDemo'
import ConcurrentDemo from './Components/ConcurrentDemo'
function App() {
  const [count, setCount] = useState(0)
  const [show,setShow] = useState(true)

  
  return (
    <>
    {/* <button onClick={()=>setShow((s)=> !s)}>
      {show ? "Unmount Component":"Mount Component"}
    </button>
    {show && <StaleClosureDemojsx/>} */}
       {/* <FetchAgents />  */}
       {/* <BatchDemoJsx/> */}
       {/* <BatchDemo/> */}
       {/* <LazyInitDemo/> */}
       {/* <LazyInitDemojsx/> */}
       {/* <WhenNotToUseEffect/> */}
       {/* <WhenToNotUseEffectjsx/> */}
       {/* <RaceCondition/> */}
       {/* <RaceConditionjsx/> */}
       {/* <ReferenceEquality/>1 */}
       {/* <ReferenceEqualityjsx/> */}
       {/* <TaskList/> */}
       {/* <TaskListjsx/> */}
       {/* <UseReducerDemojsx/> */}
       {/* <UseReducerDemo/>
       <hr/>
       <GlobalStateDemoWrapper/> */}
       {/* <UseReducerDemojsx/> */}
       {/* <hr></hr>
       <GlobalStateDemoWrapperjsx/> */}
       {/* <SplitContextDemoWrapper/> */}
       {/* <CustomHooksDemo/> */}
       {/* <ZustandDemo/> */}
       {/* <ReactQueryDemo/> */}
       <ConcurrentDemo/>
       
    </>
  )
}

export default App
