import React from 'react'
import {GoMarkGithub} from 'react-icons/go'

export const Footer = () => (
  <div className="footer">
    <a
      href="https://github.com/coviz/coviz"
      rel="noopener noreferrer"
      target="_blank"
    >
      <GoMarkGithub color="##e36397" size={32} /> Link to GitHub
    </a>
    <ul className="footerul">
      <li>CREATORS</li>
      <li>Claire Brown</li>
      <li>Jin Young Choi</li>
      <li>Jasmine Hatcher</li>
      <li>Anna Syzmula</li>
    </ul>
  </div>
)
