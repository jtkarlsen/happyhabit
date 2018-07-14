import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestore, auth } from "./../firebase";
import "./Activities.css";

class Activities extends Component {
  state = {
    activities: []
  };

  componentWillMount() {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("activities")
      .onSnapshot(collectionSnapshot => {
        let activities = [];
        collectionSnapshot.forEach(function(doc) {
          activities.push({ ...doc.data(), id: doc.id });
        });
        this.setState({
          activities
        });
      });
  }

  render() {
    return (
      <div className="Activities">
        {this.state.activities.map(activity => {
          return (
            <Link
              key={activity.id}
              className="App-link Activities-item"
              to={`/activities/${activity.id}`}
            >
              {" "}
              {activity.name}{" "}
            </Link>
          );
        })}
        <Link className="Activity-create" to={"/activities/create"}>
          Create new activity
        </Link>
      </div>
    );
  }
}

export default Activities;
