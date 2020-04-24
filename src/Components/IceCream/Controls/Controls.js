import React from 'react';
import styles from './Controls.module.css';
import Control from './Control/Control'
//  import Aux from '../../hoc/Aux/Aux';

const controlz = [
  { labels: "Mango", type: 'mango' },
  { labels: "Vanilla", type: 'vanilla' },
  { labels: "Strawberry", type: 'strawberry' },
  { labels: "Mint", type: 'mint' },
  { labels: "Chocolate", type: 'chocolate' }
]

const controls = (props) => {
  console.log(props.odrBtn)
  console.log(props.noMas)

  return (

    <div className={styles.Controls}>
      <h3>Current Price: {props.price.toFixed(2)}</h3>
      {controlz.map(ctrl => {

        return <Control
          label={ctrl.labels}
          key={ctrl.labels}
          type={ctrl.type}
          add={() => props.plusIngredients(ctrl.type)}
          dec={() => props.minusIngredients(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
          noMas={props.noMas} />
      })}
      <button className={styles.Order}
        disabled={props.odrBtn}>Order Now</button>
    </div>

  )

}

export default controls;