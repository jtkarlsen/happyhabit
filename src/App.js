import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Activities from "./Activities/Activities";
import Activity from "./Activities/Activity";
import ActivityForm from "./Activities/ActivityForm";
import { auth } from "./firebase";
import Login from "./Login/Login";

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
            <h1 className="App-title">Happy Habit</h1>
            {this.state.authenticated && (
              <div className="App-signout">
                <a onClick={() => auth.signOut()}>Logout</a>
              </div>
            )}
            {!this.state.authenticated && (
              <div className="App-signout">
                <Link to="/login">Login</Link>
              </div>
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
            </Switch>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
