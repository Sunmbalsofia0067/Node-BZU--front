
import {React} from "react";

export const ADD_TO_CART = 'ADD_TO_CART'
export const ADD_TO_CART_QUANTITY = 'ADD_TO_CART_QUANTITY'
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const REMOVE = 'REMOVE'
export const EMPTY = 'EMPTY'
export const addToCart = (res) => {
  return {
    type: 'ADD_TO_CART',
    payload: res
  }
}
export const addToCartQuantity = (res,quantity) => {
  return {
    type: 'ADD_TO_CART_QUANTITY',
    payload: res,
    quantity:quantity
  }
}

export const increment = (res) => {
  return {
    type: 'INCREMENT',
    id: res,
  }
}
export const decrement = (res) => {
  return {
    type: 'DECREMENT',
    id: res,
  }
}
export const remove = (res) => {
  return {
    type: 'REMOVE',
    id: res,
  }
}
export const empty = () => {
  return {
    type: 'EMPTY',
  }
}
