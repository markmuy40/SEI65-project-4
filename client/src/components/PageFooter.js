import image from '../styles/images/linked.png'
const PageFooter = () => {

  return (
    <div className="footer-main">
      <div className="footer-header">Brought to you by:</div>
      <div className="footer-container"> 
        <div className="Mark"><a className="muyuela" href="https://github.com/markmuy40" target="_blank" rel="noreferrer">Mark Muyuela</a>
          <div className="Logo"><a href="https://www.linkedin.com/in/mark-muyuela/" target="_blank" rel="noreferrer"><img className="Linkedin" src={image} height="50px"></img></a></div>
        </div>
      </div>
    </div>  
  )
}

export default PageFooter