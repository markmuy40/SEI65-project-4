import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'

//components

import ReviewDetail from './components/ReviewDetail'
import PageFooter from './components/PageFooter'
import Home from './components/Home'
import Login from './components/Login'
import PageNavbar from './components/PageNavbar'
import Register from './components/Register'

import NotFound from './components/NotFound' 

const App = () => {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      axios.defaults.headers.common['Authorization'] = null
    }
  }, [])

  return (
    <div className= 'App'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/reviewdetail/:id/' element = {<ReviewDetail/>} />
          <Route path = '/register' element = {<Register/>} />
          <Route path = '/login' element = {<Login/>} />
          <Route path = '*' element = {<NotFound/>} />
        </Routes>
        <PageFooter />
      </BrowserRouter>
    </div>
  )
}  
export default App

