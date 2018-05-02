import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/header.css';

class Header extends Component {
  render() {
    return (
        <div id="header">
          <Link to="/polls">
            <h1>voting-web-app</h1>
          </Link>
        </div>
    );
  }
}

export default Header;
