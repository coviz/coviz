import React from 'react'

import {Link} from 'react-router-dom'

export const Navbar = () => (
  <div className="flex">
    <h1>coviz</h1>

    <nav>
      <div>
        {/* The navbar will show these links before you log in */}
        <Link to="/">US Map</Link>
        <Link to="/ethnicity">Covid v. Ethnicity</Link>
        <Link to="/gender">Covid v. Gender</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>

    {/* <hr /> */}
  </div>
)
