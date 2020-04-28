import React from 'react';
import styles from './NavItems.module.css'

import NavItem from './NavItem/NavItem';


const NavItems = (props) => {

  return (
    <ul className={styles.NavigationItems}>


      <NavItem link='/' exact>
        iceCream Builder
      </NavItem>





      <NavItem link="/orders">
        Orders
        </NavItem>


    </ul>
  )
}

export default NavItems;