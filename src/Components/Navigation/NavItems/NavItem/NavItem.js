import React from 'react';
import styles from './NavItem.module.css'
// import Aux from '../../../../hoc/Aux/Aux';


const navItem = (props) => {

  return (
    <li className={styles.List}>
      <a href="index.html">
        {props.children}
      </a>
    </li>


  )
}
export default navItem;