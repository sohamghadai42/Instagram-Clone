import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './src/features/auth/pages/Login'
import Register from './src/features/auth/pages/Register'

const Approutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<h1> Welcome to the Home page </h1>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Approutes;