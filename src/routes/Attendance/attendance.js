import React, { useState, useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import {Radio,Input,Button, Space, Table} from "antd";
import axios from "axios";
import {useDispatch,useSelector} from "react-redux";

import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import * as actionCreators from "../../appRedux/actions/ProgramActions";
import CardBox from "../../components/CardBox";


function Attendance(props) {
  let history = useHistory();

  const[courseData, setCourseData] = useState([])
  const [show, setShow] =  useState(false)
  const dispatch = useDispatch()
  const {Courses} = useSelector(({Courses}) => Courses);

  useEffect(()=>{
    let coursesMaterial = Courses.map(row => ({
      key: row.key, // I added this line
      name: row.name,
      fee:row.fee
    }))
    setCourseData(coursesMaterial)
  },[])

  const [searchText, setSearchText]= useState("")
  const [searchedColumn, setSearchedColumn]= useState("")
  const [activeTab, setActiveTab] =useState("1")
  useEffect(()=>{
    dispatch(actionCreators.storePrograms())
  },[])
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            const searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0])
              setSearchedColumn (dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText(" ")
  };
  const showHandler =()=>{
    setShow(true)
  }
  const columns = [
    {
      title: 'Co#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Subject Name',
      dataIndex: 'name',
      key: 'name',
    ...getColumnSearchProps('name')
    },
    {
      title: 'Fee for the Course ',
      dataIndex: 'fee',
      key: 'fee',
    },
    {
      title: 'Action ',
      dataIndex: 'key',
      key: 'key',
      render:(key)=>(<Button onClick={e=>showHandler(e)}>Select Course</Button>)
    },
  ];
  return (
    <div>
      <CardBox><h1 style={{textAlign:"center"}}>Please Select a Course to Mark Attendance</h1></CardBox>
      <Table columns={columns} dataSource={courseData}/>
      {show===true?<div>Hola</div>:""}
    </div>
      );
}

export default Attendance;
