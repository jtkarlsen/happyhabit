import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (!this.props.user) {
        this.context.router.history.push("/login");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.user) {
        this.context.router.history.push("/login");
      }
    }

    render() {
      if (this.props.user) {
        return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  function mapStateToProps(state) {
    return { user: state.user };
  }

  return connect(mapStateToProps)(Authentication);
}
