import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./RewardForm.css";
import firebase, { firestore, auth } from "./../firebase";

class RewardForm extends Component {
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

  addNewReward = () => {
    if (this.isValidInput()) {
      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("rewards")
        .add({
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
          name: this.state.name,
          points: parseInt(this.state.reward, 10)
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
      <div className="RewardForm">
        {this.state.redirect && <Redirect to="/rewards" />}
        <div id="RewardForm-name" className={"RewardForm-input-container"}>
          <input
            className={`RewardForm-input ${!this.state.validation.name &&
              "RewardForm-input-error"}`}
            type="text"
            placeholder="Enter the name of the reward"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>
        <div id="RewardForm-reward" className="RewardForm-input-container">
          <input
            className={`RewardForm-input ${!this.state.validation.reward &&
              "RewardForm-input-error"}`}
            type="number"
            placeholder="Enter the reward for each completion"
            value={this.state.reward}
            onChange={this.handleRewardChange}
          />
        </div>
        <div className="App-button" onClick={this.addNewReward}>
          Add
        </div>
      </div>
    );
  }
}

export default RewardForm;
