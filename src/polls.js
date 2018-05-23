import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddPollModal from './addPoll';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import './css/appBarOverride.css';
import './css/polls.css';

class Polls extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        polls: [],
      };
      this.apiLink = "https://mjrodge-voting-app.herokuapp.com/api/polls/";
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
        <AppBar
          title="All Polls"
          showMenuIconButton={false}
          iconElementRight={<AddPollModal />}
          className="app-bar-override"
        />
        {this.state.polls.map(function(poll, i) {
          return (
            <Link to={"/polls/"+poll._id} key={i}>
              <Paper className="poll-paper" zDepth={2}>
              <div id={poll._id} className="poll-question">
                <h2>{poll.question}</h2>
              </div>
              </Paper>
            </Link>
          )
        }, this)}
      </div>
    );
  }
}

export default Polls;
