import React from 'react';
import './BoardForm.scss';
import authData from '../../../Helpers/data/authData';
import boardData from '../../../Helpers/data/boardData';

class BoardForm extends React.Component {
  state = {
    boardName: '',
    boardDescription: '',
  }

  componentDidMount() {
    const { boardId } = this.props.match.params;
    if (boardId) {
      boardData.getSingleBoard(boardId)
        .then((response) => {
          this.setState({ boardName: response.data.name, boardDescription: response.data.description });
        })
        .catch((error) => console.error(error));
    }
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDescription: e.target.value });
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const newBoard = {
      name: this.state.boardName,
      description: this.state.boardDescription,
      uid: authData.getUid(),
    };
    boardData.saveBoard(newBoard)
      .then(() => this.props.history.push('/'))
      .catch((errorFromSaveBoard) => console.error(errorFromSaveBoard));
  }

  render() {
    const { boardName, boardDescription } = this.state;
    return (
      <div className="BoardForm">
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="board-name">Board Name</label>
            <input
              type="text"
              className="form-control"
              id="board-name"
              placeholder="Enter Board Name"
              value={this.state.boardName}
              onChange={this.nameChange}
              />
          </div>
          <div className="form-group">
            <label htmlFor="board-description">Board Name</label>
            <input
              type="text"
              className="form-control"
              id="board-description"
              placeholder="Enter Board Description"
              value={this.state.boardDescription}
              onChange={this.descriptionChange}
              />
          </div>
          <button className="btn btn-outline-primary" onClick={this.saveBoardEvent}>Save Board</button>
        </form>
      </div>
    );
  }
}

export default BoardForm;
