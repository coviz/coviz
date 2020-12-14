import React from 'react'

import {Link} from 'react-router-dom'

export const Navbar = () => (
  <div id="navbar">
    <div>
      <img src="../../../../img/logo.png" />
    </div>
    <nav>
      <div>
        {/* The navbar will show these links before you log in */}
        <h5>
          <Link to="/">US Map</Link>
        </h5>
        <h5>
          <Link to="/ethnicity">Covid v. Ethnicity</Link>
        </h5>
        <h5>
          <Link to="/gender">Covid v. Gender</Link>
        </h5>
        <h5>
          <Link to="/age">Covid v. Age</Link>
        </h5>
        <h5>
          <Link to="/environment">Environment</Link>
        </h5>
        <h5>
          <Link to="/unemployment">Covid v. Unemployment</Link>
        </h5>
        <h5>
          <Link to="/about">About</Link>
        </h5>
      </div>
    </nav>

    {/* <hr /> */}
  </div>
)
