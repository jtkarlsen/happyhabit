import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./ActivityForm.css";
import firebase, { firestore, auth } from "./../firebase";

class ActivityForm extends Component {
  state = {
    name: "",
    reward: 0,
    validation: {
      name: true,
      reward: true
    },
    redirect: false
  };

  isValidInput = () => {
    return this.isValidName() && this.isValidReward();
  };

  isValidName = () => {
    const isValid = !!this.state.name && this.state.name.length > 0;
    this.setState({
      validation: { ...this.state.validation, name: isValid }
    });
    return isValid;
  };

  isValidReward = () => {
    const isValid = this.state.reward >= 0;
    this.setState({
      validation: { ...this.state.validation, reward: isValid }
    });
    return isValid;
  };

  addNewActivity = () => {
    if (this.isValidInput()) {
      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("activities")
        .add({
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
          name: this.state.name,
          current_reward: parseInt(this.state.reward, 10)
        })
        .then(ref => {
          this.setState({ redirect: true });
        });
    }
  };

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleRewardChange = event => {
    this.setState({
      reward: event.target.value
    });
  };

  render() {
    return (
      <div className="ActivityForm">
        {this.state.redirect && <Redirect to="/activities" />}
        <div id="ActivityForm-name" className={"ActivityForm-input-container"}>
          <input
            className={`ActivityForm-input ${!this.state.validation.name &&
              "ActivityForm-input-error"}`}
            type="text"
            placeholder="Enter the name of the activity"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>
        <div id="ActivityForm-reward" className="ActivityForm-input-container">
          <input
            className={`ActivityForm-input ${!this.state.validation.reward &&
              "ActivityForm-input-error"}`}
            type="number"
            placeholder="Enter the reward for each completion"
            value={this.state.reward}
            onChange={this.handleRewardChange}
          />
        </div>
        <div className="App-button" onClick={this.addNewActivity}>
          Create
        </div>
      </div>
    );
  }
}

export default ActivityForm;
