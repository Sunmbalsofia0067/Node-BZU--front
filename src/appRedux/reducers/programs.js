import * as actionTypes from '../actions/ProgramActions'

const initialState = {
  programs: [],
  users:[],
}
const programs = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_PROGRAMS:
      console.log(action.value)
      return {
        ...state,
        programs: action.value
      }
    case actionTypes.STORE_USERS:
      return {
        ...state,
        users: action.value
      }
  }

  return state
}
export default programs
