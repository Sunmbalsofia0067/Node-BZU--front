import React from "react";
import * as actionCreators from "../../appRedux/actions/CoursesActions"
import * as authCreators from "../../appRedux/actions/Auth"
import { Table, Input, Button, Space,Row,Col } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Card from "antd/es/card";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import CardBox from "../../components/CardBox";

const {Meta} = Card

class Courses extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    Courses:[],
    auth:{},
  };

  componentDidMount() {
    this.props.dispatch(actionCreators.storeCourses())
  }


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
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
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
  const columnsForStudents=[
    {
      title: 'Co#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Subject Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...this.getColumnSearchProps('name'),
    },
    {
      title: 'Fee for the Course ',
      dataIndex: 'fee',
      key: 'fee',
      width: '20%',
      ...this.getColumnSearchProps('fee'),
    },
    {
      title: 'Action ',
      dataIndex: 'key',
      key: 'key',
      render:(key)=>(<Link to={"downloadResult/"+key}><Button>Download Result</Button></Link>)
    },
  ]
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
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Fee for the Course ',
        dataIndex: 'fee',
        key: 'fee',
        width: '20%',
        ...this.getColumnSearchProps('fee'),
      },
      {
        title: 'Action ',
        dataIndex: 'key',
        key: 'key',
        render:(key)=>(<Link to={"uploadResult/"+key}><Button>Upload Result</Button></Link>)
      },
    ];
    return <div>
      {this.props.auth.role!==1? <CardBox><h1  style={{textAlign:"center"}}>Please click on DownLoad Result button</h1> </CardBox>:<Row>
        <Col md={20}>

        </Col>
        <Col md={2}>
          <Space style={{marginBottom: 16}}>
            <Link to={"/newCourses"}><Button>Create New Course</Button></Link>
          </Space>
        </Col>
      </Row>}
      <Table columns={this.props.auth.role ===3?columnsForStudents:columns} dataSource={this.props.Courses}/>
      <h1>{console.log(this.props.auth.role)}</h1>
    </div>;
  }
}

const mapStateToProps = (state)=>{
  return {
  Courses:state.Courses.Courses,
    auth:state.auth.auth
  }
}
export default connect (mapStateToProps)(Courses);
