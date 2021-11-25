import React, {useEffect, useState} from 'react';
import {Form, Input, Space,Cascader, Select, Row, Col, Upload, message, Checkbox, Button, AutoComplete} from 'antd';
import axios from "axios";
import {Link,useHistory} from "react-router-dom"
import Uploader from "../../components/Uploader/uploader"
import CardBox from "../../components/CardBox";

const {Option} = Select;
// import ImgCrop from 'antd-img-crop';

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

const NewItem = (props) => {

  const [name, setName] = useState("")
  const [client_id, setClient_id] = useState("")
  const [allClients, setAllClients] = useState([])
  const [status_id, setStatus_id] = useState('')
  const [allStatus, setAllStatus] = useState([])
  const [expiration_date, setExpirationDate] = useState('')
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState('')
  const [barcode, setBarcode] = useState('')
  const [cost_price, setCostPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const [loading , setLoading]=useState(false)

  const saveImage = (image)=>{
    console.log(image)
    setFile(image)
  }

  const clientHandler = (event) =>{
    setClient_id(event)
    console.log(event)
  }
  const nameHandler = (event) => {
    setName(event.target.value)
  }
  const descriptionHandler = (event) => {
    setDescription(event.target.value)
  }
  const costHandler = (event) => {
    setCostPrice(event.target.value)
  }
  const quantityHandler = (event) => {
    setQuantity(event.target.value)
  }
  const dateHandler = event =>{
    setExpirationDate(event.target.value)
  }
  const barcodeHandler =event =>{
    setBarcode(event.target.value)
  }
  const categoryHandler =event=>{
    setCategory(event.target.value)
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
  const postUserHandler = async () => {
    // const validate = await form.validateFields()


    let item = new FormData();
    item.append('name', name)
    item.append("description", description)
    item.append("cost_price", cost_price)
    item.append('barcode',barcode)
    item.append('category',category)
    item.append('quantity',quantity)
    // item.append('cost_price',cost_price)
    item.append('status_id',5)
    item.append("client_id", client_id)
    item.append("image", file)
    setLoading(true)
    axios.post('items',item,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response)
        message.success('Item added successfully.');
        history.push("/newStockIn")
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)

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
    <>
    <CardBox><h1>Please Create Item</h1></CardBox>
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
        value={name}
        onChange={e => {
          nameHandler(e)
        }}
        palceholder=" Please enter your Name"
        rules={[
          {
            required: true,
            message: 'Please input your Name',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        value={description}
        onChange={e => {
          descriptionHandler(e)
        }}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="cost_price"
        label="Cost Price"
        onChange={e=>costHandler(e)}
        rules={[
          {
            required: true,
            message: 'Please enter Cost Price',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name="expiration_date"
        label="Expiration Date"
        value={expiration_date}
        onChange={e => {
          dateHandler(e)
        }}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="quantity"
        label="Quantity"
        value={quantity}
        onChange={e => {
          quantityHandler(e)
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
        name="category"
        label="Category"
        value={category}
        onChange={e => {
          categoryHandler(e)
        }}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name="barcode"
        label="Barcode"
        value={barcode}
        onChange={e => {
          barcodeHandler(e)
        }}>
        <Input/>
      </Form.Item>
      <Form.Item label="Upload Image"> <Uploader
        onPreview={onPreview}
        value={file} saveImage={saveImage}/>
      </Form.Item>
      <Form.Item label="Clients">
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
      </>
  );
};


export default NewItem;
