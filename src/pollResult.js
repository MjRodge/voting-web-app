import React, { Component } from 'react';
import axios from 'axios';
import AddAnswerModal from './addAnswer';
import Vote from './vote';
import DeleteAnswer from './deleteAnswer'

class PollResult extends Component {
  constructor(props) {
      super(props);
      this.state = {
        poll: [],
        answers: []
      };
      this.apiLink = "http://127.0.0.1:8080/api/polls/"+this.props.match.params.pollId+"/all";
  }

  componentDidMount() {
    axios.get(this.apiLink)
      .then(response => {
        this.setState({poll: response.data, answers: response.data.answers})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
        <div>
          <h1>{this.state.poll.question}</h1>
          <div className="answers">
            {this.state.answers.map(function(ans, i) {
              return (
                <div key={i} id={ans._id}>
                  <DeleteAnswer pollSelected={this.state.poll._id} answerSelected={ans._id} />
                  <h3>{ans.answer}</h3>
                  <Vote pollSelected={this.state.poll._id} answerSelected={ans._id} />
                  <h4>{ans.votes}</h4>
                </div>
              )
            }, this)}
          </div>
          <AddAnswerModal pollSelected={this.props.match.params.pollId} />
        </div>
    );
  }
}

export default PollResult;
