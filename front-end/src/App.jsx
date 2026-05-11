import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Todo from './components/Todo'

export default function App() {
  return (
    <div className='bg-gray-100'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Todo/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/Signup' element={<Signup />}/>
        
      </Routes>
    </div>
  )
}
