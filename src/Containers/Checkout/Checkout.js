import React, { Component } from 'react';
import IcecreamIngredients from '../../Components/IceCream/IcecreamIngredients/IcecreamIngredients';
import Aux from '../../hoc/Aux/Aux';
import styles from '../../Components/IceCream/IceCream.module.css';

class Checkout extends Component {

  render() {
    let changedIngredients = Object.keys(this.props.location.ingredients).map((ingKey, i) => {
      return [...Array(this.props.ingredients[ingKey])].map((_, i) => {
        return <IcecreamIngredients type={ingKey} key={ingKey + i} />
      })
    })
      .reduce((arr, el) => {
        return arr.concat(el)
      }, []);
    return (
      <Aux>
        <div className={styles.Contain}>
          <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>We hope it Taste Amazing!</h1>
          <div className={styles.Wrapper}>
            <div className={styles.FullSundae}>
              <IcecreamIngredients type="cream" />
              {changedIngredients}
              <IcecreamIngredients type="cone" />
            </div>
          </div>
        </div>
      </Aux>
    )
  }

}

export default Checkout


