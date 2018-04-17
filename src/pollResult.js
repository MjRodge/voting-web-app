import React, { Component } from 'react';
import axios from 'axios';
import AddAnswerModal from './addAnswer';
import Vote from './vote';
import DeleteAnswer from './deleteAnswer';
import { Doughnut } from 'react-chartjs-2';

class PollResult extends Component {
  constructor(props) {
      super(props);
      this.state = {
        poll: [],
        answers: [],
        data: {}
      };
      this.apiLink = "http://127.0.0.1:8080/api/polls/"+this.props.match.params.pollId+"/all";
  }

  componentDidMount() {
    axios.get(this.apiLink)
      .then(response => {
        this.setState({poll: response.data, answers: response.data.answers});
        const answers = response.data.answers;
        let labels = []; //array to hold all answer options
        let votes = []; //array to hold votes for each option
        answers.forEach((data) => { //loop through all returned answers for options and votes
          labels.push(data.answer);
          votes.push(data.votes);
        });
        this.setState({
          data: {
            labels: labels, //options array assigned to data object
            datasets: [
              {
                label: 'Results',
                data: votes, //votes array assigned to data object
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
                ]
              }]
            }
          })
        })
      .catch(err => console.log(err))
  }

  render() {
    return (
        <div>
          <h1>{this.state.poll.question}</h1>
          <div>
            <Doughnut data={this.state.data} />
          </div>
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
