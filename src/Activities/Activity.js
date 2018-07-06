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

  loadData = () => {
    const activityRef = this.getActivityRef({
      userId: auth.currentUser.uid,
      activityId: this.state.activityId
    });

    activityRef
      .get()
      .then(result => {
        const activity = result.data();
        this.setState({
          activity
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    activityRef
      .collection("completions")
      .orderBy("created_at", "desc")
      .get()
      .then(result => {
        this.setState({
          completions: result.docs.map(item => {
            return { id: item.id, ...item.data() };
          })
        });
        this.setState({
          sum_rewards: this.state.completions
            .map(completion => completion.reward)
            .reduce((a, b) => a + b)
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  componentWillMount() {
    this.loadData();
  }

  addNewActivityCompletet = () => {
    const activityRef = this.getActivityRef({
      userId: auth.currentUser.uid,
      activityId: this.state.activityId
    });
    activityRef
      .collection("completions")
      .add({
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        reward: this.state.activity.current_reward
      })
      .then(ref => {
        this.loadData();
      });
  };

  render() {
    return (
      <div className="Activity">
        <p>
          {this.state.activity.name} - {this.state.sum_rewards}
        </p>
        <div className="Activity-new" onClick={this.addNewActivityCompletet}>
          NEW
        </div>
        {this.state.completions
          ? this.state.completions.map(completion => (
              <div>
                <p>
                  {moment(completion.created_at.toDate()).fromNow()} -{" "}
                  {completion.reward}
                </p>
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default Activity;
