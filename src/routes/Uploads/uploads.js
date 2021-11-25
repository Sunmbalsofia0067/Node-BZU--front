import React, {useEffect, useState} from 'react';
import {Form, Input, message, Button, Card, Row, Col} from 'antd';
import axios from "axios";
import CardBox from "../../components/CardBox";
import FileUploader from "../../components/Uploader/fileUploader";

const Uploads = (props) => {

  console.log(props)
  const [form] = Form.useForm();
  const [loading , setLoading] = useState(false);
  const [file, setFile] = useState('');

  const myStyle = {
    borderRadius:"10px",
    height:"100px",
  };

  const saveImage = (image) => {
    console.log(image)
    setFile(image)
  }

  const onFinish = (values) => {
    let courseUser = new FormData()
    courseUser.append("file",file)
    setLoading(true)
    console.log(courseUser)
    axios.put("downloads/merit-list",courseUser).then(
      success=>{
        console.log(success)
        message.success('Merit List is added successfully.');
        setLoading(false)
      }
    ).catch(err=>{
      console.log(err)
      setLoading(false)
    })
  };
  const onFinish1 = (values) => {
    let courseUser = new FormData()
    courseUser.append("file",file)
    setLoading(true)
    console.log(courseUser)
    axios.put("downloads/admission-form",courseUser).then(
      success=>{
        console.log(success)
        message.success('Admission Form is added successfully.');
        setLoading(false)
      }
    ).catch(err=>{
      console.log(err)
      setLoading(false)
    })
  };
  const onFinish2 = (values) => {
    let courseUser = new FormData()
    courseUser.append("file",file)
    setLoading(true)
    console.log(courseUser)
    axios.put("downloads/scholarships",courseUser).then(
      success=>{
        console.log(success)
        message.success('Scholarship Form is added successfully.');
        setLoading(false)
      }
    ).catch(err=>{
      console.log(err)
      setLoading(false)
    })
  };
  const onFinish3 = (values) => {
    let courseUser = new FormData()
    courseUser.append("file",file)
    setLoading(true)
    console.log(courseUser)
    axios.put("downloads/prospectus",courseUser).then(
      success=>{
        console.log(success)
        message.success(`Prospectus of ${Date} is added successfully.`);
        setLoading(false)
      }
    ).catch(err=>{
      console.log(err)
      setLoading(false)
    })
  };
  const onFinish4 = (values) => {
    let courseUser = new FormData()
    courseUser.append("file",file)
    setLoading(true)
    console.log(courseUser)
    axios.put("downloads/academic-calender",courseUser).then(
      success=>{
        console.log(success)
        message.success('Academic Calender is added successfully.');
        setLoading(false)
      }
    ).catch(err=>{
      console.log(err)
      setLoading(false)
    })
  };
  const onFinish5 = (values) => {
    let courseUser = new FormData()
    courseUser.append("file",file)
    setLoading(true)
    console.log(courseUser)
    axios.put("downloads/student-schedule",courseUser).then(
      success=>{
        console.log(success)
        message.success('Student Schedule is added successfully.');
        setLoading(false)
      }
    ).catch(err=>{
      console.log(err)
      setLoading(false)
    })
  };

  return (
    <>
      <CardBox><h1 style={{textAlign:'center'}}>All Important DownLoads</h1></CardBox>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Merit List" bordered={false}>
              <Form
                style={{textAlign:"center"}}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                  prefix: '86',
                }}
                scrollToFirstError
              >
                <Form.Item >
                  <FileUploader
                    value={file} saveImage={saveImage}/>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"    htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Admission Form" bordered={false}>
                <Form
                  style={{textAlign:"center"}}
                  form={form}
                  name="register"
                  onFinish={onFinish1}
                  initialValues={{
                    prefix: '86',
                  }}
                  scrollToFirstError
                >
                  <Form.Item >
                    <FileUploader
                      value={file} saveImage={saveImage}/>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"    htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Scholarship" bordered={false}>
              <Form
                style={{textAlign:"center"}}
                form={form}
                name="register"
                onFinish={onFinish2}
                initialValues={{
                  prefix: '86',
                }}
                scrollToFirstError
              >
                <Form.Item >
                  <FileUploader
                    value={file} saveImage={saveImage}/>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"    htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Prospectus" bordered={false}>
              <Form
                style={{textAlign:"center"}}
                form={form}
                name="register"
                onFinish={onFinish3}
                initialValues={{
                  prefix: '86',
                }}
                scrollToFirstError
              >
                <Form.Item >
                  <FileUploader
                    value={file} saveImage={saveImage}/>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"    htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Academic Calender" bordered={false}>
              <Form
                style={{textAlign:"center"}}
                form={form}
                name="register"
                onFinish={onFinish4}
                initialValues={{
                  prefix: '86',
                }}
                scrollToFirstError
              >
                <Form.Item >
                  <FileUploader
                    value={file} saveImage={saveImage}/>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"    htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Student Schedule" bordered={false}>
              <Form
                style={{textAlign:"center"}}
                form={form}
                name="register"
                onFinish={onFinish5}
                initialValues={{
                  prefix: '86',
                }}
                scrollToFirstError
              >
                <Form.Item >
                  <FileUploader
                    value={file} saveImage={saveImage}/>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"    htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>

    </>
  );
};


export default Uploads;
