import React from 'react';
import axios from 'axios';

class Polls extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        poll: [],
      };
      this.apiLink = "http://127.0.0.1:8080/api/polls/";
  }

  componentDidMount() {
    axios.get(this.apiLink)
      .then(response => this.setState({poll: response.data[0].question}))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div id="polls">
        <h2>{this.state.poll}</h2>
      </div>
    );
  }
}

export default Polls;
