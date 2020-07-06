import React, { Component } from 'react';
import IceCream from '../../Components/IceCream/IceCream';
import Controls from '../../Components/IceCream/Controls/Controls';
import Spinner from '../../Components/UI/Spinner/Spinner'

import Aux from '../../hoc/Aux/Aux';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';


import * as icecreamActions from '../../store/actions/index';

import { connect } from 'react-redux';


class IcecreamBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngrdients()

  }


  updatePurchaseHandler = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, i) => {
      return sum + i;
    }, 0);
    if (sum === 3) {
      return true
    }

  }

  updateOrderBtnHandler = ingredients => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, i) => {
      return sum + i;
    }, 0);
    return sum > 0;
  }


  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true })
    } else {
      this.props.onSetRedirectPath('/checkout')
      this.props.history.push('/auth')
    }

  }

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false })
  }

  proceedHandler = () => {
    // console.log(this.props.history)
    // let queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push("price=" + this.state.price.toFixed(2))
    // const queryString = queryParams.join('&')
    this.props.onInitPurchase();
    this.props.history.push('/checkout')
  }


  render() {
    let orderOrSpinner = null;
    let iceCream = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    let info = { ...this.props.ings };

    for (let key in info) {
      info[key] = info[key] <= 0;
    }
    if (this.props.ings) {
      iceCream = (
        <Aux>
          <IceCream ingredients={this.props.ings} />
          <Controls
            isAuth={this.props.isAuth}
            ingredients={this.props.ings}
            disabled={info}
            price={this.props.price}
            plusIngredients={this.props.onAddIngredients}
            minusIngredients={this.props.onRemoveIngredients}
            purchasing={this.state.purchasing}
            noMas={this.updatePurchaseHandler(this.props.ings)
              // this.state.noMas
            }
            odrBtn={this.updateOrderBtnHandler(this.props.ings)}
            purchase={this.purchaseHandler}
          />
        </Aux>
      )
      orderOrSpinner = <OrderSummary price={this.props.price} ingredients={this.props.ings} close={this.cancelPurchaseHandler} proceed={this.proceedHandler} />
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

const mapStateToProps = state => {
  return {
    ings: state.icecreamBuilder.ingredients,
    price: state.icecreamBuilder.totalPrice,
    error: state.icecreamBuilder.error,
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: (ingName) => dispatch(icecreamActions.addIngredient(ingName)),
    onRemoveIngredients: (ingName) => dispatch(icecreamActions.removeIngredient(ingName)),
    onInitIngrdients: () => dispatch(icecreamActions.initIngredients()),
    onInitPurchase: () => dispatch(icecreamActions.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(icecreamActions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IcecreamBuilder)

