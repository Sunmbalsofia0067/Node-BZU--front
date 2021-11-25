import React from "react";
import axios from "axios";
import {Button, message, Space, Table} from "antd";
import Popconfirm from "antd/es/popconfirm";
import {Link} from "react-router-dom";


class Items extends React.Component {
  state = {
    itemData: [],
  };


  componentDidMount() {
    axios.get("/items").then(response => {
      console.log(response)
        let items = response.data.map(row => ({
          name: row.name,
          key: row.id,
          client_id: row.Clients.map(client => client.name),
          // status_id: row.Statuses.map(status => status.name),
          barcode: row.barcode,
          cost_price: row.cost_price,
          quantity: row.quantity,
          expiration_date: row.expiration_date,
          image: row.image,
          description:row.description
        }))
        console.log(items)
        this.setState({
          itemData: items,
        })
      }
    ).catch(err => {
      console.log(err)
    })
  }


  onDelete = (key) => {
    axios.delete("items/" + key,).then(response => {
      console.log(key)
      const itemData = [...this.state.itemData];
      this.setState({
        itemData: itemData.filter((item) => item.key !== key),
      });
      message.success('Item Deleted successfully.');
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
        width: 70,
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
        title: 'Client',
        dataIndex: 'client_id',
        key: 'client_id',
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (image) => (<img src={process.env.REACT_APP_BASE_IMAGE_PATH + image} alt={"Item"}/>)
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Cost',
        dataIndex: 'cost_price',
        key: 'cost_price',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Expiration Date',
        dataIndex: 'expiration_date',
        key: 'expiration_date',
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key: 'status_id',
      },
      {
        title: 'Action',
        dataIndex: 'key',
        key: 'action',
        render: (key) =>
          this.state.itemData.length >= 1 ? (
            <Popconfirm title="Sure to delete?"
                        onConfirm={() => this.onDelete(key)}
            >
              <Button>Delete</Button>
            </Popconfirm>
          ) : null,
      },
      {
        title: 'Action',
        dataIndex: 'key',
        key: 'key',
        render: (key) =>
          <Link to={"editItem/" + key}><Button>Edit</Button></Link>
      },
    ];
    return (
      <>
        <Space style={{marginBottom: 16}}>
          <Link to={"/newItem"}><Button>Create New Item</Button></Link>
        </Space>
        <Table
          columns={columns}
          dataSource={this.state.itemData}
          onChange={this.handleChange}
          scroll={{x: 1500, y: 400}}/>
      </>
    );
  }
}

export default Items;
