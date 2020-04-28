import React from 'react';
import styles from './NavItem.module.css'
import { NavLink } from 'react-router-dom'
// import Aux from '../../../../hoc/Aux/Aux';


const navItem = (props) => {

  return (
    <li className={styles.List}>
      <NavLink to={props.link} exact={props.exact} activeClassName={styles.active}>
        {props.children}
      </NavLink>
    </li>


  )
}
export default navItem;