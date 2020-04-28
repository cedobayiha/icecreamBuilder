import React from 'react';
import Button from "../UI/Button/Button";

const orderSummary = (props) => {

  const orderSum = Object.keys(props.ingredients).map(igKey => {
    return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}:</span>{props.ingredients[igKey]}
    </li>
  }
  )
  return (
    <div>
      <h3>Your Order</h3>
      <p>Your Delicious Ice cream with the following flavours</p>
      <ul>
        {orderSum}
      </ul>

      <p style={{ margin: '10px' }}><strong>Total price: $ {props.price.toFixed(2)}</strong></p>

      <p>Continue to checkout?</p>

      <Button btnType="Success" clicked={props.proceed}>CONTINUE</Button>
      <Button btnType="Danger" clicked={props.close}>CANCEL</Button>

    </div>
  )
}
export default orderSummary;