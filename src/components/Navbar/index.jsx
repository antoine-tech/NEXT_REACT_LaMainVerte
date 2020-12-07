import React from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  return (
    <nav>
      <Link to='/' className="nav-link" title="home">
        Home
      </Link>
      {
      // if user is not logged
      <div className="diconnected-nav-links">
        <Link to='/register' className="signup-btn">
          Sign up
        </Link>
        <Link to='/login' className="signin-btn">
          Sign in
        </Link>
      </div>
      }

      { // if user is logged
        <div className="connected-nav-links">
          <Link to='/profile' className="nav-link" title="My profile">
            My Profile
          </Link>
          <button className="log-out-btn" onClick={() => Cookies.remove('token') }>
            Log out
          </button>
        </div>
      }
  </nav>
  )
}

export default Navbar;