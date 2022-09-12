import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { authUser } from './auth'



const PageNavbar = () => {

  const location = useLocation()
  const navigate = useNavigate()


  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    window.location.reload(navigate('/login'))

  }
  return (
    <Navbar className='navbar'expand="lg">
      <Container className="navbar-main">
        {/* <Navbar.Brand className="bender" as={Link} to="/"><img src={image} height="100px"></img></Navbar.Brand> */}
        <div className="banner">Bike Packed?</div>
        <div>
          <Navbar.Toggle className="justify-content-end" aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav.Link as={Link} to="/">HOME</Nav.Link>
            { authUser() 
              ?
              <>
                <Nav.Link><span onClick={handleLogout}>Logout</span></Nav.Link>
                <Nav.Link as={Link} to="/createreview">Add a review</Nav.Link>
              </>
              :
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>  
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            }
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  )


}

export default PageNavbar