import React from 'react'
// import {GoMarkGithub} from 'react-icons'
import {Link} from 'react-router-dom'

export const Footer = () => (
  <div className="footer">
    <div>
      <a
        href="https://github.com/coviz/coviz"
        rel="noopener noreferrer"
        target="_blank"
      >
        View GitHub Repo
        {/* <GoMarkGithub color="##e36397" size={32} /> Link to GitHub */}
      </a>
    </div>
    <div>
      <h5>CREATORS:</h5>
      <h5>
        <a
          href="https://www.linkedin.com/in/cbconstans/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Claire Brown
        </a>
      </h5>
      <h5>Jin Young Choi</h5>
      <h5>Jasmine Hatcher</h5>
      <h5>Anna Syzmula</h5>
    </div>
    <div>
      <Link to="/about"> View Sources</Link>
    </div>
  </div>
)
