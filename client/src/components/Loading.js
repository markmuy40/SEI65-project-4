import Spinner from 'react-bootstrap/Spinner' 


const Loading = () => {

  return (
    <div className="main">
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '70vw', height: '62vh' }}>
        <h1 style={{ color: 'white' }}>Loading ...</h1>
        <Spinner animation="grow" size="xl" variant="light" />
      </div>
    </div>
  )


}

export default Loading