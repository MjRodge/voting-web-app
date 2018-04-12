import React, { Component } from 'react';
import Polls from './polls';
import AddPollModal from './addPoll';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <AddPollModal />
        <Polls />
      </div>
    );
  }
}

export default App;
