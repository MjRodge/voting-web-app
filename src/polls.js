import React from 'react';
import axios from 'axios';
import Answers from './answers';
import AddAnswerModal from './addAnswer';

class Polls extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        polls: [],
      };
      this.apiLink = "http://127.0.0.1:8080/api/polls/";
  }

  componentDidMount() {
    axios.get(this.apiLink)
      .then(response => {
        this.setState({polls: response.data})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div id="polls">
        {this.state.polls.map(function(poll, i) {
          return (
            <div key={i} id={poll._id}>
              <h2>{poll.question}</h2>
              <AddAnswerModal pollSelected={poll._id} />
              <Answers pollSelected={poll._id} />
            </div>
          )
        }, this)}
      </div>
    );
  }
}

export default Polls;
