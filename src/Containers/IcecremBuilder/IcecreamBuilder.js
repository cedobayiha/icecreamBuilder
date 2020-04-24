import React, { Component } from 'react';
import IceCream from '../../Components/IceCream/IceCream';
import Controls from '../../Components/IceCream/Controls/Controls';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';


let prices = {
  mango: 2.50,
  vanilla: 1.80,
  mint: 2.50,
  strawberry: 2.10,
  chocolate: 2.25
}

class IcecreamBuilder extends Component {
  state = {
    ingredients: null,
    price: 2.00
  }

  componentDidMount() {
    axios.get('https://icecream-3aa92.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data })
      })
  }

  addIngredientsHandler = (type) => {
    console.log(this.state.ingredients[type])
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = newCount;
    const priceAddition = prices[type];
    const oldPrice = this.state.price;
    const newPrice = priceAddition + oldPrice;
    this.setState({
      ingredients: updatedIngredients, price: newPrice
    })
  }

  removeIngredientsHandler = (type) => {

    let oldCount = this.state.ingredients[type];
    let newCount = null;
    if (oldCount > 0) {
      newCount = oldCount - 1
    }
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    const priceSub = prices[type];
    const currentPrice = this.state.price;
    const newPrice = currentPrice - priceSub;
    this.setState({ ingredients: updatedIngredients, price: newPrice })
  }



  render() {

    let iceCream = null;
    let info = { ...this.state.ingredients };
    for (let key in info) {
      info[key] = info[key] <= 0;
    }
    if (this.state.ingredients) {
      iceCream = (
        <Aux>
          <IceCream ingredients={this.state.ingredients} />
          <Controls
            ingredients={this.state.ingredients}
            disabled={info}
            price={this.state.price}
            plusIngredients={this.addIngredientsHandler}
            minusIngredients={this.removeIngredientsHandler} />
        </Aux>
      )
    }

    return (
      <div>
        {iceCream}
      </div>
    )
  }
}

export default IcecreamBuilder