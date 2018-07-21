import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <div className="Landing-info">
          Kickstart the habits you want to have by rewarding yourself
        </div>
        <Link className="App-link Landing-item" to={`/menu`}>
          {"Get to it"}
        </Link>
      </div>
    );
  }
}

export default Landing;
