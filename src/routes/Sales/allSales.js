import React from "react";
import axios from "axios";
import {Table,Dropdown,Menu, Button, Space, message, Col, Row} from 'antd';
import Popconfirm from "antd/es/popconfirm";
import {Link} from "react-router-dom";

class AllSales extends React.Component {
  state = {
    saleData:[],
  };
  //'id','sale_no','store_id','client_id','quantity','discount','tax','sub_total','total'

  componentDidMount() {
    axios.get("/saleSecond").then(response=>{
      console.log(response)
        let sales = response.data.map(row=>({
          sale_no: row.sale_no,
          key:row.id,
          client:row.client_id,
          quantity:row.quantity,
          store_id:row.store_id,
          tax:row.tax+"%",
          discount:row.discount+"%",
          sub_total:row.sub_total,
          total:row.total,
        }))
        console.log(sales)
        this.setState({
          saleData:sales,
        })
      }
    ).catch(err=>{
      console.log(err)
    })
  }



  onDelete = (key) => {
    axios.delete("saleSecond/" + key,).then(response => {
      console.log(key)
      const saleData = [...this.state.saleData];
      this.setState({
        saleData: saleData.filter((item) => item.key !== key),
      });
      message.success('Sale Deleted successfully.');
    }).catch(err => {
      console.log(err)
    })

  };

  menu = (
    <Menu>
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
        title: 'Sale No',
        dataIndex: 'sale_no',
        key: 'sale_no',
      },
        // {
        //   title: 'No of Items',
        //   dataIndex: 'quantity',
        //   key: 'quantity',
        // },
        // {
        //   title: 'Store Name',
        //   dataIndex: 'store_id',
        //   key: 'store_id',
        // },
        // {
        //   title: 'Client Name',
        //   dataIndex: 'client',
        //   key: 'client',
        // },
      {
        title: 'Tax',
        dataIndex: 'tax',
        key: 'tax',
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        title: 'Sub Total',
        dataIndex: 'sub_total',
        key: 'sub_total',
      },
      {
        title: 'Total Price',
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: 'Action',
        dataIndex: 'key',
        key:'action',
        render: (key) =>
          this.state.saleData.length >= 1 ? (
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
        key:'key',
        render: (key) =>
          <Link to={"printInvoice/"+key}><Button>Invoice</Button></Link>
      },
    ];
    return (
      <>
        <Row>
          <Col md={20}>
          </Col>
          <Col md={4}>
            <Dropdown overlay={this.menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Select Navigation
              </a>
            </Dropdown>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={this.state.saleData}
          onChange={this.handleChange}
        />
      </>
    );
  }
}
export default AllSales
