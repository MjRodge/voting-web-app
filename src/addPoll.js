import React from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';

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
    this.setState({poll : this.element.value });
    axios.post(this.apiLink, {question: this.element.value})
      .then(function(response){
        console.log('saved successfully')
        window.location.reload();
      });
  }

  render() {
    const {open} = this.state;
    return (
      <div className="add-poll">
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Add Poll
        </button>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Add A Poll</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="Poll">
              Poll:
              <input type="text" name="poll" placeholder="Question" ref={el => this.element = el} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddPollModal;
