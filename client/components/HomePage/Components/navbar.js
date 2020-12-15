import React from 'react'

import {Link} from 'react-router-dom'

export const Navbar = () => (
  <div id="navbar">
    <div>
      <img src="../../../../img/logo.png" />
    </div>
    <nav>
      <div>
        <h5>
          <Link to="/">US Map</Link>
          <Link to="/ethnicity">Race & Ethnicity</Link>
          <Link to="/gender">Gender</Link>
          <Link to="/age">Age</Link>
          <Link to="/environment">Environment</Link>
          <Link to="/unemployment">Unemployment</Link>
          <Link to="/behindBars">Jails & Prisons</Link>
          <Link to="/hunger">Hunger</Link>
          <Link to="/about">About</Link>
        </h5>
      </div>
    </nav>
  </div>
)
