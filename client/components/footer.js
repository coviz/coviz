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
      <h4>MEET THE TEAM:</h4>
      <br></br>
      <h5>
        <a
          href="https://www.linkedin.com/in/cbconstans/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Claire Brown
        </a>
      </h5>
      <h5>
        <a
          href="https://www.linkedin.com/in/jc1995/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Jin Young Choi
        </a>
      </h5>
      <h5>
        <a
          href="https://www.linkedin.com/in/jasminehatcher/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Jasmine Hatcher
        </a>
      </h5>
      <h5>
        <a
          href="https://www.linkedin.com/in/annaszymula/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Anna Szymula
        </a>
      </h5>
    </div>
    <div>
      <Link to="/about"> View Sources</Link>
    </div>
  </div>
)
