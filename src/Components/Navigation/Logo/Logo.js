import React from 'react';
import cream from '../../../Assets/img/loggo.jpg';
import styles from './Logo.module.css';

const logo = (props) => {
  return (
    <div className={styles.Logo}>
      <img width="38" height="120" src={cream} alt="Ice cream logo" />
    </div>
  )
}
export default logo;