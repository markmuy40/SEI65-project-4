/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import { useParams , Link, useNavigate } from 'react-router-dom'
import placeholder from '../styles/images/no-image.png' 
import axios from 'axios'

import { getPayload, getToken, getUserId, userIsOwner, authUser } from './auth'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

const ReviewSingle = () => {

  // Set of states
  const { id } = useParams()
  const [ errors, setErrors ] = useState(false)
  const [ singleReview, setSingleReview ] = useState(null)
  const navigate = useNavigate()
  
  
  const [formData, setFormData ] = useState({
    text: '',
    review: null,
  })

  const handleComment = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value, review: parseInt(id) })
  }




  // add a comment------------------------------------------------------

  const handleSubmit = async (event) => {

    try {
      const { data } = await axios.post('/api/comments/', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // Navigate to the review single page but on the review we've just created
      navigate(`/review/${id}/`)
    } catch (err) {
      setErrors(err.response.data)
      console.log(errors)
    }
  }

  // ! delete comment-----------------------------------------------------

  const deleteComment = async (event) => {
    event.preventDefault()
    
    try { 
      await axios.delete(`/api/comments/${event.target.value}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log
      getData()
    } catch (err) {
      console.log(err)
    }
  } 

  // get single review--------------------------------------------------
  
  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/${id}/`)
      setSingleReview(data)
    } catch (error) {
      setErrors(true)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  // ! delete review -------------------------------------------------------
  
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

  return (
    <div>
      {singleReview && // waits for review to be a truthy value
        <>
          <div className="review-container">
            <div key={singleReview.id} className="review-detail">
              <div className="review-title">
                <h3>{singleReview.Title}</h3>
              </div>
              <div className="review-price">
                <h4>{singleReview.Price}</h4>
              </div>
              <div className="review-description">
                <h4 className="review-owner">by: {singleReview.owner.username}</h4>
                <p className="review-description-text" >{singleReview.Description}</p>
              </div>
              <div className="review-image">
                <img src={singleReview.ImageUrl ? singleReview.ImageUrl : placeholder}></img>
              </div>
              { userIsOwner(singleReview) &&
              <div className="button-container">
                <button className="delete-button" onClick={deleteReview}>Delete review</button>
                <Link to={`/review/${id}/edit`} className="edit-button">edit review</Link>
              </div>
              }    
              <div className="back-button-container">
                <Link to='/' className='back-button'>Back to all reviews</Link>         
              </div>
            </div>
          </div>
          <div className="comment-container">
            {  singleReview.comments.map(comment => {
              const { text, id, owner, created_at } = comment
              const date = created_at.split('T')[0]
              const time = created_at.split('T')[1]
              const actual = time.split('.')[0]
              return (
                <div key={id} className="comment">
                  <p>by: {owner.username}</p>
                  <p>Created on: {date} At: {actual}</p>
                  <p>{text}</p>
                  
                  {userIsOwner(comment) &&
                      <div className="delete-comment">
                        <button className="comment-delete-button" name="Delete" value={comment.id} onClick={deleteComment}>Delete this comment</button>
                      </div>
                  }
                </div>
              )
            })}
          </div>
          { authUser()
          &&
          <div className="leave-comment-container">
            <div className="leave-comment">
              <form className="comment-form" onSubmit={handleSubmit}>
                <label htmlFor="Comment">Comment</label>
                <textarea name="text" placeholder="type comment here" value={formData.text} onChange={handleComment}></textarea>
                <input type="submit" className="submit"></input>
              </form>
            </div>
          </div>
          }
        </>
      }
    </div>
  )
}

  
export default ReviewSingle 
