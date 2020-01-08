import React from 'react';
import propTypes from 'prop-types';
import boardShape from '../../../Helpers/propz/boardShape';

class Boards extends React.Component {
state = {
  boards: [],
}

static propTypes = {
  board: boardShape.boardShape,
}

render() {
  const { board } = this.props;
  return (
    <div className="Board col-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{board.name}</h5>
          <p class="card-text">{board.description}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  );
}
}

export default Boards;
