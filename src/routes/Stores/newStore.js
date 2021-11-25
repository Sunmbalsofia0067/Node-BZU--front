import React, {useEffect, useState} from 'react';
import {Form, Input, Space,Cascader, Select, Row, Col, Upload, message, Checkbox, Button, AutoComplete} from 'antd';
import axios from "axios";
import {Link,useHistory} from "react-router-dom"
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

const NewStore = (props) => {

  const [name, setName] = useState("")
  const [loading , setLoading]=useState(false)
  const [location, setLocation] =useState('')
  const [user_id,setUser_id] = useState([])
  const [allUsers , setAllUsers] = useState([])
  const [form] = Form.useForm();

  const nameHandler=(event)=>{
    setName(event.target.value)
  }
  const locationHandler =(event)=>{
    setLocation(event.target.value)
  }
  const userHandler =(event)=>{
    setUser_id(event)
  }

  useEffect(()=>{
    axios.get('users').then(response=>{
      let users = response.data.map((row)=>({
        value:row.id,
        label:row.fullName
        }))
      setAllUsers(users)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  let history=useHistory()
  const postStoreHandler = async () => {
    let store = new FormData();
    store.append('name', name)
    store.append('client_id',1)
    store.append('location',location)
    // store.append('user_id',user_id)
    setLoading(true)
    axios.post('stores',store,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

      .then(response => {
        console.log(response)
        message.success('Store added successfully.');
        setLoading(false)
        history.push("/stores")
      })
      .catch(error => {
        console.log(error)
        setLoading(false)

      })
  }
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (<div>
      <CardBox><h1>Please Add your Store</h1></CardBox>
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
          palceholder=" Please enter your Store Name"
          rules={[
            {
              required: true,
              message: 'Please input your Store Name',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          onChange={e => {locationHandler(e)}}>
          <Input/>
        </Form.Item>
        <Form.Item label="Users">
          <Space
            direction="vertical"
            style={{
              width: '50%',
            }}
          >
            <Select
              mode="multiple"
              showSearch
              value={user_id}
              options={allUsers}
              onChange={e=>userHandler(e)}
              placeholder="please select the Users"
              filterOption={(input, option) =>
                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Space>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            loading={loading}
            onClick={postStoreHandler}
            type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};


export default NewStore;
