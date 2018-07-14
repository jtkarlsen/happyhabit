import React, { Component } from "react";
import moment from "moment";
import "./Activity.css";
import firebase, { firestore, auth } from "./../firebase";

class Activity extends Component {
  state = {
    activityId: this.props.match.params.id,
    activity: {},
    completions: []
  };

  getActivityRef = ({ userId, activityId }) => {
    return firestore
      .collection("users")
      .doc(userId)
      .collection("activities")
      .doc(activityId);
  };

  componentWillMount() {
    const activityRef = this.getActivityRef({
      userId: auth.currentUser.uid,
      activityId: this.state.activityId
    });

    activityRef.onSnapshot(snapshot => {
      const activity = snapshot.data();
      this.setState({
        activity
      });
    });

    activityRef
      .collection("completions")
      .orderBy("created_at", "desc")
      .onSnapshot(collectionSnapshot => {
        this.setState({
          completions: collectionSnapshot.docs.map(item => {
            console.log(item.data());
            return { id: item.id, ...item.data() };
          })
        });
        this.setState({
          sum_rewards: this.state.completions
            .map(completion => completion.reward)
            .reduce((a, b) => a + b, 0)
        });
      });
  }

  addNewActivityCompletet = () => {
    const activityRef = this.getActivityRef({
      userId: auth.currentUser.uid,
      activityId: this.state.activityId
    });
    activityRef.collection("completions").add({
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      reward: this.state.activity.current_reward
    });
  };

  render() {
    return (
      <div className="Activity">
        <div className="Activity-title">{this.state.activity.name}</div>
        <div className="Activity-title">{this.state.sum_rewards}</div>
        <div className="App-button" onClick={this.addNewActivityCompletet}>
          Add completed activity
        </div>
        {this.state.completions
          ? this.state.completions.map(completion => (
              <div className="App-link Activity-item">
                {(completion.created_at
                  ? moment(completion.created_at.toDate())
                  : moment()
                ).fromNow()}
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default Activity;
