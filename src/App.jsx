import {Routes, Route} from "react-router-dom";

export default function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/exercises' element={<Exercises/>}/>
        <Route path='/workouts' element={<Workouts/>}/>
        <Route path='/about' element={<About/>}/>

        <Route path='/sign-up' element={<Auth/>}/>
        <Route path='/sign-in' element={<Auth/>}/>

      </Routes>
  )
}
