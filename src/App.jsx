import Body from "./Components/Body"
import Login from "./Components/Login"
import Navbar from "./Components/Navbar"
import {BrowserRouter,Routes,Route} from 'react-router'
import Profile from "./Components/Profile"

function App() {


  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route  path="/" element={<Body/>}> 
        <Route path="/login" element={<Login/>} />
        <Route  path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App
