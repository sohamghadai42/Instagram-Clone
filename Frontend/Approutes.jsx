import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './src/features/auth/pages/Login'
import Register from './src/features/auth/pages/Register'
import Feed from './src/features/auth/pages/Feed'
import CreatePost from './src/features/auth/pages/CreatePost'

const Approutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Feed/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/createpost' element={<CreatePost/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Approutes;