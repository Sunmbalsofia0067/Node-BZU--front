import React, {useEffect, useState,useRef} from "react";
import {Button, Select,PageHeader, Card, Col, Row, Input, Form, Space, message} from "antd"
import MyDocument from " ../../components/PDFReader/pdfReader"
import querystring from 'querystring';
import EmptyCart from '../../assets/images/latestcart3.png'
import CloseIcon from '../../assets/images/close_icon.png';
import {connect} from "react-redux";
import "../../assets/css/allCss.css"
import {Link, useHistory} from "react-router-dom";
import CardBox from "../../components/CardBox";
import {increment, decrement, remove, empty} from "../../appRedux/actions/SaleActions";
import axios from "axios";

import {addToCartQuantity} from "../../appRedux/actions";


const {Option} = Select;


const Sales = (props) => {
    const [form] = Form.useForm();
    const [store, setStore] = useState([])
    const [items, setItem] = useState('')
    const [mata, setData] = useState([])
    const [value, setValue] = useState('')


  const quantity = props.cartItems.length
    const [tax,setTax] = useState('')
    const [discount,setDiscount] = useState('')

    const addToCart = (item) => {
      props.addToCart(item, 1)
    }

    const increment = (id) => {
      props.increment(id)
    }

    const decrement = (id) => {
      props.decrement(id)

    }

    const remove = (id) => {
      props.remove(id)

    }


    const handleSearch = value => {
      if (value) {
        axios.get("search?search=" + value).then(response => {
          console.log(response)
          let items = response.data.map(item => ({
            text: item.name,
            value: item.id
          }))
          setStore(items)
        });
      } else {
        setData([]);
      }
    };
    const handleTaxChange = (event)=>{
      setTax(event.target.value)
    }
    const handleDiscountChange = (event)=>{
      setDiscount(event.target.value)
    }
    const discount_amount = discount*props.total/100
    const tax_amount = tax*props.total/100
  console.log(tax_amount)
  console.log(discount_amount)
  const total= tax_amount+props.total-discount_amount
  console.log(total)
    let history=useHistory()

    const handleChange = value => {
      setValue(value)
      console.log(value)
      axios.get("items/" + value).then(response => {
        console.log(response.data)
        let item = response.data
        setItem(item)
        addToCart(item)
      })
    };
    const cItems = props.cartItems

  const postSaleHandler = ()=>{
    alert("a")
    let abc={};
     abc.data={
       'tax':tax,
       'discount':discount,
       'quantity':quantity
     }
     abc.items=cItems
        axios.post("/sales",abc).then(response=>{
      console.log(response)
      message.success("Sale Created Successfully")
    }).catch(err=>{
      message.error("sale not created")
    })

  }
    const options = store.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <div>
        <div>
          <div>
            <Space style={{ marginBottom: 16 }}>
              <Link to={"/allSales"}><Button>Sales</Button></Link>
            </Space>
          </div>
          <CardBox>
            <Row>
              <Col md={4}>
                <h2>Search</h2>
              </Col>
              <Col md={8}>
                <Select
                  showSearch
                  value={value}
                  placeholder="placeholder"
                  style={{width: 700}}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={handleSearch}
                  onChange={handleChange}
                  notFoundContent={null}
                >
                  {options}
                </Select>
              </Col>
            </Row>
          </CardBox>
        </div>
        <div>
          {cItems.length ?
            <section>
              <div>
                <div>
                  <div>
                    <h3>Cart</h3>
                  </div>
                  <Row>
                    <Col md={12}>
                  <div>
                    <div>
                      <CardBox>
                        <table>
                          <thead>
                          <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            cItems.map((item) =>
                              <tr>
                                <td>
                                  <div>
                                    <div>
                                      <span>{item.name}</span>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="quantity-selector cart">
                                                                <span onClick={() => decrement(item.id)}
                                                                      className="qtyminus input-number-decrement"
                                                                      field='quantity'>–</span>
                                    <input type='text' name='quantity'
                                           value={item.quantity}
                                           className='qty input-number'/>
                                    <span onClick={() => increment(item.id)}
                                          className="input-number-increment qtyplus"
                                          field='quantity'>+</span>
                                  </div>
                                </td>
                                <td>
                                  <span>PKR {item.cost_price}</span>
                                </td>
                                <td>
                                  <div onClick={() => remove(item.id)}
                                       className="cart_actions">
                                    <span><img src={CloseIcon}/></span>
                                  </div>
                                </td>
                              </tr>
                            )
                          }
                          </tbody>
                        </table>
                      </CardBox>
                    </div>
                  </div>
                  </Col>
                    <Col md={12}>
                      <CardBox>
                        <div>
                          <Row>
                          <Col md={10}>
                            <h4>Enter Tax</h4>
                            <h4>Enter Discount</h4>

                          </Col>
                          <Col md={4}>
                            <Input type="text" name="tax" addonAfter="%" size="small" style={{ width: 200 }} value={tax} placeholder="Enter Tax in %" onChange={e=>handleTaxChange(e)}/>
                            <Input type="text" name="discount" addonAfter="%" size="small" style={{ width: 200 }} value={discount} placeholder="Enter Discount in %" onChange={e=>handleDiscountChange(e)}/>
                          </Col>
                          </Row>
                        </div>
                      </CardBox>
                    </Col>
                  </Row>

                  <div >
                    <div>
                      <div>
                        <PageHeader
                          className="site-page-header"
                          onBack={() => null}
                          title="Shopping"
                        >
                          <CardBox>
                          <h5>
                            Cart <span>({props.totalItems} items: PKR {props.total})</span>
                          </h5>
                          </CardBox>
                        </PageHeader>

                      </div>
                      <CardBox>
                        <h4>Order Summary</h4>
                        <div >
                          <div className="info-row">
                            <h5>Subtotal ({props.totalItems} items)</h5>
                            <p>PKR {props.total}</p>
                          </div>
                        </div>
                        <div className="order-total">
                          <h5>Estimated Order Total</h5>
                          <p>PKR {props.total}</p>
                        </div>
                        <div className="order-total">
                          <h5>Tax Applied</h5>
                          <p>{tax}%</p>
                        </div>
                        <div className="order-total">
                          <h5>Discount Applied</h5>
                          <p>{discount}%</p>
                        </div>
                        <div className="order-total">
                          <h5>Total payable bill</h5>
                          <p>PKR{total}</p>
                        </div>
                        <div className="checkout">
                            <button className="btn btn-checkout"
                              onClick={postSaleHandler}
                            >Confirm Sale</button>
                        </div>
                      </CardBox>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            : <div>
              <img className='CartImage' src={EmptyCart}/>
              <div><h1 className="message">Your have not selected any Item </h1></div>
            </div>}
        </div>
      </div>
    );
  }
;


const mapStateToProps = state => {
  return {
    cartItems: state.sale.addedItems,
    total: state.sale.total,
    totalItems: state.sale.totalItems
  }

}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, quantity) => {
      dispatch(addToCartQuantity(item, quantity))
    },
    decrement: (id) => {
      dispatch(decrement(id))
    },
    increment: (id) => {
      dispatch(increment(id))
    },
    remove: (id) => {
      dispatch(remove(id))
    }
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Sales);


