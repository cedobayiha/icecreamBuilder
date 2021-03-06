import * as actionTypes from './actionTypes';
import axios from 'axios'

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientsName: name
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientsName: name
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://icecream-3aa92.firebaseio.com/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data))

      })
      .catch(error => {
        dispatch(fetchIngredientsFailed())
      });
  }
}