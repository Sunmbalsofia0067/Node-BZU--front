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

const NewProgram = (props) => {

  const [form] = Form.useForm();
  const [loading , setLoading] = useState(false)

  let history=useHistory()

  // const postRoleHandler = () => {
  //   let role = new FormData();
  //   role.append('name', name)
  //   role.append('client_id',client_id)
  //   axios.post('roles/',role
  //   )
  //     .then(response => {
  //       console.log(response)

  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setLoading(true)
    axios.post("programs/",values).then(
      success=>{
        console.log(success)
        message.success('Program added successfully.');
        setLoading(false)
        history.push("/programs")

      }

    ).catch(err=>{
      console.log(err)
      setLoading(false)
    })
  };

  return (
    <>
      <CardBox><h1>Please Create Different Programs for Your Users</h1></CardBox>
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
              message: 'Please input your Program Name',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={[
            {
              required: true,
              message: 'Please enter Duration of the program',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="totalSubjects"
          label="Total Subjects"
          rules={[
            {
              required: true,
              message: 'Please enter the total no of subjects of the give program',
            },
          ]}
        >
          <Input/>
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


export default NewProgram;
