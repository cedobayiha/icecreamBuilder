import React, { Component } from 'react';
// import IcecreamIngredients from '../../Components/IceCream/IcecreamIngredients/IcecreamIngredients';
import Aux from '../../hoc/Aux/Aux';
import styles from '../../Components/IceCream/IceCream.module.css';
import { Route } from 'react-router-dom'
// import IceCream from '../../Components/IceCream/IceCream';
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSum';
import ContactInfo from './ContactInfo/ContactInfo';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[0]
      } else {
        ingredients[param[0]] = +param[1]
      }
    }
    this.setState({ ingredients: ingredients, price: price })
  }

  checkoutCancel = () => {
    this.props.history.goBack()
  }

  checkoutProceed = () => {
    this.props.history.replace('/checkout/contact-info')
  }


  render() {

    return (
      <Aux>
        <CheckoutSummary ingredients={this.state.ingredients}
          cancel={this.checkoutCancel}
          proceed={this.checkoutProceed}
        />
        <Route path={this.props.match.path + 'contact-info'} render={(props) => <ContactInfo />} />
      </Aux>
    )
  }

}

export default Checkout

