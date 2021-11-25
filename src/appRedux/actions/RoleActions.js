import axios from "axios";
import {React} from "react";

export const STORE_ROLES = 'STORE_ROLES'
// export const ADD_BRAND='ADD_BRAND'
// export const EDIT_BRAND='EDIT_BRAND'
// export const DELETE_BRAND='DELETE_BRAND'
export const saveRoles = (res) => {
  return {
    type: 'STORE_ROLES',
    value: res
  }
}
// export const editBrand = (res) => {
//   return {
//     type: 'EDIT_BRAND',
//     value: res
//   }
// }
// export const deleteBrand = (res) => {
//   return {
//     type: 'DELETE_BRAND',
//     value: res
//   }
// }
//Store Collections
export const storeRoles = () => {
  return dispatch => {
    axios.get('roles')
      .then(response => {
        console.log(response)
        const results = response.data.map(row => ({
          value: row.id, // I added this line
          label: row.name,
        }))
        dispatch(saveRoles(results))

      })
  }

}
// save single brand
// export const saveBrand = (res) => {
//   return {
//     type: 'ADD_BRAND',
//     value: res
//   }
// }
//
