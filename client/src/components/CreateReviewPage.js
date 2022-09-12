import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getToken } from './auth'


const CreateReviewPage = () => {
  const [ resStatus, setResStatus ] = useState('')
  const [ loginError, setLoginError ] = useState('')
  const [ errors, setErrors ] = useState('')
  const [ reviewData, setReviewData ] = useState({
    Title: '',
    Price: '',
    Description: '',
    ImageUrl: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value })
    console.log('review data', reviewData)
    setErrors(false)
  }

  const createReview = async (e) => {
    e.preventDefault()

    // the code below is to check if the url is the right format to be printed
    const body = { ...reviewData, createdAt: Date.now() }
    if (body.ImageUrl.match(/\.(jpeg|jpg|gif|png)$/) === null && body.imageUrl !== '')  { 
      setResStatus('wrong-url')
      return 
    }

    try {
      await axios.post('/api/reviews/', body, {
        
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // setResStatus(res)§
      navigate('/')
    } catch (error){
      console.log(error)
      setErrors(error.response.data.detail)
    }
  }
  return (
    <div className='create-container'>
      <h1 className='create-title'>Create Review</h1>
      <form onSubmit={(e)=>createReview(e)} className='create-form'>
        <input className="review-price" type='text' name='Price' placeholder='Price' value={reviewData.Price} onChange={handleChange}/>
        <input className="review-title" type='text' name='Title' placeholder='Title' value={reviewData.Title} onChange={handleChange}/>
        <input className="review-url" type='text' name='ImageUrl' placeholder='Image URL' value={reviewData.ImageUrl} onChange={handleChange}/>
        <textarea name='Description' placeholder='Description' id="message-box" value={reviewData.Description} onChange={handleChange}></textarea>
        
        { resStatus === 'wrong-url' && <p className='text-danger'> ERROR:The url provided is not a supported format!</p>}
        <p> { errors } </p>
        {loginError === 'noLogin' && <p> Need to <Link to = '/login'>Login</Link></p>}
        <div className='create-button-container'>
          <button type='submit' className='create-button'>Create</button>
        </div>
      </form>
    </div>
    
  )
  
  
}
export default CreateReviewPage