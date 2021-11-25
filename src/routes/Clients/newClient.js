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

const NewClient = (props) => {

  const [name, setName] = useState("")
  const [loading , setLoading]=useState(false)
  const [form] = Form.useForm();
  const [barcode, setBarcode] =useState('')

  const nameHandler=(event)=>{
    setName(event.target.value)
  }
  const barcodeHandler=(event)=>{
    setBarcode(event.target.value)
  }



  let history=useHistory()
  const postClientHandler = async () => {

    let client = new FormData();
    client.append('name', name)
    client.append('barcode', barcode)
setLoading(true)
    axios.post('clients',client,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

      .then(response => {
        console.log(response)
        message.success('Client added successfully.');
        setLoading(false)
        history.push("/clients")
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
      <CardBox><h1>Please Add your Client</h1></CardBox>
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
        palceholder=" Please enter your Client Name"
        rules={[
          {
            required: true,
            message: 'Please input your Client Name',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
      name="barcode"
      label="Barcode"
      onChange={e => {
        barcodeHandler(e)
      }}>
        <Input/>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button
          loading={loading}
          onClick={postClientHandler}
          type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};


export default NewClient;
