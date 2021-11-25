import React from "react";
import { Table, Button } from 'antd';

const columns = [
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <Button>Delete</Button>,
  },
  {
    title: 'Key',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Selling Price',
    dataIndex: 'sellingPrice',
  },
  {
    title: 'Cost Price',
    dataIndex: 'costPrice',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Catagories',
    dataIndex: 'catagory',
  },
  {
    title: 'Item Has Serial Number',
    dataIndex: 'itemHasSerialNo',
  },

];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    costPrice:200,
    sellingPrice:220,
    quantity:1,
    itemHasSerialNo:"yes",
    catagory :"Shipping Product",
  });
}

class auditStock extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
  }
}


export default auditStock;
