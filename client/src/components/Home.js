// Import Hooks
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Import Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

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
    <div className="home">
      <h1 className='text-center mb-4'>Reviews</h1>
      <Container as="main">
        <Row>
          { reviews.map(review => {
            const { id, Title, Price, ImageUrl } = review
            console.log(review)
            return (
              <Col key={id} lg="col-3" className='size'>
                <Link to={`/review/${id}/`}>
                  <Card>
                    <Card.Body className='bg-light'>
                      <Card.Title className='text-center mb-0'>{Title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{Price}</Card.Subtitle>
                      <Card.Img className="CardImg" variant='top' src={ImageUrl}></Card.Img>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )
          }) }
        </Row>
      </Container>
    </div>

  )


}

export default Home