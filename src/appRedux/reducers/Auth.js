import * as actionTypes from '../actions/Auth'

const initialState = {
  auth: {},
  isAuthenticated: false,
  // modules: {},
}
const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_AUTH:
      return {
        ...state,
        auth: action.value,
        // modules: action.value.user.role.modules,
        isAuthenticated: true
      }
    case actionTypes.LOGOUT:
      console.log("a")
      return {
        ...state,
        auth: {},
        // modules: {},
        isAuthenticated: false
      }
      case actionTypes.STORE_COURSE_AUTH:

        let newAuth = state.auth
      return {
        ...state,
        auth:newAuth,
        // modules: {},
        isAuthenticated: true
      }
  }
  return state
}
export default auth
