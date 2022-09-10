import image from '../styles/images/LI-In-Bug.png'


const PageFooter = () => {

  return (
    <div className="footer-main">
      <div className="footer-header">Brought to you by:</div>
      <div className="footer-container"> 
        <div className="Mark"><a href="https://github.com/markmuy40" target="_blank" rel="noreferrer">Mark Muyuela</a>
          <div className="Logo"><a href="https://www.linkedin.com/in/mark-muyuela/" target="_blank" rel="noreferrer"><img src={image} height="50px"></img></a></div>
        </div>
      </div>
    </div>  
  )


}

export default PageFooter