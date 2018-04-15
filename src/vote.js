import React from 'react';
import axios from 'axios';

class Vote extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.apiLink = "http://127.0.0.1:8080/api/polls/"+this.props.pollSelected+"/"+this.props.answerSelected+"/vote";
  }

  handleClick() {
    axios.put(this.apiLink)
      .then(function(response){
        console.log('successfully voted');
        window.location.reload(); //Forced reload of window upon voting - find different way to do
      });
  }

  render() {
    return (
        <button onClick={this.handleClick}>
          Vote
        </button>
    );
  }
}

export default Vote;
