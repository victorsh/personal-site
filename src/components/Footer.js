import React from 'react'
import github from '../assets/Github-Mark-Light-120px-plus.png'
import linkedin from '../assets/LI-In-Bug.png'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <a className='footer-link' href='https://github.com/victorsh'><img src={github} height='50px'/></a>
        <a className='footer-link' href='https://www.linkedin.com/in/victor-shahbazian/'><img src={linkedin} height='50px' /></a>
      </div>
    </div>
  )
}

export default Footer
