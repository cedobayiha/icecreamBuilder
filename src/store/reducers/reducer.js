import * as actionType from '../actions/action';

const initialState = {
  ingredients: {
    chocolate: 0,
    mango: 0,
    mint: 0,
    strawberry: 0,
    vanilla: 0
  },
  totalPrice: 3,
  noMas: false,


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
        totalPrice: state.totalPrice + prices[action.ingredientsName]
      }
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: { ...state.ingredients, [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1 },
        totalPrice: state.totalPrice - prices[action.ingredientsName]
      }
    default:
      return state
  }
}

export default reducer;