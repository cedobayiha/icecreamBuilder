import React, { Component } from 'react';
// import styles from '../../Components/IceCream/IceCream.module.css';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
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


    return (
      <div>
        <CheckoutSummary ingredients={this.props.ings}
          cancel={this.checkoutCancel}
          proceed={this.checkoutProceed}

        />
        <Route path={this.props.match.path + '/contact-info'} component={ContactInfo} />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);

