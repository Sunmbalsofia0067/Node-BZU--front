import React, {useEffect, useState} from 'react';
import {Form, Input, message, Button, Space, Select} from 'antd';
import axios from "axios";
import {useHistory} from "react-router-dom"
import roles from "../../appRedux/reducers/Role";
import CardBox from "../../components/CardBox";
import FileUploader from "../../components/Uploader/fileUploader";


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

const UploadResults = (props) => {

  console.log(props)
  const [form] = Form.useForm();
  const [loading , setLoading] = useState(false);
  const [file, setFile] = useState('');
  const [name, setName] = useState("")
  const [course_code, setCourse_code] = useState("")
  const [key, setKey] = useState("")

  const saveImage = (image) => {
    console.log(image)
    setFile(image)
  }

  const id = props.match.params.id
  useEffect(()=>{
    axios.get('courses/'+id).then(response=>{

      let courses = response.data
        form.setFieldsValue(courses)
        setKey(courses.id)
        setName(courses.name)
        setCourse_code(courses.course_code)
      console.log(courses)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  let history=useHistory()
  //
  const onFinish = (values) => {
    let courseUser = new FormData()
    courseUser.append("course_id",key)
    courseUser.append("file",file)
    // setLoading(true)
console.log(courseUser)
    axios.put("users/updateCourseUser/",courseUser).then(
      success=>{
        console.log(success)
        message.success('Result added successfully.');
        setLoading(false)
        history.push("/courses")
      }
    ).catch(err=>{
      console.log(err)
      setLoading(false)
    })
  };

  return (
    <>
      <CardBox><h1>Please Create Different Courses for Your Users</h1></CardBox>
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
          name="name"
          value={name}
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your Course Name',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="course_code"
          value={course_code}
          label="Course code"
          rules={[
            {
              required: true,
              message: 'Please enter Course Code of the Course',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item label="Upload Image">
          <FileUploader
          value={file} saveImage={saveImage}/>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};


export default UploadResults;
