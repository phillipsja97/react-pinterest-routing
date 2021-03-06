import React from 'react';
import { Link } from 'react-router-dom';
import pinData from '../../../Helpers/data/pinData';
import boardData from '../../../Helpers/data/boardData';
import Pin from '../../Shared/Pins/Pins';
import './SingleBoard.scss';

class SingleBoard extends React.Component {
  state = {
    pins: [],
    board: {},
  }

  getPinData = (boardId) => {
    pinData.getPinsByBoardId(boardId)
      .then((pins) => {
        this.setState({ pins });
      })
      .catch((error) => console.error('error in the pins'));
  }

  componentDidMount() {
    const { boardId } = this.props.match.params;
    boardData.getSingleBoard(boardId)
      .then((response) => {
        this.setState({ board: response.data });
        this.getPinData(boardId);
      })
      .catch((error) => console.error(error));
  }

  deletePin = (pinId) => {
    const { boardId } = this.props.match.params;
    pinData.deletePin(pinId)
      .then(() => {
        this.getPinData(boardId);
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { boardId } = this.props.match.params;
    const { pins, board, deletePin } = this.props;
    return (
      <div className="SingleBoard">
        <h1>{this.state.board.description}</h1>
        <Link className="btn btn-outline-primary" to={`/board/${boardId}/pin/new`}>Add A New Pin</Link>
        <div className="d-flex flex-wrap justify-content-center">
        { this.state.pins.map((pin) => <Pin key={pin.id} pin={pin} deletePin={this.deletePin} />)}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
