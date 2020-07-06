import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSum';
import ContactInfo from './ContactInfo/ContactInfo';


class Checkout extends Component {


  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search)
  //   const ingredients = {}
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === 'price') {
  //       price = param[1]
  //     } else {
  //       ingredients[param[0]] = +param[1]
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, price: price })
  // }



  checkoutCancel = () => {
    this.props.history.goBack()
  }

  checkoutProceed = () => {
    this.props.history.replace('/checkout/contact-info')
  }


  render() {
    let summary = <Redirect to="/" />

    if (this.props.ings) {
      const boughtRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <Aux>
          {boughtRedirect}
          <CheckoutSummary ingredients={this.props.ings}
            cancel={this.checkoutCancel}
            proceed={this.checkoutProceed}
          />
          <Route path={this.props.match.path + '/contact-info'} component={ContactInfo} />
        </Aux>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.icecreamBuilder.ingredients,
    purchased: state.order.bought
  }
}



export default connect(mapStateToProps)(Checkout);

