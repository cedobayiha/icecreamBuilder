import * as actionType from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 3,
  error: false,
  building: false
}

const prices = {
  mango: 2.50,
  vanilla: 1.80,
  mint: 2.50,
  strawberry: 2.10,
  chocolate: 2.25
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1
        },
        totalPrice: state.totalPrice + prices[action.ingredientsName],
        building: true
      }
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: { ...state.ingredients, [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1 },
        totalPrice: state.totalPrice - prices[action.ingredientsName],
        building: true
      };
    case actionType.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 3,
        building: false
      };
    case actionType.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}

export default reducer;