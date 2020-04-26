import React from 'react';
import styles from './BackDrop.module.css';

const backDrop = (props) => {
  if (props.show) {
    return <div className={styles.Backdrop} onClick={props.closed}></div>
  } else {
    return null;
  }

}
export default backDrop;