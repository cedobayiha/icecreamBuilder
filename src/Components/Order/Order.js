import React from 'react';
import styles from './Order.module.css';

const order = (props) => {
  let arr = []
  for (let key in props.ing) {
    if (props.ing[key] > 0) {
      arr.push({ name: key, amount: props.ing[key] })
    }
  }

  const finalOutput = arr.map(ar => {
    return <span className={styles.List} key={ar.name}>{ar.name} ({ar.amount})</span>
  })



  return (
    <div className={styles.Order}>
      <p>Name: {props.name}</p>
      <p>Ingredients: {finalOutput}</p>
      <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
    </div>
  )
}

export default order;