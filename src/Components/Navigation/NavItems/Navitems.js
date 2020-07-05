import React from 'react';
import styles from './NavItems.module.css'

import NavItem from './NavItem/NavItem';


const NavItems = (props) => {

  return (
    <ul className={styles.NavItems}>
      <NavItem link='/' exact>
        iceCream Builder
      </NavItem>

      {props.isAuth ? <NavItem link="/orders">
        Orders
        </NavItem> : null}
      {props.isAuth ? <NavItem link="/logout">
        Log out
        </NavItem> : <NavItem link="/auth">
          Log in
        </NavItem>
      }
    </ul>
  )
}

export default NavItems;