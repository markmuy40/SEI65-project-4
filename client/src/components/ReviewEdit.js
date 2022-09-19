import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Helpers
import { userIsOwner, getToken, getUserId } from './auth'

// Import Custom Components
import ReviewForm from './ReviewForm'

// Import Bootstrap Components
import Container from 'react-bootstrap/Container'

const ReviewEdit = () => {
  
  // ! Router Variables
  const { id } = useParams()
  const navigate = useNavigate() 
  
  // ! State
  const [ formData, setFormData ] = useState({
    Title: '',
    Price: '',
    Description: '',
    ImageUrl: '',
  })
  
  const [ errors, setErrors ] = useState({
    Title: '',
    Price: '',
    Description: '',
    ImageUrl: '',
    message: '',
  })

  const [ singleError, setSingleError ] = useState('')

  // ! Execution
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/reviews/${id}/`)
        if (!userIsOwner(data)) navigate(`/review/${id}/`)
        setFormData(data)
      } catch (err) {
        console.log(err)
        setSingleError('Failed to retrieve review data. Failed to auto-populate.')
      }
    }
    getData()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.put(`/api/reviews/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })  
      navigate(`/review/${id}/`)
    } catch (err) {
      console.log('error->', err.response.data.detail)
      setErrors(err.response.data.detail)
    }
  }

  // ! JSX
  return (
    <main className="form-page">
      <Container>
        <ReviewForm
          errors={errors}
          setErrors={setErrors}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          title="Edit review"
          singleError={singleError}
        />
      </Container>
    </main>
  )
}

export default ReviewEdit