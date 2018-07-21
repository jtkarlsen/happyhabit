import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Activities from "./Activities/Activities";
import Activity from "./Activities/Activity";
import ActivityForm from "./Activities/ActivityForm";
import { auth } from "./firebase";
import Login from "./Login/Login";
import Menu from "./Menu/Menu";
import Landing from "./Landing/Landing";
import Rewards from "./Rewards/Rewards";
import RewardForm from "./Rewards/RewardForm";
import { gotAuth } from "./redux/actions";
import requireAuth from "./requireAuth";

class App extends Component {
  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged(user =>
      this.props.gotAuth(user)
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    console.log(this.props);
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Link className="App-title" to="/menu">
              Happy Habit
            </Link>
            {!!this.props.user && (
              <a className="App-auth" onClick={() => auth.signOut()}>
                Logout
              </a>
            )}
            {!this.props.user && (
              <Link className="App-auth" to="/login">
                Login
              </Link>
            )}
          </header>
          {this.props.auth_loaded && (
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/menu" component={requireAuth(Menu)} />
              <Route
                exact
                path="/activities"
                component={requireAuth(Activities)}
              />
              <Route
                exact
                path="/activities/create"
                component={requireAuth(ActivityForm)}
              />
              <Route
                exact
                path="/activities/:id"
                component={requireAuth(Activity)}
              />
              <Route exact path="/rewards" component={requireAuth(Rewards)} />
              <Route
                exact
                path="/rewards/create"
                component={requireAuth(RewardForm)}
              />
            </Switch>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  gotAuth: user => dispatch(gotAuth(user))
});

const mapStateToProps = state => ({
  auth_loaded: state.auth_loaded
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
