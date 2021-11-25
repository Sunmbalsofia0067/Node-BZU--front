import React from "react";
import axios from "axios";
import {Table, Button,Row, Col, Space, message} from 'antd';
import Popconfirm from "antd/es/popconfirm";
import {Link} from "react-router-dom";

class Stores extends React.Component {
  state = {
    storeData:[],
  };


  componentDidMount() {
    axios.get("/stores/api/test/stores").then(response=>{
        console.log(response)
        let stores = response.data.map(row=>({
          name: row.name,
          key:row.id,
          location:row.location,
          // item_id:row.item_id
          // role_id:row.Roles.map(role=>role.name),

        }))
        console.log(stores)
        this.setState({
          storeData:stores,
        })
      }
    ).catch(err=>{
      console.log(err)
    })
  }



  onDelete = (key) => {
    axios.delete("stores/" + key,).then(response => {
      console.log(key)
      const storeData = [...this.state.storeData];
      this.setState({
        storeData: storeData.filter((item) => item.key !== key),
      });
      message.success('Store Deleted successfully.');
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
        title: 'Client',
        dataIndex: 'client_id',
        key: 'client_id',
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Action',
        dataIndex: 'key',
        key:'action',
        render: (key) =>
          this.state.storeData.length >= 1 ? (
            <div>
              <Popconfirm title="Sure to delete?"
                          onConfirm={() => this.onDelete(key)}
              >
                <Button>Delete</Button>
              </Popconfirm>
              <Link to={"editStore/" + key}><Button>Edit</Button></Link>
            </div>
          ) : null,
      },
    ];
    return (
      <>
        <Row>
          <Col md={20}>
            <Space style={{ marginBottom: 16 }}>
              <Link to={"/newStore"}><Button>Create New Store</Button></Link>
            </Space>
          </Col>
          <Col md={4}>
            <Space style={{ marginBottom: 16 }}>
              <Link to={"/newItem"}><Button>Create Item</Button></Link>
            </Space>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={this.state.storeData}
          onChange={ this.handleChange} />
      </>
    );
  }
}
export default Stores
