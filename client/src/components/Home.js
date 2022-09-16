// Import Hooks
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import placeholder from '../styles/images/no-image.png'

// Import Bootstrap Components
import Loading from './Loading'

const Home = () => {

  const [ reviews, setReviews ] = useState([])
  const [ errors, setErrors ] = useState(false)

  // ! Executed
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/reviews/')
        console.log(data)
        setReviews(data)
      } catch (errors) {
        console.log(errors)
        setErrors(true)
      }
    }
    getData()
  }, [])

  console.log('reviews',reviews)
  
  return (
    <div className="main">
      <h1 className='home-title'>Reviews</h1>
      <div className="review-display">
        { reviews.length > 0
          ?
          reviews.map(review => {
            const { id, Title, Price, ImageUrl } = review
            console.log(review)
            return (
              <div key={id} className='review'>
                <Link style={{ textDecoration: 'none' }} to={`/review/${id}/`}>
                  <div className='review-map'>
                    <div className='review-title'>
                      <h4>{Title}</h4>
                    </div>
                    <p className="price">Price:{Price}</p>
                    <img className="review-img" src={ImageUrl ? ImageUrl : placeholder}></img>
                  </div>
                </Link>
              </div>
            )
          }) 
          :
          <>
            { errors ? <h2>Something went wrong. Please try again later</h2> : <Loading />}
          </>
        }
      </div>
    </div>
  )
}

export default Home