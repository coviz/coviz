import React from 'react'

import {Link} from 'react-router-dom'

export const Navbar = () => (
  <div>
    <h1>coviz</h1>
    <nav>
      <div>
        {/* The navbar will show these links before you log in */}
        <Link to="/">US Map</Link>
        <Link to="/chart">Chart</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
    <hr />
  </div>
)
