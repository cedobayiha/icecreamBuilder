import React, { Component } from 'react';
import IceCream from '../../Components/IceCream/IceCream';
import Controls from '../../Components/IceCream/Controls/Controls';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';


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
    price: 2.00,
    noMas: false,
    orderBtn: true,
    purchasing: false
  }

  componentDidMount() {
    axios.get('https://icecream-3aa92.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data })
      })
  }

  updatePurchaseHandler = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, i) => {
      return sum + i;
    }, 0);
    if (sum === 3) {
      this.setState({ noMas: true })
    } if (sum < 3) {
      this.setState({ noMas: false })
    }
    if (sum >= 1) {
      this.setState({ orderBtn: false })
    }
    if (sum === 0) {
      this.setState({ orderBtn: true })
    }
  }

  addIngredientsHandler = (type) => {

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
    this.updatePurchaseHandler(updatedIngredients);
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
    this.updatePurchaseHandler(updatedIngredients);
  }


  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false })
  }

  proceedHandler = () => {
    console.log(this.props.history)
    this.props.history.push({
      pathname: '/checkout'

    })
  }


  render() {
    let orderOrSpinner = null;
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
            minusIngredients={this.removeIngredientsHandler}
            purchase={this.state.purchasable}
            noMas={this.state.noMas}
            odrBtn={this.state.orderBtn}
            purchase={this.purchaseHandler}
          />
        </Aux>
      )
      orderOrSpinner = <OrderSummary price={this.state.price} ingredients={this.state.ingredients} close={this.cancelPurchaseHandler} proceed={this.proceedHandler} />
    }

    return (
      <div>
        <Modal modalClosed={this.cancelPurchaseHandler} show={this.state.purchasing}>
          {orderOrSpinner}
        </Modal>
        {iceCream}
      </div>
    )
  }
}

export default IcecreamBuilder