import React from "react";
import {useDispatch} from "react-redux";
import {Avatar, Popover} from "antd";
import {logout} from "../../appRedux/actions";

const UserInfo = () => {

  const dispatch = useDispatch();

  const logoutkero = ()=>{
    console.log('logout kia ha')
    dispatch(logout)
  }
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      <li onClick={()=>logoutkero}>Logout
      </li>
    </ul>
  );

  return (
    <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions} trigger="click">
      <Avatar src={"https://via.placeholder.com/150"} className="gx-avatar gx-pointer" alt=""/>
    </Popover>
  );
};

export default UserInfo;
