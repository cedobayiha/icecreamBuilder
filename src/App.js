import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import IcecreamBuilder from './Containers/IcecremBuilder/IcecreamBuilder';
import Checkout from './Containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Logout/Logout';
import * as actions from './store/actions/index';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route exact path="/" component={IcecreamBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={IcecreamBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authVerifyState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
