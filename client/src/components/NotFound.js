import notFound from '../styles/images/not-found.png'
import { Link } from 'react-router-dom' 


const NotFound = () => {
  return (
    <div className="main">
      <Link to={'/'} className="notFound-text">
        <p>Oops! Click to return to index</p>
      </Link>
      <div className="notfound-image">
        <img src={notFound} width="1000px"></img>
      </div>
    </div>
  )

}
export default NotFound