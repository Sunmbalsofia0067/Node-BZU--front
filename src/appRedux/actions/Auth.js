
import {React} from "react";

export const STORE_AUTH = 'STORE_AUTH'
export const LOGOUT = 'LOGOUT'
export const saveLoginData = (res) => {
  return {
    type: 'STORE_AUTH',
    value: res
  }
}
export const STORE_COURSE_AUTH = 'STORE_COURSE_AUTH'
export const storeCourseAuth=(res)=>{
  return{
    type:'STORE_COURSE_AUTH',
    value:res
  }
}
export const logout=(res)=>{
  console.log(res)
  return{
    type:'LOGOUT',
    value:res
  }
}
