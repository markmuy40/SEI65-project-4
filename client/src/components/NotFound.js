import notFound from '../styles/images/not-found.png'
import { Link } from 'react-router-dom' 


const NotFound = () => {
  return (
    <div className="main">
      <Link to={'/'} className="notFound-text">
        <p>Oops! Click to return to index</p>
      </Link>
      <div >
        <img className="notfound-image" src={notFound} ></img>
      </div>
    </div>
  )

}
export default NotFound