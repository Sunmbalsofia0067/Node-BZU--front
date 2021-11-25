import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Popover} from "antd";
import {logout} from "../../appRedux/actions";

const UserProfile = () => {
  const {auth} = useSelector(({auth}) => auth);
  const dispatch = useDispatch();
  const logOut =(a)=>{
    dispatch(logout(a))
  }
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li onClick={(a)=>logOut(a)}>Logout
      </li>
    </ul>
  );

  return (

    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
        <Avatar src='https://via.placeholder.com/150x150' className="gx-size-40 gx-pointer gx-mr-3" alt=""/>
        <span className="gx-avatar-name">{auth.fullName}__
          <i className="icon icon-close-circle"
             onClick={(a) => logOut(a)}/></span>
      </Popover>
    </div>

  )
};

export default UserProfile;
