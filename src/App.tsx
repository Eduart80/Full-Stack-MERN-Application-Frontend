import { Routes, Route } from 'react-router-dom'
import HomePage from './Page/HomePage/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Project from './Page/Project/Project';
import Tasks from './Page/Tasks/Tasks';
import NotFound from './Page/NotFound/NotFound';
import Login from './Page/Auth/Login'
import SignUp from './Page/Auth/SignUp'
import NavBar from './Components/NavBar/NavBar';

function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/Project' element={<Project />}/>
        <Route path='/Tasks' element={<Tasks />}/>
        <Route path='*' element={<NotFound />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
     </Routes>
    </>
  )
}

export default App
