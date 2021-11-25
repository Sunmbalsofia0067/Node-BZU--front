import React, {useEffect, useState} from 'react';
import {Form, Input, message, Button, Space, Select} from 'antd';
import axios from "axios";
import {useHistory} from "react-router-dom"
import roles from "../../appRedux/reducers/Role";
import CardBox from "../../components/CardBox";


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

const NewCourses = (props) => {

  const [form] = Form.useForm();
  const [program_id,setProgram_id] = useState([]);
  const [allPrograms , setAllPrograms] = useState([]);
  const [loading , setLoading] = useState(false);

  const programHandler =(event)=>{
    setProgram_id(event)
  }

  useEffect(()=>{
    axios.get('programs').then(response=>{
      let programs = response.data.map((row)=>({
        value:row.id,
        label:row.nameA
      }))
      setAllPrograms(programs)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  let history=useHistory()

  const onFinish = (values) => {
     values.program_id = program_id
    console.log('Received values of form: ', values);
    setLoading(true)

    axios.post("courses/",values).then(
      success=>{
        console.log(success)
        message.success('Course added successfully.');
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
        <Form.Item
          name="fee"
          label="Course Fee"
          rules={[
            {
              required: true,
              message: 'Please enter Course Fee',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="creditHours"
          label="Credit Hours"
          rules={[
            {
              required: true,
              message: 'Please enter the total no of Credit hours of the given course',
            },
          ]}
        >
          <Input/>
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
              placeholder="please select the Users"
              filterOption={(input, option) =>
                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Space>
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


export default NewCourses;
