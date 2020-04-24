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
  console.log(props.disabled)

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
          disabled={props.disabled[ctrl.type]} />
      })}

    </div>

  )

}

export default controls;