import React, { Component } from "react";
import firebase, { auth } from "./../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./Login.css";

class Login extends Component {
  uiConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    signInSuccessUrl: this.props.location.state
      ? this.props.location.state.from || "/"
      : "/"
  };

  render() {
    return (
      <div>
        {!!auth.currentUser && (
          <span>
            <div className="App-link Auth-info">
              You are logged in as {auth.currentUser.displayName}
            </div>
            <div className="App-button" onClick={() => auth.signOut()}>
              Click here to login with another account
            </div>
          </span>
        )}
        {!auth.currentUser && (
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
        )}
      </div>
    );
  }
}

export default Login;
