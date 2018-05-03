import React from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './css/modals.css';

class AddAnswerModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        answer: '',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.apiLink = "http://127.0.0.1:8080/api/polls/"+this.props.pollSelected+"/add";
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
      .then(function(response){
        console.log('saved successfully');
        window.location.reload();
      });
  }

  render() {
    const {open} = this.state;
    return (
      <div className="add-answer">
        <FloatingActionButton mini="true" onClick={this.onOpenModal}>
          <ContentAdd />
        </FloatingActionButton>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Add Answer to Poll</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              value={this.state.answer}
              onChange={e =>this.setState({ answer: e.target.value})}
              hintText="Answer Text"
            />
            <FlatButton onClick={this.onCloseModal}>
              Cancel
            </FlatButton>
            <FlatButton type="submit" className="modal-button">
              Submit
            </FlatButton>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddAnswerModal;
