import React from 'react';
import axios from 'axios';
import Vote from './vote';
import DeleteAnswer from './deleteAnswer'

class Answers extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        answers: [],
      };
      this.apiLink = "http://127.0.0.1:8080/api/polls/"+this.props.pollSelected+"/all";
  }

  componentDidMount() {
    axios.get(this.apiLink)
      .then(response => {
        this.setState({answers: response.data.answers})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="answers">
        {this.state.answers.map(function(ans, i) {
          return (
            <div key={i} id={ans._id}>
              <DeleteAnswer pollSelected={this.props.pollSelected} answerSelected={ans._id} />
              <h3>{ans.answer}</h3>
              <Vote pollSelected={this.props.pollSelected} answerSelected={ans._id} />
              <h4>{ans.votes}</h4>
            </div>
          )
        }, this)}
      </div>
    );
  }
}

export default Answers;
