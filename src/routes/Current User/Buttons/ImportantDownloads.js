import React, {useEffect, useState} from "react";
// import { downloadFile } from 'react-file-downloader'
// import JsFileDownloader from 'js-file-downloader';
import download from 'download-pdf'
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
var fileDownload = require('js-file-download')
const ImportantDownloads = (props) => {
  const dispatch = useDispatch()
  const {auth} = useSelector(({auth}) => auth);
  const [data , setData] = useState([])
  const [file , setFile]= useState("")
  const myStyle = {
    // color: "white",
    // backgroundColor: "DodgerBlue",
    borderRadius:"10px",
    height:"100px",
  };
  useEffect(()=>{
    axios.get("courses/findAllCourseUser/"+2).then(
      response=>{
        console.log(response)
        let course = response.data[0].file
        setFile(course)
      }
    ).catch(err=>{
      console.log(err)
    })
  },[])
  useEffect(() => {
    axios.get("/users/findByEmail/" + auth.email).then(response => {
      console.log(response)
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
        setData(users)
      }
    ).catch(err => {
      console.log(err)
    })
  },[])
  const logOut =(a)=>{
    dispatch(logout(a))
  }
  // const fileUrl = process.env.REACT_APP_BASE_IMAGE_PATH;



  const downloads=()=>{
    alert("A")
    var pdf = process.env.REACT_APP_BASE_IMAGE_PATH+file
    // var options = {
    //   directory: "C:\\ProjectOfReact\\startapp-jwt",
    //   filename: data.image
    // }
    // console.log(options)
    download(pdf, function(err){
      if (err) throw err
      console.log("meow")
    })
    // new JsFileDownloader({
    //   url: fileUrl+ file,
    // }).then(function () {
    //     console.log("success")
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   });
    // downloadFile(process.env.REACT_APP_BASE_IMAGE_PATH+data.image, 'test.png')
    // fileDownload(data.image, process.env.REACT_APP_BASE_IMAGE_PATH+data.image)
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
      <Card style={{textAlign:"center"}}><h2>All Important Downloads</h2></Card>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Merit List"onClick={e=>{downloads(e)}} bordered={false}>

              Merit List
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Admission Form" bordered={false}>
              Admission Form <img style={myStyle} src={process.env.REACT_APP_BASE_IMAGE_PATH + data.image} alt="user"/>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Scholarship" bordered={false}>
              Scholarship Forms <img style={myStyle} src={process.env.REACT_APP_BASE_IMAGE_PATH + data.image} alt="user"/>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Prospectus" bordered={false}>
              Prospectus <img style={myStyle} src={process.env.REACT_APP_BASE_IMAGE_PATH + data.image} alt="user"/>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Academic Calender" bordered={false}>
              Academic Calender <img style={myStyle} src={process.env.REACT_APP_BASE_IMAGE_PATH + data.image} alt="user"/>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Student Schedule" bordered={false}>
              Student Schedule <img style={myStyle} src={process.env.REACT_APP_BASE_IMAGE_PATH + data.image} alt="user"/>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )

}
export default ImportantDownloads
