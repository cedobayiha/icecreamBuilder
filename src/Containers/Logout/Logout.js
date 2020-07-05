import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Logout extends Component {

  componentDidMount() {
    this.props.onLoggingOut();
  }

  render() {
    return (
      <Redirect to="/" />
    )
  }
}

const MapDispatchToProps = dispatch => {
  return {
    onLoggingOut: () => dispatch(actions.logout())
  }
}

export default connect(null, MapDispatchToProps)(Logout);
