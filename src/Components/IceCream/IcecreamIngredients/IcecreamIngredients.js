import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import styles from './IcecreamIngredients.module.css'

class IcecreamIngredients extends Component {

  render() {
    let ingredients

    switch (this.props.type) {
      case ('cream'):
        ingredients = (<Aux>
          <div className={styles.Queue}></div>
          <div className={styles.Cherry}></div>
          <div className={styles.Cream0}></div>
          <div className={styles.Cream1}></div>
          <div className={styles.Cream2}></div>
          <div className={styles.Cream}></div>
        </Aux>);
        break;
      case ('mango'):
        ingredients = <div className={styles.Mango}></div>;
        break;
      case ('chocolate'):
        ingredients = <div className={styles.Chocolate} ></div>;
        break;
      case ('mint'):
        ingredients = <div className={styles.Mint}></div>;
        break;
      case ('vanilla'):
        ingredients = <div className={styles.Vanilla}></div>;
        break;
      case ('strawberry'):
        ingredients = <div className={styles.Strawberry}></div>;
        break;
      case ('cone'):
        ingredients = (<Aux>
          <div className={styles.Cone}></div>
          <div className={styles.Glass}></div>
        </Aux>);
        break;
      default:
        break;
    }



    return ingredients;
  }
}

export default IcecreamIngredients;