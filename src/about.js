import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import './css/appBarOverride.css';
import './css/about.css';

const styles = {
  container: {
    backgroundColor: "#ffc107",
  },
  inkBar: {
    backgroundColor: "#00796b",
  },
};

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
        <div id="about">
          <AppBar
            title="Project Information"
            showMenuIconButton={false}
            className="app-bar-override"
          />
          <div>
            <Tabs
              onChange={this.handleChange}
              value={this.state.slideIndex}
              tabItemContainerStyle={styles.container}
              inkBarStyle={styles.inkBar}
            >
              <Tab label="Background" value={0} />
              <Tab label="Completed" value={1} />
            </Tabs>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}
            >
              <div className="about-tab">
                <h2>Building the Full-Stack Voting Web Application</h2>
                <p>This is my first attempt at creating a full-stack web application using <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer">MongoDB</a>, <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">Express.JS</a>, <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> and <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">Node.js</a>.</p>
                <p>Created as a project for the <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer">FreeCodeCamp</a> back-end curriculum, I had to create a dynamic web application that satisfied the following use case criteria:</p>
                <ul>
                  <li>As an authenticated user, I can keep my polls and come back later to access them.</li>
                  <li>As an authenticated user, I can share my polls with my friends.</li>
                  <li>As an authenticated user, I can see the aggregate results of my polls.</li>
                  <li>As an authenticated user, I can delete polls that I decide I do not want anymore.</li>
                  <li>As an authenticated user, I can create a poll with any number of possible items.</li>
                  <li>As an unauthenticated or authenticated user, I can see and vote on everyone's polls.</li>
                  <li>As an unauthenticated or authenticated user, I can see the results of polls in chart form.</li>
                  <li>As an authenticated user, if I don't like the options on a poll, I can create a new option.</li>
                </ul>
                <p>During the project, I have created an API using Express.js routing and a MongoDB database. The front-end retrieves information from the API using an <a href="https://github.com/axios/axios" target="_blank" rel="noopener noreferrer">Axios</a> HTTP connection which is then manipulated by React components styled using the <a href="https://www.material-ui.com/#/" target="_blank" rel="noopener noreferrer">MaterialUI</a> framework to provide an aesthetically pleasing interface allowing users to create polls and cast votes upon them. The results of the polls are displayed using <a href="https://www.chartjs.org/" target="_blank" rel="noopener noreferrer">Chart.js</a>.</p>
              </div>
              <div className="about-tab">
                <h2>Project Timeline</h2>
                <p>Below is a chronological list of activities completed during the undertaking of this project, including those still to be implemented to meet project brief.</p>
                <h3>Back-end:</h3>
                <ol>
                  <li>Initial project setup, including local development environment installation and Node.js, Express.js and Mongoose packages.</li>
                  <li>Created Mongoose schema for polls and answers.</li>
                  <li>Added Express API CRUD routes for poll objects.</li>
                  <li>Added Express API CRUD routes for answer objects, that would reference the associated poll.</li>
                  <li>Added Express API route that would list a specific poll, find all associated answers and provide JSON object for later manipulation by the interface.</li>
                  <li>Tested all routes with Postman.</li>
                </ol>
                <p><a href="https://github.com/MjRodge/voting-web-app/pull/1" target="_blank" rel="noopener noreferrer">Git repository at this stage</a></p>
                <h3>Front-end:</h3>
                <ol>
                  <li>Listed all polls from the server with a jQuery AJAX call.</li>
                  <li>Made decision to use React framework as front-end, rather than vanilla JS and HTML.</li>
                  <li>Created React component to list all available polls, and component to list specific poll, with all associated answers.</li>
                  <li>Used Axios package to make HTTP requests where required, including listing polls, answers, voting, and adding questions/answers.</li>
                  <li>Added React-Router package to link between components without page refresh.</li>
                  <li>Added ChartJS package and used this to add a visual demonstration of polling results. Added function to ensure a random colour from a select palette is chosen for every option in the poll, regardless of how many are present.</li>
                  <li>Used MaterialUI framework to style front-end components.</li>
                  <li>Added header, footer and about page components.</li>
                  <li>Prepared for initial push to Heroku server.</li>
                </ol>
                <h3>To-do:</h3>
                <ul>
                  <li>Add Mongoose schema for user accounts.</li>
                  <li>Create login routes for user authentication.</li>
                  <li>Protect polling routes behind authentication to meet project brief.</li>
                </ul>
              </div>
            </SwipeableViews>
          </div>
        </div>
    );
  }
}

export default About;
