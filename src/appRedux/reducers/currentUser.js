import * as actionTypes from '../actions/UserActions'

const initialState = {
  currentUser:"",
}
const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_USERS:
      return {
        ...state,
        currentUser: action.value,
      }
  }
  return state
}
export default currentUser
