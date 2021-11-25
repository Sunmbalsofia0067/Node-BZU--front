import React from "react";
import axios from "axios";
import {Table, Button, Space, message, Col, Row} from 'antd';
import Popconfirm from "antd/es/popconfirm";
import {Link} from "react-router-dom";
import CardBox from "../../components/CardBox";

class Roles extends React.Component {
  state = {
    RoleData:[],
  };


  componentDidMount() {
    axios.get("/roles").then(response=>{
        console.log(response)
        let roles = response.data.map(row=>({
          name: row.name,
          key:row.id,
        }))
        console.log(roles)
        this.setState({
          roleData:roles,
        })
      }
    ).catch(err=>{
      console.log(err)
    })
  }



  onDelete = (key) => {
    axios.delete("roles/" + key,).then(response => {
      console.log(key)
      const roleData = [...this.state.roleData];
      this.setState({
        roleData: roleData.filter((item) => item.key !== key),
      });
      message.success('Role Deleted successfully.');
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
      },
      // {
      //   title: 'Client',
      //   dataIndex: 'client_id',
      //   key: 'client_id',
      // },
      // {
      //   title: 'User',
      //   dataIndex: 'user_id',
      //   key: 'user_id',
      // },

      // {
      //   title: 'Action',
      //   dataIndex: 'key',
      //   key:'action',
      //   render: (key) =>
      //     this.state.roleData.length >= 1 ? (
      //       <div>
      //         <Popconfirm title="Sure to delete?"
      //                     onConfirm={() => this.onDelete(key)}
      //         >
      //           <Button>Delete</Button>
      //         </Popconfirm>
      //         <Link to={"editRole/" + key}><Button>Edit</Button></Link>
      //       </div>
      //     ) : null,
      // },
    ];
    return (
      <>
        <CardBox><h1>All the Roles Available in BZU</h1></CardBox>
        {/*<Row>*/}
        {/*  <Col md={20}>*/}
        {/*    <Space style={{ marginBottom: 16 }}>*/}
        {/*      <Link to={"/newRole"}><Button>Create New Role</Button></Link>*/}
        {/*    </Space>*/}
        {/*  </Col>*/}
        {/*  <Col md={4}>*/}
        {/*    <Space style={{ marginBottom: 16 }}>*/}
        {/*      <Link to={"/newStore"}><Button>Create Store</Button></Link>*/}
        {/*    </Space>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Table
          columns={columns}
          dataSource={this.state.roleData}
          onChange={this.handleChange} />
      </>
    );
  }
}
export default Roles
