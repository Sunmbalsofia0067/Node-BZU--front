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

const NewStockIn = (props) => {


  const [quantity, setQuantity] = useState("")
  const [loading , setLoading]=useState(false)
  const [user_id,setUser_id] = useState([])
  const [allUsers , setAllUsers] = useState([])
  const [item_id,setItem_id] = useState([])
  const [allItems , setAllItems] = useState([])
  const [form] = Form.useForm();

  const nameHandler=(event)=>{
    setQuantity(event.target.value)
  }
  const userHandler =(event)=>{
    setUser_id(event)
  }
  const itemHandler =(event)=>{
    setItem_id(event)
  }
  const quantityHandler=(event)=>{
    setQuantity(event.target.value)
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
  useEffect(()=>{
    axios.get('items').then(response=>{
      let items = response.data.map((row)=>({
        value:row.id,
        label:row.name
      }))
      setAllItems(items)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  let history=useHistory()
  const postStoreHandler = async () => {
    let store = new FormData();
    store.append('quantity', quantity)
    store.append('item_id',item_id)
    store.append('user_id',user_id)
    setLoading(true)
    axios.post('stockIn',store,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

      .then(response => {
        console.log(response)
        message.success('Stock In successfully.');
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
      <CardBox><h1>Please Stock In </h1></CardBox>
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
          name="Quantity"
          label="quantity"
          onChange={e => {
            quantityHandler(e)
          }}
          palceholder=" Please enter quantity of your items"
          rules={[
            {
              required: true,
              message: 'Please enter quantity of your items',
            },
          ]}
        >
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
        <Form.Item label="Items">
          <Space
            direction="vertical"
            style={{
              width: '50%',
            }}
          >
            <Select
              mode="multiple"
              showSearch
              value={item_id}
              options={allItems}
              onChange={e=>itemHandler(e)}
              placeholder="please select the Items"
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


export default NewStockIn;
