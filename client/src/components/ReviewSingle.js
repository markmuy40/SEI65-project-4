import { useEffect, useState } from 'react'
import { useParams , Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getPayload, getToken, getUserId, userIsOwner } from './auth'
import Button from 'react-bootstrap/Button'

const ReviewSingle = () => {

  // Set of states
  const navigate = useNavigate()
  const { id } = useParams()
  const [ errors, setErrors ] = useState(false)
  const [ review, setReview ] = useState(null)
  
  const [formData, setFormData ] = useState({
    text: '',
  })

  console.log('id', id)
  console.log('params', useParams())

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    console.log('form data', formData)
  }


  // execution
  // ! add a comment
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/comments/', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      // Navigate to the bread single page but on the bread we've just created
      navigate(`/review/${data.id}/`)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }




  // ! get single review 
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/reviews/${id}/`)
        setReview(data)
      } catch (error) {
        setErrors(true)
      }
    }
    getData()
  }, [])
  // ! delete review
  const deleteReview = async () => {
    try { 
      await axios.delete(`/api/reviews/${id}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  console.log('review', review)

  return (
    <div>
      {review && // waits for review to be a truthy value
        <>
          <div className="review-container">
            <div key={review.id} className="review-detail">
              <div className="review-title">
                <h3>{review.Title}</h3>
              </div>
              <div className="review-price">
                <h4>{review.Price}</h4>
              </div>
              <div className="review-description">
                <h4 className="review-owner">by: {review.owner.username}</h4>
                <p>{review.Description}</p>
              </div>
              <div className="review-image">
          
                <img src={review.ImageUrl}></img>
          
              </div>
              { userIsOwner(review) &&
              <div>
                <Button variat="danger"onClick={deleteReview}>Delete review</Button>
                <Link to={`/review/${id}/edit`} className="btn btn-warning">edit review</Link>
              </div>
              }    
              <Link to='/' className='btn dark'>Back to all reviews</Link>         
            </div>
          </div>
          <div className="comment-container">
            {  review.comments.map(comment => {
              const { text, id, owner, created  } = comment
              return (
                <div key={id} className="comment">
                  <p>{owner.username}</p>
                  <p>{[1].created_at}</p>
                  <p>{text}</p>
                </div>
              )
            })}
          </div>
          <div className="leave-comment-container">
            <div className="leave-comment">
              <form className="comment-form" onSubmit={handleSubmit}>
                <label htmlFor="Comment">Comment</label>
                <textarea name="Comment" placeholder="Comment" value={formData.text} onChange={handleChange}></textarea>
                <input type="submit" value="add-comment" className="btn"></input>
              </form>
            </div>
          </div>
        </>
      }
    </div>
  )
}

  
export default ReviewSingle 
