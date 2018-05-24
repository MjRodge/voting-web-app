import React from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
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
      this.apiLink = "/api/polls/";
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
        window.location.assign("/");
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
              className="modal-text"
              value={this.state.poll}
              onChange={e =>this.setState({ poll: e.target.value})}
              hintText="Poll Question"
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

export default AddPollModal;
