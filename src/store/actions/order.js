import * as actionTypes from './actionTypes';
import axios from 'axios';

export const purchaseIcecreamSuccess = (id, orderInfo) => {
  return {
    type: actionTypes.PURCHASE_ICECREAM_SUCCESS,
    orderId: id,
    orderInfo: orderInfo
  }
}

export const purchaseIcecreamFail = (error) => {
  return {
    type: actionTypes.PURCHASE_ICECREAM_FAIL,
    error: error
  }
}

export const purchaseIcecreamStart = () => {
  return {
    type: actionTypes.PURCHASE_ICECREAM_START
  };
}

export const purchaseIcecream = (orderInfo) => {
  return dispatch => {
    dispatch(purchaseIcecreamStart());
    axios.post('https://icecream-3aa92.firebaseio.com/orders.json', orderInfo)
      .then(res => {
        console.log(res.data)
        dispatch(purchaseIcecreamSuccess(res.data.name, orderInfo))
      })
      .catch(error => {
        dispatch(purchaseIcecreamFail(error))
      })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }

}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error

  }
}

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrderStart())
    axios.get('https://icecream-3aa92.firebaseio.com/orders.json')
      .then(res => {
        const receivedInfo = [];
        for (let key in res.data) {
          receivedInfo.push({ ...res.data[key], id: key })
        }
        dispatch(fetchOrdersSuccess(receivedInfo))
        // this.setState({ orders: receivedInfo, loading: false })
      }).catch(error => {
        dispatch(fetchOrdersFail(error))
        // this.setState({ loading: false })
      })
  }
}