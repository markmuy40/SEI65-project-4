import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {

  const navigate = useNavigate()

  const [ formData, setFormData ] = useState('')
  
  
  
  const [ error, setError ] = useState('')
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log('new object', formData)
    setError({ ...error, [e.target.name]: '' })
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      navigate('/login')
    } catch (error) {
      console.log('error->', error.response.data.detail)
      setError(error.response.data.detail)
    }
  }

  return (
    <div className="main">
      <div className='register-container'>
        <form onSubmit={onSubmit} className='register-form'>
          <h1 className='register-title'>Registration form</h1>
          <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange}/>
          { error.username && <div>{error.username[0]}</div>}
          <input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange}/>
          { error.email && <div>{error.email[0]}</div>}
          <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange}/>
          { error.password && <div>{error.password[0]}</div>}
          <input type='password' name='password_confirmation' placeholder='Confirm Password' value={formData.password_confirmation} onChange={handleChange}/>
          { error.password_confirmation && <div>{error.password_confirmation[0]}</div>}
          <div className='register-button-container'>
            <button type='submit' className='register-button'>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
  
}

export default Register
