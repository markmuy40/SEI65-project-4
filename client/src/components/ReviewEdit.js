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
  



  console.log('params', useParams())

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
        console.log('get data', data)
      } catch (err) {
        console.log(err)
        setSingleError('Failed to retrieve review data. Failed to auto-populate.')
      }
    }
    getData()
  }, [])

  console.log('form data', formData)

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('form data', formData)
    try {
      // Put method is used when we're updating an existing document on the database
      const { data } = await axios.put(`/api/reviews/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })  
      // Navigate back to updated review single page
      navigate(`/review/${id}/`)
    } catch (err) {
      console.log(err)
      setErrors(err)
      console.log('errors', errors)
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