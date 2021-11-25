import React, {useEffect, useState} from 'react';
import {Form, Input, Space,Cascader, Select, Row, Col, Upload, message, Checkbox, Button, AutoComplete} from 'antd';
import axios from "axios";
import {Link,useHistory} from "react-router-dom"
import ImgCrop from "antd-img-crop";
import Uploader from "../../components/Uploader/uploader";

const {Option} = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const EditUser = (props) => {


  var id = props.match.params.id
  useEffect(()=>{
    axios.get("users/"+id).then((response)=>{
      console.log(response)
      let userData =response.data
      form.setFieldsValue(userData)
        setFullName(userData.fullName)
        setPassword(userData.password)
        setRole_id(userData.role_id)
        setEmail(userData.email)
        setPhoneNo(userData.phoneNo)
        setAddress(userData.address)
      let path = process.env.REACT_APP_BASE_IMAGE_PATH + userData.image
      let img = {
        url: path,
      }
      setFile(img)
      console.log(img)
    }).catch(err=>{
      console.log(err)
    })
  },[])
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [role_id, setRole_id] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNo, setPhoneNo] = useState("")
  const [email, setEmail] = useState('')
  const [allRoles, setAllRoles] = useState([])
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const [loading , setLoading]=useState(false)

  const saveImage = (image)=>{
    console.log(image)
    setFile(image)
  }

  const roleHandler = (event) =>{
    setRole_id(event)
    console.log(event)
  }
  const nameHandler = (event) => {
    setFullName(event.target.value)
  }
  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }
  const addressHandler = (event) => {
    setAddress(event.target.value)
  }
  const phoneHandler = (event) => {
    setPhoneNo(event.target.value)
  }
  const emailHandler = event =>{
    setEmail(event.target.value)
  }

  useEffect(()=>{
    axios.get("roles/").then(response=>{
      console.log(response)
      const results = response.data.map((row)=>({
        value:row.id,
        label:row.name
      }))
      setAllRoles(results)
    }).catch(error=>{
      console.log(error)
    })
  },[])

  let history=useHistory()
  const postUserHandler = async () => {
    // const validate = await form.validateFields()


    let user = new FormData();
    user.append('fullName', fullName)
    user.append("password", password)
    user.append("address", address)
    user.append('email',email)
    user.append('role_id',role_id)
    user.append("phoneNo", +92 + phoneNo)
    user.append('image', file)
    axios.put('users/'+id,user,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response)
        message.success('User added successfully.');
        history.push("/user")
      })
      .catch(error => {
        console.log(error)

      })
  }
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="fullName"
        label="Full Name"
        value={fullName}
        onChange={e => {
          nameHandler(e)
        }}
        palceholder=" Please enter your Full Name"
        rules={[
          {
            required: true,
            message: 'Please input your Full Name',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        value={password}
        onChange={e => {
          passwordHandler(e)
        }}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password/>
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        onChange={e => {
          emailHandler(e)
        }}
        tooltip="What is your email?"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
            whitespace: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        value={address}
        onChange={e => {
          addressHandler(e)
        }}
        rules={[
          {
            required: true,
            message: 'Please enter Your Address!',
          }
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name="phoneNo"
        label="Phone Number"
        value={phoneNo}
        onChange={e => {
          phoneHandler(e)
        }}
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore="+92"
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
      <Form.Item label="Upload Image"> <Uploader
        value={file} saveImage={saveImage}/></Form.Item>
      <Form.Item label="Roles">
        <Space
          direction="vertical"
          style={{
            width: '50%',
          }}
        >
          <Select
            value={role_id}
            options={allRoles}
            onChange={e=>roleHandler(e)}
            placeholder="please select the Roles"
            filterOption={(input, option) =>
              option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </Space>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button
          loading={loading}
          onClick={postUserHandler}
          type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};



export default EditUser;
