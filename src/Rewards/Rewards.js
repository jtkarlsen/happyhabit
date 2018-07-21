import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestore, auth } from "./../firebase";
import "./Rewards.css";

class Rewards extends Component {
  state = {
    rewards: []
  };

  componentWillMount() {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("rewards")
      .onSnapshot(collectionSnapshot => {
        let rewards = [];
        collectionSnapshot.forEach(function(doc) {
          rewards.push({ ...doc.data(), id: doc.id });
        });
        this.setState({
          rewards
        });
      });
  }

  render() {
    return (
      <div className="Rewards">
        {this.state.rewards.map(reward => {
          return (
            <div key={reward.id} className="Rewards-item">
              <div className="Rewards-subitem">{reward.name}</div>
              <div className="Rewards-subitem">{reward.points}</div>
            </div>
          );
        })}
        <Link className="Rewards-create" to={"/rewards/create"}>
          Add purchased reward
        </Link>
      </div>
    );
  }
}

export default Rewards;
