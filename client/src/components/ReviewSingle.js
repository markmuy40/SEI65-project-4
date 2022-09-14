import { useEffect, useState } from 'react'
import { useParams , Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

import { getPayload, getToken, getUserId, userIsOwner, authUser } from './auth'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

const ReviewSingle = () => {

  // Set of states
  const navigate = useNavigate()
  const { id } = useParams()
  const [ errors, setErrors ] = useState(false)
  const [ singleReview, setSingleReview ] = useState(null)
  const [ commentId, setCommentId ] = useState('')
  
  const [formData, setFormData ] = useState({
    text: '',
    review: null,
  })

  const handleComment = (event) => {
    console.log('25', formData)
    setFormData({ ...formData, [event.target.name]: event.target.value, review: parseInt(id) })
    console.log('27', formData)
  }


  // ! add a comment------------------------------------------------------
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
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  // ! delete comment-----------------------------------------------------

  // console.log('event target name', event.target.name)
  // setCommentId(event.target.name)
  // console.log('comment id', commentId)

  const deleteComment = async (event) => {

    try { 
      await axios.delete(`/api/comments/${event.target.name}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate(`/review/${id}`)
    } catch (err) {
      console.log(err)
    }

  } 

  // ! get single review--------------------------------------------------
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/reviews/${id}/`)
        setSingleReview(data)
      } catch (error) {
        setErrors(true)
      }
    }
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
          
                <img src={singleReview.ImageUrl}></img>
          
              </div>
              { userIsOwner(singleReview) &&
              <div className="button-container">
                <Button className="delete-button" onClick={deleteReview}>Delete review</Button>
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
              const { text, id, owner } = comment
              return (
                <div key={id} className="comment">
                  <p>{owner.username}</p>
                  <p>{[1].created_at}</p>
                  <p>{text}</p>
                  
                  {userIsOwner(comment) &&
                      <span>
                        <label htmlFor="Comment-delete"></label>
                        <input type="submit" name={comment.id} value="delete" className="btn" onClick={deleteComment}></input>
                      </span>
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
                <input type="submit" className="btn"></input>
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
