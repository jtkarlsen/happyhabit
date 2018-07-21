import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <Link className="App-link Menu-item" to={`/activities`}>
          {"Activities"}
        </Link>
        <Link className="App-link Menu-item" to={`/rewards`}>
          {"Rewards"}
        </Link>
      </div>
    );
  }
}

export default Menu;
