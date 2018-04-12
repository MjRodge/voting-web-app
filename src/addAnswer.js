import React from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';

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
    this.setState({answer : this.element.value });
    axios.post(this.apiLink, {answer: this.element.value})
      .then(function(response){
        console.log('saved successfully')
      });
  }

  render() {
    const {open} = this.state;
    return (
      <div className="add-answer">
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Add Option
        </button>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Add Option to Poll</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="Answer">
              Answer:
              <input type="text" name="answer" placeholder="Answer" ref={el => this.element = el} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddAnswerModal;
