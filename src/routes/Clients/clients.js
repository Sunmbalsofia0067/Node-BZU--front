import React from "react";
import axios from "axios";
import {Table, Button,Row, Col, Space, message} from 'antd';
import Popconfirm from "antd/es/popconfirm";
import {Link} from "react-router-dom";

class Clients extends React.Component {
  state = {
    clientData:[],
  };


  componentDidMount() {
    axios.get("/clients").then(response=>{
      console.log(response)
        let clients = response.data.map(row=>({
          name: row.name,
          barcode:row.barcode,
          key:row.id,
          // role_id:row.Roles.map(role=>role.name),

        }))
        console.log(clients)
        this.setState({
          clientData:clients,
        })
      }
    ).catch(err=>{
      console.log(err)
    })
  }



  onDelete = (key) => {
    axios.delete("clients/" + key,).then(response => {
      console.log(key)
      const clientData = [...this.state.clientData];
      this.setState({
        clientData: clientData.filter((item) => item.key !== key),
      });
      message.success('Client Deleted successfully.');
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
      {
        title: 'Barcode',
        dataIndex: 'barcode',
        key: 'barcode',
      },
      {
        title: 'Action',
        dataIndex: 'key',
        key:'action',
        render: (key) =>
          this.state.clientData.length >= 1 ? (
            <div>
              <Popconfirm title="Sure to delete?"
                          onConfirm={() => this.onDelete(key)}
              >
                <Button>Delete</Button>
              </Popconfirm>
              <Link to={"editClient/" + key}><Button>Edit</Button></Link>
            </div>
          ) : null,
      },
    ];
    return (
      <>
        <Row>
        <Col md={20}>
          <Space style={{ marginBottom: 16 }}>
            <Link to={"/newClient"}><Button>Create New Client</Button></Link>
          </Space>
        </Col>
        <Col md={4}>
          <Space style={{ marginBottom: 16 }}>
            <Link to={"/newRole"}><Button>Create Roles</Button></Link>
          </Space>
        </Col>
      </Row>

        <Table
          columns={columns}
          dataSource={this.state.clientData}
          onChange={this.handleChange} />
      </>
    );
  }
}
export default Clients
