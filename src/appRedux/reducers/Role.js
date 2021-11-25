import * as actionTypes from '../actions/RoleActions'

const initialState = {
  roles: [],
}
const roles = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_ROLES:
      return {
        ...state,
        roles: action.value
      }
  }

  return state
}
export default roles
