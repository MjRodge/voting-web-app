import React, { Component } from 'react';
import axios from 'axios';
import AddAnswerModal from './addAnswer';
import AddPollModal from './addPoll';
//import DeleteAnswer from './deleteAnswer';
import { Doughnut } from 'react-chartjs-2';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import './css/appBarOverride.css';
import './css/pollResults.css';

//holds all available color shades for chart
const backgroundColorOptions = ["#e57373", "#f06292", "#ba68c8", "#b39ddb", "#9fa8da", "#64b5f6", "#4fc3f7",
  "#4dd0e1", "#4db6ac", "#81c784", "#aed581", "#dce775", "#fff176", "#ffd54f", "#ffb74d", "#ff8a65", "#90a4ae",
  "#f48fb1", "#ce93d8", "#90caf9", "#80cbc4", "#ffe082"];


class PollResult extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedRows: [], //used to add selected to table row after state change
        hasSelected: false, //will show true when radio checked, to render vote button
        poll: [],
        answers: [],
        data: {}, //axios get request will populate this for use in chartjs
        ansKey: [], //array that will hold the ID of answers that can be referenced from table
        selected: [] //answer ID that will be used to
      };
      this.apiLink = "/api/polls/"+this.props.match.params.pollId+"/all";
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
        let assignedColors =[] //array to hold as many colors as required for answers
        labels.forEach((color) => { //loop through all answers, assign random color
          assignedColors.push(backgroundColorOptions[Math.floor(Math.random()*backgroundColorOptions.length)]);
        })
        this.setState({
          data: {
            labels: labels, //options array assigned to data object
            datasets: [
              {
                label: 'Results',
                data: votes, //votes array assigned to data object
                backgroundColor: assignedColors
              }]
            }
          })
        })
      .catch(err => console.log(err))
  }

  handleRowSelection(rows) {
    for (var i = 0; i < rows.length; i++) {
      this.setState({selectedRows: rows}); //push selected answer into array to update table with selection on state change
      this.setState({selected: this.state.ansKey[rows[i]]}); //reference array and assign id of answer for voting
      this.setState({hasSelected: true}); //user has made selection, show vote button
    }
  }

  handleVote() {
    axios.put("/api/polls/"+this.state.poll._id+"/"+this.state.selected+"/vote")
      .then((response) => {
        console.log('successfully voted');
        this.props.history.push('/polls/'+this.state.poll._id);
      });
  }

  render() {
    return (
        <div>
          <AppBar
            title={this.state.poll.question}
            showMenuIconButton={false}
            iconElementRight={<AddPollModal />}
            className="app-bar-override"
          />
          <div id="results-container">
            <div className="results-chart">
              <Doughnut data={this.state.data} />
            </div>
            <Paper zDepth={2}>
              <div className="answers">
                <Table onRowSelection={(rows) => this.handleRowSelection(rows)}>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                        {this.state.poll.question}
                      </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                      <TableHeaderColumn>Answer</TableHeaderColumn>
                      <TableHeaderColumn>Votes</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody deselectOnClickaway={false} showRowHover={true}>
                    {this.state.answers.map(function(ans, i) {
                      this.state.ansKey.push(ans._id); //push _id from each answer to state, will be used on selection to vote
                      return (
                        <TableRow key={i} selected={this.state.selectedRows.indexOf(i) !== -1}>
                          <TableRowColumn>{ans.answer}</TableRowColumn>
                          <TableRowColumn>{ans.votes}</TableRowColumn>
                        </TableRow>
                      )
                    }, this)}
                  </TableBody>
                </Table>
                <div id="answer-buttons">
                  <AddAnswerModal pollSelected={this.props.match.params.pollId} />
                  <div className="vote-button">
                    {this.state.hasSelected ? ( //conditional to only show vote button when an answer is selected
                      <RaisedButton
                        backgroundColor="#ffc107"
                        onClick={this.handleVote}>
                          Vote
                      </RaisedButton>
                    ) : (
                      <p>Select to Continue</p>
                    )}
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
    );
  }
}

export default PollResult;
