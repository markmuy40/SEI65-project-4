import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//components
import PageNavbar from './components/PageNavbar'
import ReviewSingle from './components/ReviewSingle'
import ReviewNew from './components/ReviewNew'
import ReviewEdit from './components/ReviewEdit'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

import PageFooter from './components/PageFooter'
import NotFound from './components/NotFound' 

const App = () => {

  return (
    <div className='App'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/review/:id/' element = {<ReviewSingle/>} />
          <Route path = '/review/new' element = {<ReviewNew/>} />
          <Route path = '/review/:id/edit' element = {<ReviewEdit/>} />
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

