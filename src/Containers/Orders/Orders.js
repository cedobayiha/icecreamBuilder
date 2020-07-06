import React, { Component } from 'react';
// import axios from 'axios';
import Order from "../../Components/Order/Order";
import styles from './Orders.module.css'
import { connect } from 'react-redux'
import * as fetchActions from "../../store/actions/index";
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component {


  componentDidMount() {
    this.props.onFecthOrders(this.props.token, this.props.userId)
    // axios.get('https://icecream-3aa92.firebaseio.com/orders.json')
    //   .then(res => {
    //     const receivedInfo = [];
    //     for (let key in res.data) {
    //       receivedInfo.push({ ...res.data[key], id: key })
    //     }
    //     this.setState({ orders: receivedInfo, loading: false })
    //   }).catch(error => {
    //     this.setState({ loading: false })
    //   })
  }


  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div className={styles.Orders}>
          {this.props.orders.map(order => {
            return <Order key={order.id} ing={order.ingredients}
              name={order.orderInfo.name} price={+order.price} />
          })
          }
        </div>)
    }
    return orders
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFecthOrders: (token, userId) => dispatch(fetchActions.fetchOrders(token, userId))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Orders);