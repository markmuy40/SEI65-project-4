import { useEffect, useState } from 'react'
import { useParams , Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getPayload, getToken, userIsOwner } from './auth'
import Button from 'react-bootstrap/Button'

const ReviewSingle = () => {

  // Set of states
  const navigate = useNavigate()
  const { id } = useParams()
  const [ errors, setErrors ] = useState(false)
  const [ review, setReview ] = useState(null)

  console.log('id', id)
  console.log('params', useParams())
  // execution
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

  const deleteReview = async () => {
    try { 
      await axios.delete(`/api/reviews/${id}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/home')
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
            {/* { singleReview.map(details => {
        const { id, Title, Price, Description, ImageUrl } = details */}
      
      
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
              <div>
                <Button variat="danger"onClick={deleteReview}>Delete review</Button>
                <Link to={`/review/${id}/edit`} className="btn btn-warning">edit review</Link>
                <Link to='/' className='btn dark'>Back to all reviews</Link>

              </div>      
            </div>
      
            {/* }) } */}
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
        </>

      }
    </div>
  )
}
  
export default ReviewSingle 
