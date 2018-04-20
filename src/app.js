import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Polls from './polls';
import PollResult from './pollResult';
import Header from './header';
import LogIn from './login';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Header} />
          <Route path="/login" component={LogIn} />
          <Route exact path="/polls" component={Polls} />
          <Route path="/polls/:pollId" component={PollResult} />
        </div>
      </Router>
    );
  }
}

export default App;
