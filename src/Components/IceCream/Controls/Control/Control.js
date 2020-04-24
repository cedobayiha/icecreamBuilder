import React from 'react';
import styles from './control.module.css'

const control = (props) => {
  console.log(props.disabled)
  return (
    <div className={styles.Control}>
      <p className={styles.Label}><strong>{props.label}</strong></p>
      <button disabled={props.disabled} className={styles.Less} onClick={props.dec}>LESS</button>
      <button className={styles.More} onClick={props.add}>MORE</button>
    </div>
  )
}

export default control;