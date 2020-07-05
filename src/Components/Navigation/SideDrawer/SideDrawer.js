import React from 'react'
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../../UI/BackDrop/BackDrop';
import styles from './SideDrawer.module.css';
import NavItems from '../NavItems/Navitems';
import Logo from '../Logo/Logo'


const sideDrawer = (props) => {
  let attachedStyles = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedStyles = [styles.SideDrawer, styles.Open]
  }
  return (
    <Aux>
      <BackDrop show={props.open} closed={props.close} />
      <div className={attachedStyles.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>


        <nav>
          <NavItems
            isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  )
}

export default sideDrawer;