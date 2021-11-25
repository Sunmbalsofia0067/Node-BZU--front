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

const NewUser = (props) => {

  const [program_id, setProgram_id] = useState('')
  const [allPrograms, setAllPrograms] = useState([])
  const [course_id, setCourse_id] = useState('')
  const [allCourses, setAllCourses] = useState([])
  const [form] = Form.useForm();
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false)
  const [semesterVal, setSemesterVal] = useState("")
  const [value, setValue] = useState('')
  const [stateVal, setState] = useState('')
  const [group, setGroup] = useState('')


  const saveImage = (image) => {
    console.log(image)
    setFile(image)
  }

  useEffect(() => {
    axios.get("programs/").then(response => {
      console.log(response)
      const programs = response.data.map((row) => ({
        value: row.id,
        label: row.name
      }))
      setAllPrograms(programs)
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
    user.append("role_id", "3")
    user.append("program_id", program_id)
    user.append("country", value)
    user.append("state", stateVal)
    user.append("religion", values.religion)
    user.append("group", group)
    user.append("father_name", values.father_name)
    user.append("father_phone", "+92"+values.father_phone)
    user.append("semester", semesterVal)
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
  const semesterOptions=[
    {label:1,value:1},
    {label:2,value:2},
    {label:3,value:3},
    {label:4,value:4},
    {label:5,value:5},
    {label:6,value:6},
    {label:7,value:7},
    {label:8,value:8},
  ]
  const groupOptions =[
    {label:"Morning",value:"Morning"},
    {label:"Evening",value:"Evening"},
  ]
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
  const semesterHandler=(event)=>{
    setSemesterVal(event)
  }
  const stateHandler =(event)=>{
    setState(event)
  }
  const groupHandler =(event)=>{
    setGroup(event)
  }
  const courseHandler = (event)=>{
    setCourse_id(event)
  }
  const programHandler =(event)=>{
    setProgram_id(event)
    axios.get("courses/courseByProgram/"+event).then(response => {
      console.log(response)
      const courses = response.data.map((row) => ({
        value: row.id,
        label: row.name
      }))
      setAllCourses(courses)
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <>
      <CardBox><h1>Please Create Student</h1></CardBox>
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
          name="father_phone"
          label="Father Phone #"
          rules={[
            {
              required: true,
              message: 'Please enter Your Father Phone #!',
            }
          ]}
        >
          <Input
            addonBefore="+92"
            style={{
              width: '100%',
            }}/>
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

        <Form.Item
          name="group"
          label="Group"
        >
          <Space
            direction="vertical"
            style={{
              width: '50%',
            }}
          >
            <Select
              showSearch
              value={group}
              options={groupOptions}
              onChange={groupHandler}
              placeholder="please select the your state no"
              filterOption={(input, option) =>
                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Space>
        </Form.Item>

        <Form.Item label="Semester">
          <Space
            direction="vertical"
            style={{
              width: '50%',
            }}
          >
            <Select
              showSearch
              value={semesterVal}
              options={semesterOptions}
              onChange={e=>semesterHandler(e)}
              placeholder="please select the your semester no"
              filterOption={(input, option) =>
                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Space>
        </Form.Item>
        <Form.Item label="Programs">
          <Space
            direction="vertical"
            style={{
              width: '50%',
            }}
          >
            <Select
              showSearch
              value={program_id}
              options={allPrograms}
              onChange={e=>programHandler(e)}
              placeholder="please select the Program"
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
              mode="multiple"
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


export default NewUser;
