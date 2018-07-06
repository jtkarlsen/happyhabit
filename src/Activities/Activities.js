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
      .get()
      .then(result => {
        this.setState({
          activities: result.docs.map(item => {
            return { id: item.id, ...item.data() };
          })
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  render() {
    return (
      <div className="Activities">
        {this.state.activities.map(activity => {
          return (
            <Link
              key={activity.id}
              className="Activities-item"
              to={`/activities/${activity.id}`}
            >
              {" "}
              {activity.name}{" "}
            </Link>
          );
        })}
        <div className="Activity-create">
          <Link to={"/activities/create"}>Create new activity</Link>
        </div>
      </div>
    );
  }
}

export default Activities;
