import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//components

import ReviewDetail from './components/ReviewDetail'
import CreateReview from './components/CreateReviewPage'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

import PageNavbar from './components/PageNavbar'
import PageFooter from './components/PageFooter'

import NotFound from './components/NotFound' 

const App = () => {

  return (
    <div className= 'App'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/reviewdetail/:id/' element = {<ReviewDetail/>} />
          <Route path = '/createreview' element = {<CreateReview/>} />
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

