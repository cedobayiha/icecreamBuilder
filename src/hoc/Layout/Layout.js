import React, { Component } from 'react';
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
        <Toolbar open={this.sideDrawerToggleHandler} />

        <SideDrawer
          open={this.state.toggleSideDrawer}
          close={this.sideDrawerClosedHandler}
        />

        <main className={styles.Site}>{this.props.children}</main>
      </Aux>
    )
  }
}

export default Layout