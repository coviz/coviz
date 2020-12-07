import React from 'react'

import {Link} from 'react-router-dom'

export const Navbar = () => (
  <div>
    <h1>coviz</h1>
    <nav>
      <div>
        <Link to="/">US Map</Link>
        <Link to="/chart">Chart</Link>
        {/* <Link to="/environment">Environment</Link> */}
      </div>
    </nav>
    <hr />
  </div>
)
