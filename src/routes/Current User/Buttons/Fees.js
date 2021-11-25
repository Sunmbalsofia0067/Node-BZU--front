import React, {useEffect, useState} from "react";
import axios from "axios";
import {  BarChartOutlined,UserOutlined,DownloadOutlined,PoweroffOutlined,CreditCardOutlined,PropertySafetyFilled} from "@ant-design/icons";
import {Table,Card,Dropdown,Menu, Button, Space, message,Input, Col, Row} from 'antd';
import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {logout} from "../../../appRedux/actions";
import Uploader from "../../../components/Uploader/uploader";

const Fees = (props) => {
  const dispatch = useDispatch()
  const {auth} = useSelector(({auth}) => auth);
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
      console.log(user)
        let users = {
          course:user.Courses.map(course=>(
              <Col md={12}>
                    <span><Card title={course.name}>
                      <Row>
                        <Col md={18}>
                          <p>Course Code :</p>
                          <p>Course Fees :</p>
                        </Col>
                        <Col md={6}>
                          <p>{course.course_code}</p>
                          <p>{course.fee}</p>
                        </Col>
                      </Row>
                    </Card></span>
              </Col>
            )
          ),
          fees:user.Courses.map(course=>{
            let arr =[]

            // let a = course.fee
            // let sum = (a).reduce((x,y)=>x+y);
            // console.log(sum)

          }),
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
      {/*{auth.role===2?"":*/}
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
            <Link to={"/importantDownloads"}>
              <Button type="primary" icon={<DownloadOutlined/>} size="medium">
                Downloads
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
      {/*}*/}
      <div className="site-card-wrapper">
        <div><Row>{data.course}</Row></div>
      </div>
    </>
  )

}
export default Fees
