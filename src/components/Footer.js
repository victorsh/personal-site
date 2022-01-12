import React from 'react'
import github from '../assets/github.png'
import linkedin from '../assets/linkedin.png'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <a className='footer-link' href='https://github.com/victorsh'>
          <img src={github} className='w-14' />
        </a>
        <a className='footer-link' href='https://www.linkedin.com/in/victor-shahbazian/'>
          <img src={linkedin} className='w-16' />
        </a>
      </div>
    </div>
  )
}

export default Footer
