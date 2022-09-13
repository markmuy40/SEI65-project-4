import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Helpers
import { getToken } from './auth'

// Import Custom Components
import ReviewForm from './ReviewForm'

// Import Bootstrap Components
import Container from 'react-bootstrap/Container'

const reviewNew = () => {

  // ! Router Variables
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
  })

  // ! Executions
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/reviews/', formData, {
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
          title="Create a review"
        />
      </Container>
    </main>
  )
}

export default reviewNew