import axios from "axios";
import {React} from "react";

export const STORE_PROGRAMS = 'STORE_PROGRAMS'
export const STORE_USERS = "STORE_USERS"
export const savePrograms = (res) => {
  return {
    type: 'STORE_PROGRAMS',
    value: res
  }
}

export const storePrograms = () => {
  return dispatch => {
    axios.get('programs')
      .then(response => {
        console.log(response)
        const results = response.data.map(row => ({
          key: row.id, // I added this line
          name: row.name,
          duration:row.duration,
          totalSubjects:row.totalSubjects
        }))
        dispatch(savePrograms(results))

      })
  }

}
export const storeUsers = (key)=>{
  return dispatch=>{
    axios.get("users/programid/"+key).then(response=> {
      let users = response.data.map(row=>({
        name: row.fullName,
        key:row.id,
        address:row.address,
        phoneNo:row.phoneNo,
        image:row.image,
        father_name:row.father_name,
        father_phone:row.father_phone,
        registration_no:row.registration_no,
        role_no:row.role_no,
        country:row.country,
        state:row.state,
        email:row.email,
        semester:row.semester
      }))
      dispatch(saveUser(users))
    })
  }
}
export const saveUser = (res) => {
  return {
    type: 'STORE_USERS',
    value: res
  }
}

