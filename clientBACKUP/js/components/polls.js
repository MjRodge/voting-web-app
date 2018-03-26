import React from 'react';

class Polls extends React.Component {
  constructor() {
      super();
      this.state = {
        pollTitles: [],
      };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8080/api/polls/') //Fetch for API
    .then(results => {
      return results.json();
    }).then(data => {
      let pollTitles = data.results.map((poll, i) => {
        return (
          <div key={"poll_"+i}>
            <h2>{poll.question}</h2>
          </div>
        )
      })
      this.setState({pollTitles: pollTitles});
      console.log("state", this.state.pollTitles);
    })
  }

  render() {
    return (
      {this.state.pollTitles}
    )
  }

}

export default Polls;
