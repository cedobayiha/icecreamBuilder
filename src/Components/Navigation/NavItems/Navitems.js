import React from 'react';
import styles from './NavItems.module.css'
import NavItem from './NavItem/NavItem';

const NavItems = (props) => {

  return (
    <ul className={styles.NavigationItems}>
      <NavItem>
        iceCream Builder
      </NavItem>

      <NavItem>
        Orders
        </NavItem>
    </ul>
  )
}

export default NavItems;