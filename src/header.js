import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <div>
          <Link to="/polls">
            <h1>Hello World!</h1>
          </Link>
          <Link to="/login">
            <h2>Sign Up/Log In</h2>
          </Link>
          <h2>(temp component)</h2>
        </div>
    );
  }
}

export default Header;
