import React, {useEffect,useState} from "react";
import {notification, Space} from 'antd';
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link,useHistory} from "react-router-dom";
import axios from "axios";

import * as authActions from "../appRedux/actions/Auth"
import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";


const SignIn = (props) => {
  const history = useHistory()
  const {isAuthenticated} = useSelector(({auth}) => auth);
  const dispatch = useDispatch()
  const [loading,setLoading]=useState()
  console.log(isAuthenticated)
  useEffect(()=>{
    isAuthenticated && history.push('/currentUser')
  },[])
  const onFinish = (values) => {
    setLoading(true)
    console.log(values)
    axios.post('users/api/auth/signin', values).then(success => {
      setLoading(false)
      console.log(success.data)
      dispatch(authActions.saveLoginData(success.data))
      history.push('/currentUser');
    }).catch(error => {
      setLoading(false)

      notification['error']({
        message: 'Login Failed',
        description:
        error.response.data.message,
      });
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              <img src="https://via.placeholder.com/272x395" alt='Neature'/>
            </div>
            <div className="gx-app-logo-wid">
              <h1><IntlMessages id="app.userAuth.signIn"/></h1>
              <p><IntlMessages id="app.userAuth.bySigning"/></p>
              <p><IntlMessages id="app.userAuth.getAccount"/></p>
            </div>
            <div className="gx-app-logo">
              <img alt="example" src="/assets/images/logo.png"/>
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">

              <Form.Item
                // initialValue="Sicario@gmail.com"
                rules={[{ required: true, message: 'The input is not valid E-mail!' }]} name="email">
                <Input placeholder="Email"/>
              </Form.Item>
              <Form.Item
                // initialValue="12345678"
                rules= {[{required: true, message: 'Please input your Password!'}]}  name="password">
                <Input type="password" placeholder="Password"/>
              </Form.Item>
              <Form.Item>
                <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>
                <span className="gx-signup-form-forgot gx-link"><IntlMessages
                  id="appModule.termAndCondition"/></span>
              </Form.Item>
              <Form.Item>
                <Button loading={loading} type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn"/>
                </Button>
                {/*<span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages*/}
                {/*id="app.userAuth.signUp"/></Link>*/}
              </Form.Item>
              <Form.Item>
            </Form.Item>
              <span
                className="gx-text-light gx-fs-sm"> demo user email: 'Sicario@gmail.com' and password: '12345678'</span>
            </Form>
          </div>
          <InfoView/>
        </div>
      </div>
    </div>
  );
};


export default SignIn;
