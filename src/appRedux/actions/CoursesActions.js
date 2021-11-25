import axios from "axios";
import {React} from "react";

export const STORE_COURSES = 'STORE_COURSES'
export const saveCourses = (res) => {
  return {
    type: 'STORE_COURSES',
    value: res
  }
}

export const storeCourses = () => {
  return dispatch => {
    axios.get('courses')
      .then(response => {
        console.log(response)
        const results = response.data.map(row => ({
          key: row.id, // I added this line
          name: row.name,
          fee:row.fee
        }))
        dispatch(saveCourses(results))

      })
  }
}
