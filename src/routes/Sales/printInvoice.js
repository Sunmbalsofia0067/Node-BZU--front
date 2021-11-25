import React from "react";
import ReactToPrint from "react-to-print";
import { Button, Card, Col, Row } from 'antd';
import "../../assets/css/allCss.css"
import  axois from "axios";


const thStyle = {
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal"
};

class ComponentToPrint extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      sale_no:"",
      createdAt:"",
      discount_amount:"",
      tax_amount:"",
      sub_total:"",
      total:"",
      saleItemName:"",
      quantity:"",
      price:"",
      barcode:"",
      tax:"",
      discount:""
    }
  }

  componentDidMount() {
    let id= this.props.props
    console.log(id)
    axois.get("saleSecond/"+ id).then(response=>{
      console.log(response.data)
      let invoice = response.data
      this.setState({
      sale_no:invoice.sale_no,
        createdAt:invoice.createdAt,
        discount_amount:invoice.discount_amount,
        tax_amount:invoice.tax_amount,
        sub_total:invoice.sub_total,
        total:invoice.total,
        quantity:invoice.quantity,
        tax:invoice.tax,
        discount:invoice.discount
      })
      }
    ).catch(err=>{
      console.log(err)
    })
  }


  render() {
    return (
      <>
        <div className="site-card-wrapper" style={{paddingTop:200}}>
          <Row gutter={16}>
            <Col span={6}>
              <Card title="Name" bordered={false}>
                {this.state.sale_no}
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Barcode" bordered={false}>
                {this.state.createdAt}
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Discount" bordered={false}>
                {this.state.discount}
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Total Price" bordered={false}>
                {this.state.total}
              </Card>
            </Col>
          </Row>
          <h2 className="message" style={{paddingTop:200}}>Your Invoice</h2> <h2 className="message">Thank you!</h2>
        </div>
        </>
    );
  }
}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  id= this.props.match.params.id

  render() {
    return (
      <div>
        <h1>{console.log(this.id)}</h1>
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint
          props={this.id}
          ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;
