import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Activities from "./Activities/Activities";
import Activity from "./Activities/Activity";
import ActivityForm from "./Activities/ActivityForm";
import { auth } from "./firebase";
import Login from "./Login/Login";
import Rewards from "./Rewards/Rewards";
import RewardForm from "./Rewards/RewardForm";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  state = {
    authenticated: false,
    loadingAuth: true
  };

  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged(user =>
      this.setState({
        authenticated: !!user,
        loadingAuth: false
      })
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Link className="App-title" to="/">
              Happy Habit
            </Link>
            {this.state.authenticated && (
              <a className="App-auth" onClick={() => auth.signOut()}>
                Logout
              </a>
            )}
            {!this.state.authenticated && (
              <Link className="App-auth" to="/login">
                Login
              </Link>
            )}
          </header>
          {!this.state.loadingAuth && (
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/"
                component={Activities}
                authenticated={this.state.authenticated}
              />
              <PrivateRoute
                exact
                path="/activities/create"
                component={ActivityForm}
                authenticated={this.state.authenticated}
              />
              <PrivateRoute
                exact
                path="/activities/:id"
                component={Activity}
                authenticated={this.state.authenticated}
              />
              <PrivateRoute
                exact
                path="/rewards"
                component={Rewards}
                authenticated={this.state.authenticated}
              />
              <PrivateRoute
                exact
                path="/rewards/create"
                component={RewardForm}
                authenticated={this.state.authenticated}
              />
            </Switch>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
