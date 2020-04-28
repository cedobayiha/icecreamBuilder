import React, { Component } from 'react';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux/Aux';
import styles from './Layout.module.css'



class Layout extends Component {
  state = {
    toggleSideDrawer: false
  }

  render() {
    return (
      <Aux>
        <Toolbar />

        <main className={styles.Site}>{this.props.children}</main>
      </Aux>
    )
  }
}

export default Layout