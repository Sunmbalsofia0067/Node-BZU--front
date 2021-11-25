import React from "react";
import axios from "axios";
import {Table,Dropdown,Menu, Button, Space, message, Col, Row} from 'antd';
import Popconfirm from "antd/es/popconfirm";
import {Link} from "react-router-dom";

class Users extends React.Component {
  state = {
    userData:[],
  };


  componentDidMount() {
    axios.get("/users").then(response=>{
      console.log(response)
      let users = response.data.map(row=>({
        name: row.fullName,
        key:row.id,
        role_id:row.Role.name,
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

  menu = (
    <Menu>
      <Menu.Item>
        <Space>
          <Link to={"/newStore"}><Button>Create Store</Button></Link>
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space>
          <Link to={"/newItem"}><Button>Create Items</Button></Link>
        </Space>
      </Menu.Item>
    </Menu>
  );
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
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (image)=>(<img src={process.env.REACT_APP_BASE_IMAGE_PATH+ image} alt={"User"}/>)
      },
      {
        title: 'Role',
        dataIndex: 'role_id',
        key: 'role_id',
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
            <Row>
              <Col md={16}>
                <Popconfirm title="Sure to delete?"
                            onConfirm={() => this.onDelete(key)}
                >
                  <Button>Delete</Button>
                </Popconfirm>
              </Col>
              <Col md={6}>
                <Link to={"editUser/"+key}><Button>Edit</Button></Link>
              </Col>
            </Row>
          ) : null,
      },
      // {
      //   title: 'Action',
      //   dataIndex: 'key',
      //   key:'key',
      //   render: (key) =>
      //     <Link to={"editUser/"+key}><Button>Edit</Button></Link>
      // },
    ];
    return (
      <>
        <Row>
          <Col md={20}>
            <Space style={{ marginBottom: 16 }}>
              <Link to={"/newUser"}><Button>Create New Student</Button></Link>
            </Space>
          </Col>
          <Col md={4}>
            <Space style={{ marginBottom: 16 }}>
              <Link to={"/newUserTeacher"}><Button>Create New Teacher</Button></Link>
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
export default Users
