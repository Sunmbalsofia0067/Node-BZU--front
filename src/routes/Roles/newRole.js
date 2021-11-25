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

const NewRole = (props) => {

  const [name, setName] = useState('')
  const [client_id, setClient_id] = useState('')
  const [allClients,setAllClients]=useState([])
  const [form] = Form.useForm();

  const nameHandler=(event)=>{
    setName(event.target.value)
    console.log(event.target.value)
  }
  const clientHandler=(event)=>{
    setClient_id(event)
    console.log(event)
  }
  useEffect(()=>{
    axios.get("clients/").then(response=>{
      console.log(response)
      const results = response.data.map((row)=>({
        value:row.id,
        label:row.name
      }))
      setAllClients(results)
    }).catch(error=>{
      console.log(error)
    })
  },[])

  let history=useHistory()

  const postRoleHandler = () => {
    let role = new FormData();
    role.append('name', name)
    role.append('client_id',client_id)
    axios.post('roles/',role
    )
      .then(response => {
        console.log(response)
        message.success('Role added successfully.');
        history.push("/user")
      })
      .catch(error => {
        console.log(error)
      })
  }
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <CardBox><h1>Please Create Different Roles for Your Users</h1></CardBox>
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
        onChange={e => {
          nameHandler(e)
        }}
        palceholder=" Please enter your Role Name"
        rules={[
          {
            required: true,
            message: 'Please input your Role Name',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item label="Clients"
      >
        <Space
          direction="vertical"
          style={{
            width: '50%',
          }}
        >
          <Select
            showSearch
            value={client_id}
            options={allClients}
            onChange={e=>clientHandler(e)}
            filterOption={(input, option) =>
              option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </Space>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button
          onClick={postRoleHandler}
          type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      </>
  );
};


export default NewRole;
