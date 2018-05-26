import React from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { withRouter } from "react-router-dom";
import './css/modals.css';

class AddAnswerModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        answer: '',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.apiLink = "/api/polls/"+this.props.pollSelected+"/add";
  }

  onOpenModal = () => {
    this.setState({open: true});
  }
  onCloseModal = () => {
    this.setState({open: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(this.apiLink, {answer: this.state.answer})
      .then((response) => {
        console.log('saved successfully');
        this.onCloseModal();
        this.props.addAnswer();
      });
  }

  render() {
    const {open} = this.state;
    return (
      <div className="add-answer">
        <FloatingActionButton backgroundColor="#009688" onClick={this.onOpenModal}>
          <ContentAdd />
        </FloatingActionButton>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Add Answer to Poll</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              className="modal-text"
              value={this.state.answer}
              onChange={e =>this.setState({ answer: e.target.value})}
              hintText="Answer Text"
            />
            <FlatButton type="submit" className="modal-button-primary">
              Submit
            </FlatButton>
            <FlatButton onClick={this.onCloseModal} className="modal-button">
              Cancel
            </FlatButton>
          </form>
        </Modal>
      </div>
    );
  }
}

export default withRouter(AddAnswerModal);
