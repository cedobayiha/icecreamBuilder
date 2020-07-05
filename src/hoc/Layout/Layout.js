import React, { Component } from 'react';
import { connect } from 'react-redux'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux/Aux';
import styles from './Layout.module.css';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';



class Layout extends Component {
  state = {
    toggleSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ toggleSideDrawer: false })
  }

  sideDrawerToggleHandler = () => {

    this.setState((prevState) => {
      return { toggleSideDrawer: !prevState.toggleSideDrawer }
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          open={this.sideDrawerToggleHandler} />

        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.toggleSideDrawer}
          close={this.sideDrawerClosedHandler}
        />

        <main className={styles.Site}>{this.props.children}</main>
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);