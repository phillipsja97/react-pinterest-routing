import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import Home from '../Components/Pages/Home/Home';
import SingleBoard from '../Components/Pages/SingleBoard/SingleBoard';
import NewBoard from '../Components/Pages/NewBoard/NewBoard';
import Auth from '../Components/Pages/Auth/Auth';
import firebaseConnection from '../Helpers/data/connection';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

firebaseConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeEventListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeEventListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <Switch>
            <PrivateRoute path="/" exact component={Home} authed={authed}/>
            <PrivateRoute path="/board/new" exact component={NewBoard} authed={authed}/>
            <PublicRoute path="/auth" exact component={Auth} authed={authed}/>
            <PrivateRoute path="/board/:boardId" exact component={SingleBoard} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
