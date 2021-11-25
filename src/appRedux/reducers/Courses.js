import * as actionTypes from '../actions/CoursesActions'

const initialState = {
  Courses: [],
}
const Courses = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_COURSES:
      return {
        ...state,
        Courses: action.value
      }
  }

  return state
}
export default Courses
