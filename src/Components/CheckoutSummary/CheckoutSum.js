import React from 'react';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';
import IceCream from '../IceCream/IceCream';

const checkoutSummary = (props) => {


  return (
    <div>
      <div >
        <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>We hope it Taste Amazing!</h1>
        <div style={{ width: '100%', margin: 'auto' }}>
          <IceCream ingredients={props.ingredients} />
        </div>
        <Link to="/">
          <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
        </Link>
        <Button btnType="Success" clicked={props.proceed}>CONTINUE</Button>
      </div>


    </div>
  )
}

export default checkoutSummary;