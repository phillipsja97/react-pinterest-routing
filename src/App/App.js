import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import Home from '../Components/Pages/Home/Home';
import SingleBoard from '../Components/Pages/SingleBoard/SingleBoard';
import BoardForm from '../Components/Pages/BoardForm/BoardForm';
import PinForm from '../Components/Pages/PinForm/PinForm';
import Auth from '../Components/Pages/Auth/Auth';
import firebaseConnection from '../Helpers/data/connection';
import MyNavBar from '../Components/Shared/MyNavBar/MyNavBar';
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
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <MyNavBar authed={authed} />
          <Switch>
            <PrivateRoute path="/" exact component={Home} authed={authed}/>
            <PrivateRoute path="/board/:boardId/pin/new" exact component={PinForm} authed={authed} />
            <PrivateRoute path="/board/new" exact component={BoardForm} authed={authed}/>
            <PrivateRoute path="/board/:boardId/edit" exact component={BoardForm} authed={authed} />
            <PublicRoute path="/auth" exact component={Auth} authed={authed}/>
            <PrivateRoute path="/board/:boardId" exact component={SingleBoard} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
