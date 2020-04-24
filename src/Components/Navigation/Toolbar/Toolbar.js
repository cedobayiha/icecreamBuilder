import React from 'react';
import NavItems from '../NavItems/Navitems';
import Drawer from '../SideDrawer/DrawerToggle/DrawerToggle'
import Logo from '../../Navigation/Logo/Logo';
import styles from './Toolbar.module.css'

const Toolbar = (props) => {

  return (
    <header className={styles.Toolbar}>
      <div className={styles.Logo}><Logo /></div>

      <Drawer />

      <nav className={styles.DesktopOnly}>
        <NavItems />
      </nav>
    </header>
  )
}


export default Toolbar;