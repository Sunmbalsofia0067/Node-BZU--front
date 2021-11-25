import React from "react";
import axios from "axios";
import {  SearchOutlined} from "@ant-design/icons";
import {Table,Dropdown,Menu, Button, Space, message,Input, Col, Row} from 'antd';
import Popconfirm from "antd/es/popconfirm";
import {Link} from "react-router-dom";
import Highlighter from 'react-highlight-words';


class Students extends React.Component {
  state = {
    userData:[],
    searchText: '',
    searchedColumn: '',
  };

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
  componentDidMount() {
    axios.get("/users/allStudents").then(response=>{
        console.log(response)
        let users = response.data.map(row=>({
          name: row.fullName,
          key:row.id,
          // role_id:row.Roles.map(role=>role.name),
          address:row.address,
          phoneNo:row.phoneNo,
          image:row.image,
          father_name:row.father_name,
          father_phone:row.father_phone,
          registration_no:row.registration_no,
          role_no:row.role_no,
          country:row.country,
          state:row.state,
          // password:row.password,
          email:row.email,
        }))
        console.log(users)
        this.setState({
          userData:users,
        })
      }
    ).catch(err=>{
      console.log(err)
    })
  }



  onDelete = (key) => {
    axios.delete("users/" + key,).then(response => {
      console.log(key)
      const userData = [...this.state.userData];
      this.setState({
        userData: userData.filter((item) => item.key !== key),
      });
      message.success('User Deleted successfully.');
    }).catch(err => {
      console.log(err)
    })

  };

  render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'key',
        key: 'key',
        width:70,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
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
      // {
      //   title: 'Image',
      //   dataIndex: 'image',
      //   key: 'image',
      //   render: (image)=>(<img src={process.env.REACT_APP_BASE_IMAGE_PATH+ image} alt={"User"}/>)
      // },
      // {
      //   title: 'Password',
      //   dataIndex: 'password',
      //   key: 'password',
      // },
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
        title: 'Action',
        dataIndex: 'key',
        key:'action',
        render: (key) =>
          this.state.userData.length >= 1 ? (
            <Popconfirm title="Sure to delete?"
                        onConfirm={() => this.onDelete(key)}
            >
              <Button>Delete</Button>
            </Popconfirm>
          ) : null,
      },
      {
        title: 'Role',
        dataIndex: 'role_id',
        key: 'role_id',
      },
      {
        title: 'Action',
        dataIndex: 'key',
        key:'key',
        render: (key) =>
          <Link to={"editUser/"+key}><Button>Edit</Button></Link>
      },
    ];
    return (
      <>
        <Row>
          <Col md={20}>
          </Col>
          <Col md={2}>
            <Space style={{ marginBottom: 16 }}>
              <Link to={"/newUser"}><Button>Create New Student</Button></Link>
            </Space>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={this.state.userData}
          onChange={this.handleChange}
          scroll={{x: 1500, y: 400}} />
      </>
    );
  }
}
export default Students
