import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./components/Login"
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
