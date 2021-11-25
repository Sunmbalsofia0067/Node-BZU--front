import React, {useEffect, useState} from 'react';
import {Form, Input, message, Button, Space, Select, Table} from 'antd';
import {useSelector} from "react-redux";
import axios from "axios";
import {useHistory} from "react-router-dom"
import roles from "../../appRedux/reducers/Role";
import CardBox from "../../components/CardBox";
import FileUploader from "../../components/Uploader/fileUploader";
import Buttons from "react-bootstrap-sweetalert/dist/components/Buttons";


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

const DownloadResults = (props) => {
  const {auth} = useSelector(({auth}) => auth);
  console.log(props)
  const [form] = Form.useForm();
  const [loading , setLoading] = useState(false);
  const [file, setFile] = useState('');
  const [name, setName] = useState("")
  const [course_code, setCourse_code] = useState("")
  const [key, setKey] = useState("")
  const [newFile , setNewFile] = useState('')

  const saveImage = (image) => {
    console.log(image)
    setFile(image)
  }

  const id = props.match.params.id
  useEffect(()=>{
    axios.get('courses/'+id).then(response=>{

      let courses = response.data
      setKey(courses.id)
      setName(courses.name)
      setCourse_code(courses.course_code)
      console.log(courses)
    }).catch(err=>{
      console.log(err)
    })
  },[])

   useEffect(() => {
      axios.get('courses/findAllCourseUser/' + id).then(response => {

        let courseUser = response.data[0]
        form.setFieldsValue(courseUser)
        setNewFile(courseUser.file)
        console.log(courseUser)
      }).catch(err => {
        console.log(err)
      })
    }, [])

  const dataSource = [
    {
      key: key,
      name: name,
      course_code:course_code,
      file:newFile
    },
  ]
const columns=[
  {
    title: 'SR#',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Course_code',
    dataIndex: 'course_code',
    key: 'course_code',
  },
  {
    title: 'Result',
    dataIndex: 'file',
    key: 'file',
    render:()=>(<Button type="primary" size="medium">Download</Button>)
  },
]


  return (
    <>
      <CardBox><h1>Please Download Your Result for {name} Courses </h1></CardBox>
      <Table columns={columns} dataSource={dataSource}/>
    </>
  );
};


export default DownloadResults;
