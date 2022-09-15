import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Login = () => {
  
  const [ loginData, setloginData ] = useState({
    username: '',
    password: '',
  })
  
  const navigate = useNavigate()
  const [ errors, setErrors ] = useState(false)
  
  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value })
    setErrors(false)
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const { data } = await axios.post('/api/auth/login/', loginData)
      const { token } = data
      console.log('token', token)
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('username', loginData.username)
      navigate('/')
    } catch (error) {
      console.log('error->', error)
      setErrors(error.response.data.message)
    }
  }

  return (
    <div className="main">
      <div className='login-body'>
        <div className='login-container'>
          <form onSubmit={onSubmit} className='login-form'>
            <h1 className='login-title'>Login Form</h1>
            {errors && <div className='error'>{errors}</div>}
        
            <input 
              type='text' name='username' placeholder='Username' value={loginData.username} onChange={handleChange}
            />
            <input type='password' name='password' placeholder='Password' value={loginData.password} onChange={handleChange}
            />
            <div className='login-button-container'>
              <button type='submit' className='login-button'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
  
}

export default Login