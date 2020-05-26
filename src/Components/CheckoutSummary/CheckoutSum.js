import React from 'react';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';
import IceCream from '../IceCream/IceCream';
import styles from './CheckoutSum.module.css';
import Aux from '../../hoc/Aux/Aux';

const checkoutSummary = (props) => {


  return (
    <Aux>
      <div className={styles.Contain}>
        <div className={styles.CheckoutSum}>
          <h1 style={{ textAlign: 'center', paddingTop: '30px' }}>We hope it Taste Amazing!</h1>
          <div style={{ width: '100%', margin: 'auto' }}>
            <IceCream ingredients={props.ingredients} />
          </div>

        </div>
      </div>
      <div>
        <Link to="/">
          <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
        </Link>
        <Button btnType="Success" clicked={props.proceed}>CONTINUE</Button>
      </div>
    </Aux>


  )
}

export default checkoutSummary;