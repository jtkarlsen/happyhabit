import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestore, auth } from "./../firebase";
import { connect } from "react-redux";
import "./Activities.css";
import { gotActivities } from "../redux/actions";

class Activities extends Component {
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
        this.props.gotActivities(activities);
      });
  }

  render() {
    return (
      <div className="Activities">
        {this.props.activities.map(activity => {
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

const mapDispatchToProps = dispatch => ({
  gotActivities: activities => dispatch(gotActivities(activities))
});

const mapStateToProps = state => ({
  activities: state.activities
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
