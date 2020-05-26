import React from 'react';
import styles from './DrawerToggle.module.css';

const drawerToggle = (props) => {
  return (
    <div className={styles.Drawer} onClick={props.click}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
export default drawerToggle;