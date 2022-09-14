import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {

  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '', 
  })
  
  const navigate = useNavigate()
  
  const [ error, setError ] = useState('')
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log('new object', formData)
    setError(false)
  }

  // const setTokenToLocalStorage = (token) => {
  //   window.localStorage.setItem('token, token')
  // }
  
  
  const onSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      // setTokenToLocalStorage(data.token)
      navigate('/login')
    } catch (error) {
      console.log('error->', error)
      setError(error.response.data.code)
    }
  
  }
  
  
  return (
    <div className='register-container'>
      <form onSubmit={onSubmit} className='register-form'>
        <h1 className='register-title'>Registration form</h1>
        {error && <div className='error'>{error}</div>}
        <input 
          type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange}
        />
        <input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange}
        />
        <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange}
        />
        <input type='password' name='password_confirmation' placeholder='Confirm Password' value={formData.password_confirmation} onChange={handleChange}
        />
        <div className='register-button-container'>
          <button type='submit' className='register-button'>Register</button>
        </div>
      </form>
    </div>
    
  )
  
}

export default Register
