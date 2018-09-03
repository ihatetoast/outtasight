import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="flex-container nav-cont">
          <Link to="/" className="logo-name">
            OuttaSight
          </Link>
          <ul className="nav-group">
            <li>
              <Link to="/register">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Nav;
