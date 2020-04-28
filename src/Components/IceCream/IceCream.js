import React from 'react';
import IcecreamIngredients from './IcecreamIngredients/IcecreamIngredients';
import Aux from '../../hoc/Aux/Aux';
import styles from './IceCream.module.css';


const iceCream = (props) => {

  let changedIngredients = Object.keys(props.ingredients).map(ingKey => {

    return [...Array(props.ingredients[ingKey])].map((_, i) => {

      return <IcecreamIngredients type={ingKey} key={ingKey + i} />
    })

  })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if (changedIngredients.length === 0) {
    changedIngredients = <h3>Please add a maximum of 3 ice cream flavours!</h3>
  }


  return (
    <Aux >
      <div className={styles.Contain}>
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


export default iceCream;