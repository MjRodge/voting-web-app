import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Polls from './polls';
import PollResult from './pollResult';
import Header from './header';
import './css/reset.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route path="/" component={Header} />
            <Route exact path="/polls" component={Polls} />
            <Route path="/polls/:pollId" component={PollResult} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
