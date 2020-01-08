import React from 'react';
import Boards from '../../Shared/Boards/Boards';
import boardData from '../../../Helpers/data/boardData';
import authData from '../../../Helpers/data/authData';
import './Home.scss';

class Home extends React.Component {
 state = {
   boards: [],
 }

 componentDidMount() {
   boardData.getBoardsByUid(authData.getUid())
     .then((boards) => {
       this.setState({ boards });
     })
     .catch((error) => console.error(error));
 }

 render() {
   return (
      <div className="Home">
        <h1>Home Component</h1>
        <div className="boards d-flex flex-wrap justify-content-center">
          { this.state.boards.map((board) => <Boards key={board.id} board={board} />)}
        </div>
      </div>
   );
 }
}

export default Home;
