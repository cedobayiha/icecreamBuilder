import React, { Component } from 'react';
// import axios from 'axios';
import Order from "../../Components/Order/Order";
import styles from './Orders.module.css'
import { connect } from 'react-redux'
import * as fetchActions from "../../store/actions/index";
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    // orders: [],
    // loading: true
  }

  componentDidMount() {
    this.props.onFecthOrders()
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
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFecthOrders: () => dispatch(fetchActions.fetchOrders())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Orders);