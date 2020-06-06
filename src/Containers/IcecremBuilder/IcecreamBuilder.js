import React, { Component } from 'react';
import IceCream from '../../Components/IceCream/IceCream';
import Controls from '../../Components/IceCream/Controls/Controls';
// import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import * as actionType from '../../store/actions/action';
import { connect } from 'react-redux';


// let prices = {
//   mango: 2.50,
//   vanilla: 1.80,
//   mint: 2.50,
//   strawberry: 2.10,
//   chocolate: 2.25
// }

class IcecreamBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    // axios.get('https://icecream-3aa92.firebaseio.com/ingredients.json')
    //   .then(res => {
    //     this.setState({ ingredients: res.data })
    //   })
  }


  //if (sum >= 1) {
  //return false
  // this.setState({ orderBtn: false })
  //}
  //if (sum === 0) {
  //return true
  // this.setState({ orderBtn: true })
  //}




  // addIngredientsHandler = (type) => {

  //   const oldCount = this.state.ingredients[type];
  //   const newCount = oldCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients }
  //   updatedIngredients[type] = newCount;
  //   const priceAddition = prices[type];
  //   const oldPrice = this.state.price;
  //   const newPrice = priceAddition + oldPrice;
  //   this.setState({
  //     ingredients: updatedIngredients, price: newPrice
  //   })
  //   this.updatePurchaseHandler(updatedIngredients);
  // }

  // removeIngredientsHandler = (type) => {

  //   let oldCount = this.state.ingredients[type];
  //   let newCount = null;
  //   if (oldCount > 0) {
  //     newCount = oldCount - 1
  //   }
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = newCount;
  //   const priceSub = prices[type];
  //   const currentPrice = this.state.price;
  //   const newPrice = currentPrice - priceSub;
  //   this.setState({ ingredients: updatedIngredients, price: newPrice })
  //   this.updatePurchaseHandler(updatedIngredients);
  // }

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
    this.setState({ purchasing: true })
  }

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false })
  }

  proceedHandler = () => {
    // console.log(this.props.history)
    let queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push("price=" + this.state.price.toFixed(2))
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString

    })
  }


  render() {
    let orderOrSpinner = null;
    let iceCream = null;
    let info = { ...this.props.ings };
    for (let key in info) {
      info[key] = info[key] <= 0;
    }
    if (this.props.ings) {
      iceCream = (
        <Aux>
          <IceCream ingredients={this.props.ings} />
          <Controls
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
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: (ingName) => dispatch({
      type: actionType.ADD_INGREDIENT, ingredientsName: ingName
    }),
    onRemoveIngredients: (ingName) => dispatch({
      type: actionType.REMOVE_INGREDIENT, ingredientsName: ingName
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IcecreamBuilder)