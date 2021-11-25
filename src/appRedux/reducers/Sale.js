import {ADD_TO_CART, ADD_TO_CART_QUANTITY, INCREMENT, DECREMENT, REMOVE,EMPTY} from '../actions/SaleActions'


const initState = {
  addedItems: [],
  total: 0,
  totalItems:0

}
const sale = (state = initState, action) => {

  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    const addedItem = {
      'id': action.payload.id,
      'name': action.payload.name,
      'cost_price': action.payload.cost_price,
      // 'image': action.payload.images[0] && action.payload.images[0].path
    }
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(item => action.payload.id === item.id)
    if (existed_item) {
      existed_item.quantity += 1
      return {
        ...state,
        total: state.total + addedItem.cost_price,
        totalItems: state.totalItems+1
      }
    } else {
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.cost_price

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
        totalItems: state.totalItems+1
      }

    }
  } else if (action.type === ADD_TO_CART_QUANTITY) {
    const addedItem = {
      'id': action.payload.id,
      'name': action.payload.name,
      'cost_price': action.payload.cost_price,
      // 'image': action.payload.images[0] && action.payload.images[0].path
    }
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(item => action.payload.id === item.id)
    if (existed_item) {
      existed_item.quantity += action.quantity
      return {
        ...state,
        total: state.total + (addedItem.cost_price * action.quantity),
        totalItems: state.totalItems+action.quantity
      }
    } else {
      addedItem.quantity = action.quantity;
      //calculating the total
      let newTotal = state.total + (addedItem.cost_price * action.quantity)

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
        totalItems: state.totalItems+action.quantity
      }

    }
  } else if (action.type === INCREMENT) {
    let existed_item = state.addedItems.find(item => action.id === item.id)
    existed_item.quantity += 1
    return {
      ...state,
      total: state.total + existed_item.price,
      totalItems: state.totalItems+1
    }
  } else if (action.type === DECREMENT) {
    let existed_item = state.addedItems.find(item => action.id === item.id)
    existed_item.quantity -= 1
    return {
      ...state,
      total: state.total - existed_item.cost_price,
      totalItems: state.totalItems-1
    }
  } else if (action.type === REMOVE) {
    let existed_item = state.addedItems.find(item => action.id === item.id)
    let quantity=existed_item.quantity
    let cost_price=existed_item.cost_price
    let totalPrice=cost_price*quantity
    const updatedArray=state.addedItems.filter(item=> action.id!==item.id)
    return {
      ...state,
      addedItems: updatedArray,
      total: state.total-totalPrice,
      totalItems: state.totalItems-quantity
    }
  } else if (action.type === EMPTY) {
    return {
      ...state,
      addedItems: [],
      total: 0,
      totalItems: 0
    }
  } else {
    return state
  }
}

export default sale
