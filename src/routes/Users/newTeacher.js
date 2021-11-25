import React, {useEffect, useState, useMemo} from 'react';
import {Form, Input, Space, Cascader, Select, Row, Col, Upload, message, Checkbox, Button, AutoComplete} from 'antd';
import axios from "axios";
import {Link, useHistory} from "react-router-dom"
import Uploader from "../../components/Uploader/uploader"
import CardBox from "../../components/CardBox";
import countryList from 'react-select-country-list'


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
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
      offset: 8,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const NewUserTeacher = (props) => {


  const [course_id, setCourse_id] = useState('')
  const [allCourses, setAllCourses] = useState([])
  const [form] = Form.useForm();
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const [stateVal, setState] = useState('')


  const saveImage = (image) => {
    console.log(image)
    setFile(image)
  }

  useEffect(() => {
    axios.get("courses/").then(response => {
      console.log(response)
      const courses = response.data.map((row) => ({
        value: row.id,
        label: row.name
      }))
      setAllCourses(courses)
    }).catch(error => {
      console.log(error)
    })
  }, [])


  let history = useHistory()

  const onFinish = (values) => {
    let user = new FormData();
    user.append("file", file)
    user.append("phoneNo", "+92"+values.phoneNo)
    user.append("fullName", values.fullName)
    user.append("email", values.email)
    user.append("address", values.address)
    user.append("password", values.password)
    user.append("role_id", "2")
    user.append("country", value)
    user.append("state", stateVal)
    user.append("religion", values.religion)
    user.append("father_name", values.father_name)
    user.append("course_id", course_id)
    console.log(values)
    console.log(user)
    setLoading(true)
    axios.post('users', user, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response)
      message.success('Student added successfully.');
      history.push("/user")
      setLoading(false)
    })
      .catch(error => {
        console.log(error)
        setLoading(false)

      })
  };


  const stateOptions=[
    {label:"Punjab",value:"Punjab"},
    {label:"Sindh",value:"Sindh"},
    {label:"Balochistan",value:"Balochistan"},
    {label:"KPK",value:"KPK"},
  ]
  const options = useMemo(() => countryList().getData(), [])
  const changeHandler = value => {
    setValue(value)
  }

  const stateHandler =(event)=>{
    setState(event)
  }

  const courseHandler = (event)=>{
    setCourse_id(event)
  }

  return (
    <>
      <CardBox><h1>Please Create Teacher</h1></CardBox>
      <Form
        {...formItemLayout}
        form={form}
        encType="multipart/form-data"
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
          name="phoneNo"
          label="Phone Number"
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
        <Form.Item
          name="address"
          label="Address"
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
          name="father_name"
          label="Father Name"
          rules={[
            {
              required: true,
              message: 'Please enter Your Father Name!',
            }
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="religion"
          label="Religion"
          rules={[
            {
              required: true,
              message: 'Please enter Your Religion #!',
            }
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[
            {
              required: true,
              message: 'Please enter Your Country!',
            }
          ]}
        >
          <Space
            direction="vertical"
            style={{
              width: '50%',
            }}
          >
            <Select
              showSearch
              value={value}
              options={options}
              onChange={changeHandler}
              placeholder="please select the your Country no"
              filterOption={(input, option) =>
                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Space>
        </Form.Item>
        <Form.Item label="State"
        >
          <Space
            direction="vertical"
            style={{
              width: '50%',
            }}
          >
            <Select
              showSearch
              value={stateVal}
              options={stateOptions}
              onChange={stateHandler}
              placeholder="please select the your state no"
              filterOption={(input, option) =>
                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Space>
        </Form.Item>

        <Form.Item label="Courses">
          <Space
            direction="vertical"
            style={{
              width: '50%',
            }}
          >
            <Select
              showSearch
              value={course_id}
              options={allCourses}
              onChange={e=>courseHandler(e)}
              placeholder="please select the Course"
              filterOption={(input, option) =>
                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Space>
        </Form.Item>

        <Form.Item label="Upload Image"> <Uploader
          value={file} saveImage={saveImage}/>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            loading={loading}
            type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};


export default NewUserTeacher;
