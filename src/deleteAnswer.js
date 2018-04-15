import React from 'react';
import axios from 'axios';

class DeleteAnswer extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.apiLink = "http://127.0.0.1:8080/api/polls/"+this.props.pollSelected+"/"+this.props.answerSelected;
  }

  handleClick() {
    axios.delete(this.apiLink)
      .then(function(response){
        console.log('successfully deleted');
        window.location.reload();
      });
  }

  render() {
    return (
      <button onClick={this.handleClick}>Delete</button>
    );
  }
}

export default DeleteAnswer;
