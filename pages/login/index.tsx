import SiderMenu from '../component/SiderMenu';
import { Layout, Input, Button, Radio, Space, notification, RadioChangeEvent } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import Axios from "axios";

const { Content } = Layout;




export default function LoginPage() {

  const testAccount = "Test"
  const testPassWord = "123" 

  function loginTest(){
    if(testAccount == account && testPassWord == password){
      setLoginDone(true);
      setLogInfo('');
      notification.open({
        message: 'Login Success',
        description:
          ''
      });
    }else{
      setLogInfo("用户名或密码错误")
    }
  }

  function login(){
    Axios.post('http://localhost:3001/login',{
        account: account,
        password: password
    }).then((response)=>{
        if(response.data == "SUCCESS"){
          setLoginDone(true);
          setLogInfo('');
        }
        else{
          setLogInfo(''+response.data);
        }
    });
  }

  function register(){
    Axios.post('http://localhost:3001/register', {
        account: account,
        password: password
    }).then((response)=>{
      notification.open({
        message: 'Register Result',
        description:
          ''+response.data
      });
    });
  }


  //  login_done?  
  //  sign in or sign up?
  // const loginState: { login_done: Boolean, signup: Boolean } = {
  //   login_done: false,
  //   signup: false
  // };

  const [login_done, setLoginDone] = useState(false);
  const [signup, setSignup] = useState(false);
  const [identity, setIdentity] = useState('');  //  doctor patient manager
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  
  //  whether to display the info of failing in sign in or sign up
  const [logInfo, setLogInfo] = useState('');
  // const [logInfoShow, setLogInfoShow] = useState('false');

  const handleSwitchClick = () => {
    setSignup(!signup);
    setAccount('');
    setPassword('');
    setIdentity('');
    setLogInfo('');
  };

  const handleAccountInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setAccount(e.target.value);
  }

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setPassword(e.target.value);
  }

  const handleIdentityChange = (e: RadioChangeEvent) =>{
    setIdentity(e.target.value);
  }

  const handleButtonClick = () =>{

    if(account != '' && password != ''){
      loginTest()
        //  数据请求 + 数据返回
        //  正确:   跳转到首页  setLoginDone(true); setloginfo('');
        //  错误:   显示错误信息 logInfo
    }
    else{
      setLogInfo("用户名或密码错误")
    }
    
    setPassword('');
    //  return  ( <Link href="/" /> )
    //  如何实现页面的跳转
  }

  if(login_done == false ){
    
  
    return (
      <>
        <SiderMenu />
        <Content
          className="site-layout-background"
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 480,
          }}
        >
          
          <Space direction="vertical" className='LoginWrapper'>
            <Space direction="horizontal">
              {/* <h2 style={{fontSize: 12}}>登录身份</h2> */}
              <Radio.Group 
                style={{ marginTop: 16 , marginLeft:300 }} 
                value={identity}
                onChange={handleIdentityChange}
              >
                <Radio.Button value="doctor">医生 Doctor</Radio.Button>
                <Radio.Button value="patient">患者 Patient</Radio.Button>
                <Radio.Button value="manager">管理员 Manager</Radio.Button>
              </Radio.Group>
            </Space>
            <Input 
              style={{marginLeft: 300, width: 344}}
              className='InputBox' 
              placeholder="Account" 
              value={account}
              onChange={handleAccountInputChange}
            />
            <Input.Password 
              style={{marginLeft: 300, width: 344}}
              className='InputBox'
              placeholder="Password"
              value={password}
              onChange={handlePasswordInputChange}
            />

            <h2 style={{fontSize: 12, color: "red"}}>
              {logInfo}
            </h2>
            <Link href="/">
              <Button
                style={{width: "220px", height: "34px", fontSize: 16, marginLeft:363}}
                // style={{width: "220px", height: "30px", lineHeight: "30px", color: 'white', background: "#3194d0", borderra-radius: "15px", margin: "10px auto", text-align: "center"}}
                type="primary"
                // className='ButtonBox'
                onClick={handleButtonClick}
              >
                {signup? "登录" : "注册"}
              </Button>
            </Link>

            
            <a
              style={{fontSize: 12, color: "blue", textDecorationColor: "blue", textDecoration: "underline", marginLeft: 420}}
              onClick={handleSwitchClick}
            >
              {signup ? "没有账户，点击注册" : "已有账户，点击登录"}
            </a>
            {/* <h2 style={{fontSize: 12, textDecoration: "underline"}}>已有账户，点击登录</h2> */}
          </Space>
          
          
        </Content>
        


        {/* <div>
          <h1>用户信息页面</h1>
          <p>
            在 <code>pages/account</code> 目录下添加 <code>.tsx</code> 文件，
            即可在这个模块的路由下添加需要的二级路由。
          </p>
        </div> */}
      </>
    );
  }
}
