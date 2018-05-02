import React, { Component } from 'react';
import axios from 'axios';
import AddAnswerModal from './addAnswer';
//import DeleteAnswer from './deleteAnswer';
import { Doughnut } from 'react-chartjs-2';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './css/appBarOverride.css';

class PollResult extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selected: [], //will hold answer ID of radio button selected
        hasSelected: false, //will show true when radio checked, to render vote button
        poll: [],
        answers: [],
        data: {} //axios get request will populate this for use in chartjs
      };
      this.apiLink = "http://127.0.0.1:8080/api/polls/"+this.props.match.params.pollId+"/all";
      this.ansSelect = this.ansSelect.bind(this);
      this.handleVote = this.handleVote.bind(this);
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

  ansSelect(event, value) {
      this.setState({selected: event.target.value});
      this.setState({hasSelected: true});
  }
  handleVote() {
    axios.put("http://127.0.0.1:8080/api/polls/"+this.state.poll._id+"/"+this.state.selected+"/vote")
      .then(function(response){
        console.log('successfully voted');
        window.location.reload(); //Forced reload of window upon voting - find different way to do
      });
  }

  render() {
    return (
        <div>
          <AppBar
            title={this.state.poll.question}
            showMenuIconButton={false}
            iconElementRight={<FlatButton label="Add Poll" className="app-bar-button" />}
            className="app-bar-override"
          />
          <div>
            <Doughnut data={this.state.data} />
          </div>
          <div className="answers">
            <FloatingActionButton>
              <ContentAdd />
            </FloatingActionButton>
            <AddAnswerModal pollSelected={this.props.match.params.pollId} />
            <RadioButtonGroup name="answers" onChange={this.ansSelect}>
              {this.state.answers.map(function(ans, i) {
                return (
                  <RadioButton value={ans._id} label={ans.answer+" ("+ans.votes+" votes)"} key={i}/>
                )
              }, this)}
            </RadioButtonGroup>
            {this.state.hasSelected ? ( //conditional to only show vote button when an answer is selected
              <RaisedButton onClick={this.handleVote}>
                Vote
              </RaisedButton>
            ) : (
              <p>Select to Continue</p>
            )}
          </div>
        </div>
    );
  }
}

export default PollResult;
