import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import './css/appBarOverride.css';
import './css/about.css';

class About extends Component {
  render() {
    return (
        <div id="about">
          <AppBar
            title="Project Information"
            showMenuIconButton={false}
            className="app-bar-override"
          />
          <h1>YEAH</h1>
        </div>
    );
  }
}

export default About;
