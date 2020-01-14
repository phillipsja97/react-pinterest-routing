import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import boardShape from '../../../Helpers/propz/boardShape';
import './Boards.scss';

class Boards extends React.Component {
state = {
  boards: [],
}

static propTypes = {
  board: boardShape.boardShape,
  deleteBoard: PropTypes.func,
}

deleteBoardEvent = (e) => {
  e.preventDefault();
  const { deleteBoard, board } = this.props;
  deleteBoard(board.id);
}

render() {
  const { board } = this.props;
  return (
    <div className="Board col-4">
      <div className="card">
          <button className="btn btn-danger deleteBoardButton col-1" onClick={this.deleteBoardEvent}>X</button>
        <div className="card-body">
          <h5 className="card-title">{board.name}</h5>
          <p className="card-text">{board.description}</p>
          <Link className="btn btn-outline-primary" to={`/board/${board.id}`}>View Board</Link>
          <Link className="btn btn-outline-warning" to={`/board/${board.id}/edit`}>Edit Board</Link>
        </div>
      </div>
    </div>
  );
}
}

export default Boards;
