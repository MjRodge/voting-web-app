import React from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './css/appBarOverride.css';
import './css/modals.css';

class AddPollModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        poll: '',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.apiLink = "http://127.0.0.1:8080/api/polls/";
  }

  onOpenModal = () => {
    this.setState({open: true});
  }
  onCloseModal = () => {
    this.setState({open: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(this.apiLink, {question: this.state.poll})
      .then(function(response){
        console.log('saved successfully');
        window.location.assign("/polls");
      });
  }

  render() {
    const {open} = this.state;
    return (
      <div className="add-poll">
        <FlatButton label="Add Poll" className="app-bar-button" onClick={this.onOpenModal}/>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Add A Poll</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              value={this.state.poll}
              onChange={e =>this.setState({ poll: e.target.value})}
              hintText="Poll Question"
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

export default AddPollModal;
