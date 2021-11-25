import React, {useEffect, useState} from "react";
import axios from "axios";
import {  BarChartOutlined,UserOutlined,PoweroffOutlined,CreditCardOutlined,PropertySafetyFilled} from "@ant-design/icons";
import {Table,Card,Dropdown,Menu, Button, Space, message,Input, Col, Row} from 'antd';
import Popconfirm from "antd/es/popconfirm";
import {Link} from "react-router-dom";
import Highlighter from 'react-highlight-words';
import {useSelector,useDispatch} from "react-redux";
import {logout} from "../../../appRedux/actions";
import {connect} from "react-redux";
import CardBox from "../../../components/CardBox";
import {saveUser, storeUsers} from "../../../appRedux/actions/UserActions"
import Uploader from "../../../components/Uploader/uploader";
const {Column} = Table;

const RegistrationCard = (props) => {
  const dispatch = useDispatch()
  const {auth} = useSelector(({auth}) => auth);
  console.log(auth)
  const [data , setData] = useState([])
  const myStyle = {
    // color: "white",
    // backgroundColor: "DodgerBlue",
    borderRadius:"10px",
    width: "150px",
    height:"100px",
  };
  useEffect(() => {
    axios.get("/users/findByEmail/" + auth.email).then(response => {
        let user = response.data
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
          image:user.image
        }
        console.log(users)
        setData(users)
      }
    ).catch(err => {
      console.log(err)
    })
  },[])
  const logOut =(a)=>{
    dispatch(logout(a))
  }
  return (
    <>
      <div>
        <Row>
          <Col md={4}>
            <h3>BZU</h3>
          </Col>
          <Col md={16}>
            <Link to={"/currentUser"}>
              <Button type="primary" icon={<UserOutlined/>} size="medium">
                Profile
              </Button>
            </Link>
            <Link to={"/fees"}>
              <Button type="default" icon={<PropertySafetyFilled/>} size="medium">
                Fee
              </Button>
            </Link>
            <Link to={"/registrationCard"}>
              <Button type="ghost" icon={<CreditCardOutlined/>} size="medium">
                Registration Card
              </Button>
            </Link>
            <Link to={"/resultCard"}>
              <Button type="dashed" icon={<BarChartOutlined/>} size="medium">
                Result Card
              </Button>
            </Link>
            <Button type="danger" size="medium" icon={<PoweroffOutlined/>} onClick={(a) => logOut(a)}>
              Logout
            </Button>
          </Col>
          <Col md={2}>
            <img style={myStyle} src={process.env.REACT_APP_BASE_IMAGE_PATH + data.image} alt="user"/>
          </Col>
        </Row>
      </div>
      <div className="site-card-wrapper">
        <Card title={`${auth.fullName} Information`} bordered={false}>
          <div>
            <Row>
              <Col md={20}>
                {data.registration_no?<p>Registration no : </p>:""}
                <p>Full Name : </p>
                <p>Fathers Name : </p>
                <p>Country : </p>
                <p>Phone No : </p>
                <p>Email : </p>
              </Col>
              <Col md={4}>
                {data.registration_no?<p>{data.registration_no}</p>:""}
                <p>{data.father_name}</p>
                <p>{data.name}</p>
                <p>{data.country}</p>
                <p>{data.phoneNo}</p>
                <p>{data.email}</p>
              </Col>
            </Row>
          </div>
        </Card>
      </div>

      {JSON.stringify(data)}
    </>
  )

}
export default RegistrationCard
