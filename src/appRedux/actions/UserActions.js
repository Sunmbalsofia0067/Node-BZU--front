import axios from "axios";
import {React} from "react";

export const STORE_USERS = "STORE_USERS"

export const storeUsers = (key)=>{
  console.log(key)
  return dispatch=>{
    axios.get("/users/findByEmail/"+key).then(response=>{
        let user= response.data
        let users = {
          name: user.fullName,
          key: user.id,
          address: user.address,
          phoneNo: user.phoneNo,
          father_name: user.father_name,
          father_phone: user.father_phone,
          registration_no: user.registration_no,
          role_no: user.role_no,
          country: user.country,
          state: user.state,
          email: user.email,
        }
        return{
          type:"STORE_USERS",
          value:users
        }

      }
    ).catch(err=>{
      console.log(err)
    })
  }
}
// export const saveUser = (res) => {
//   console.log(res)
//   return {
//     type: 'STORE_USERS',
//     value: res
//   }
// }



