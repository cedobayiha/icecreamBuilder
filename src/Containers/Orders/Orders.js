import React, { Component } from 'react';
import axios from 'axios';
import Order from "../../Components/Order/Order";
import styles from './Orders.module.css'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('https://icecream-3aa92.firebaseio.com/orders.json')
      .then(res => {
        const receivedInfo = [];
        for (let key in res.data) {
          receivedInfo.push({ ...res.data[key], id: key })
        }
        this.setState({ orders: receivedInfo, loading: false })
      }).catch(error => {
        this.setState({ loading: false })
      })
  }


  render() {

    return (
      <div className={styles.Orders}>
        {this.state.orders.map(order => {
          return <Order key={order.id} ing={order.ingredients}
            name={order.orderInfo.name} price={+order.price} />
        })
        }
      </div>
    )
  }
}



export default Orders;