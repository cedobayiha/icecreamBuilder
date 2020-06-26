import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  bought: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        bought: false
      }
    case actionTypes.PURCHASE_ICECREAM_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_ICECREAM_SUCCESS:
      const freshOrder = {
        ...action.orderInfo,
        id: action.orderId
      }
      return {
        ...state,
        loading: false,
        bought: true,
        orders: state.orders.concat(freshOrder)
      };
    case actionTypes.PURCHASE_ICECREAM_FAIL:
      return {
        ...state,
        loading: false,

      };
    default:
      return state;
  }
}

export default reducer;

