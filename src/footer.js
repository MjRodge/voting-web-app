import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import './css/footer.css';

class Footer extends Component {
  render() {
    return (
        <div id="footer">
          <div id="footer-app-bar">
            <Link to={"/about"}>
              <FlatButton label="About" className="footer-button"/>
            </Link>
            <a href="https://github.com/MjRodge/voting-web-app" target="_blank">
              <FlatButton label="GitHub" className="footer-button"/>
            </a>
          </div>
          <div id="footer-text">
            <p>Designed and Implemented by <a href="https://mjrodge.me" target="_blank" className="footer-link">MjRodge</a></p>
            <p>Built using:</p>
            <p>
              <i className="fab fa-react fa-2x"></i>
              <i className="fab fa-node-js fa-2x"></i>
            </p>
          </div>
        </div>
    );
  }
}

export default Footer;
