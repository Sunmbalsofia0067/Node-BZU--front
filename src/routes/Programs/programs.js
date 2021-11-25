import React, {useEffect, useState} from "react";
import {Button, Tabs,Card,Row,Col, Table, Input, Space } from 'antd';
import {useSelector,useDispatch} from "react-redux";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import * as actionCreators from "../../appRedux/actions/ProgramActions"
import CardBox from "../../components/CardBox";
import {Link} from "react-router-dom";

const {TabPane}=Tabs
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const Programs = (props) => {
  const {programs} = useSelector(({programs})=>programs)
  const {users} = useSelector(({programs})=>programs)
  console.log(programs)
  console.log(users)
  const dispatch = useDispatch()


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
  // const myTabPane =(onClick,key,tab)=>{
  //   return(<TabPane>hola</TabPane>)
  // }

  const getNewData=(key)=>{
    dispatch(actionCreators.storeUsers(key))
    setActiveTab(key)
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester',
      ...getColumnSearchProps("semester")
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
    },
    {
      title: 'Registration #',
      dataIndex: 'registration_no',
      key: 'registration_no',
    },
    {
      title: 'Roll #',
      dataIndex: 'role_no',
      key: 'role_no',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role_id',
      key: 'role_id',
    },
  ];
  return (
    <div>
      <Row>
        <Col md={20}>

        </Col>
        <Col md={2}>
          <Space style={{marginBottom: 16}}>
            <Link to={"/newProgram"}><Button>Create New Program</Button></Link>
          </Space>
        </Col>
      </Row>
        <Card className='abc' title="Programs List" bordered={false} >
          <>
            <Tabs activeKey={activeTab} tabPosition='left' onChange={getNewData} >
                {programs.map(program => (
                  <TabPane tab={program.name}  key={program.key}>
                    <h1>{program.name}</h1>
                    <Table columns={columns} dataSource={users} />
                  </TabPane>
                ))}
            </Tabs>
          </>
        </Card>
    </div>
  );
};

export default Programs;

