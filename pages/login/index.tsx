import SiderMenu from '../component/SiderMenu';
import { Layout, Input, Button, Radio, Space, RadioChangeEvent } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
const { Content } = Layout;

import md5 from "js-md5";
import { createLogin, createSignup } from '../../services/utils/log';

export default function LoginPage() {


  const [signup, setSignup] = useState(false);    //  true-sign up   false- sign in 
  const [identity, setIdentity] = useState('');   //  doctor patient manager
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  // localStorage

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


    if(account != '' && password != '' && identity != ''){

        if (signup) { //  注册, 医生/患者
          //  统一成一个数据包, 对应的格式都相同
          createLogin(account, md5(account+password), identity)
          .then((response)=>{
            // console.log("OK")
            if ( response.errorCode == 200) { //  成功
              // setLoginDone(true);
              setPassword('');
              setAccount('');
              alert("注册成功！");
              localStorage.setItem("identity", identity);
              router.push("/");
            }
            else {  //  失败, 密码重设
              setLogInfo(response.errorMsg);
              setPassword('');
            }

          })
          .catch(()=>{
            setPassword('');
            alert("登录失败，请检查网络！");
          })
        }


        else{         //  登录, 医生/患者/管理员
          
          //  统一成一个数据包, 对应的格式都相同
          createSignup(account, md5(account+password), identity)
          .then((response)=>{
            // console.log("OK")
            if ( response.errorCode == 200) { //  成功
              // setLoginDone(true);
              setPassword('');
              setAccount('');
              alert("登录成功！");
              localStorage.setItem("identity", identity);
              router.push("/");
            }
            else {  //  失败, 密码重设
              setLogInfo(response.errorMsg);
              setPassword('');
            }

          })
          .catch(()=>{
            setPassword('');
            alert("登录失败，请检查网络！");
          })
          
        }

    }

    else if (identity == ''){
      setLogInfo("请确定用户身份");
      setPassword('');
    }
    else if (account == ''){
      setLogInfo("请输入用户名");
      setPassword('');
    }
    else{
      setLogInfo("请输入密码");
      setPassword('');
    }

  }

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
              {
                signup ?
                <Radio.Group 
                  style={{ marginTop: 16 , marginLeft:300 }} 
                  value={identity}
                  onChange={handleIdentityChange}
                >
                  <Radio.Button style ={{width : 174, textAlign : "center"}} value="doctor">医生 Doctor</Radio.Button>
                  <Radio.Button style ={{width : 174, textAlign : "center"}} value="patient">患者 Patient</Radio.Button>
                </Radio.Group>
                :
                <Radio.Group 
                style={{ marginTop: 16 , marginLeft:300 }} 
                value={identity}
                onChange={handleIdentityChange}
              >
                <Radio.Button style ={{width : 108, textAlign : "center"}} value="doctor">医生 Doctor</Radio.Button>
                <Radio.Button style ={{width : 108, textAlign : "center"}} value="patient">患者 Patient</Radio.Button>
                <Radio.Button style ={{width : 132, textAlign : "center"}} value="admin">管理员 Manager</Radio.Button>
              </Radio.Group>
              }
              
            </Space>
            <Input 
              style={{marginLeft: 300, width: 348}}
              className='InputBox' 
              placeholder="Account" 
              value={account}
              onChange={handleAccountInputChange}
            />
            <Input.Password 
              style={{marginLeft: 300, width: 348}}
              className='InputBox'
              placeholder="Password"
              value={password}
              onChange={handlePasswordInputChange}
            />

            <h2 style={{fontSize: 12, color: "red", marginLeft: 420}}>
              {logInfo}
            </h2>

            <Button
              style={{width: "220px", height: "34px", fontSize: 16, marginLeft:363}}
              type="primary"
              onClick={handleButtonClick}
            >
              {signup? "注册" : "登录"}
            </Button>

            
            <a
              style={{fontSize: 12, color: "blue", textDecorationColor: "blue", textDecoration: "underline", marginLeft: 420}}
              onClick={handleSwitchClick}
            >
              {signup ? "已有账户，点击登录" : "没有账户，点击注册"}
            </a>
          </Space>
          
          
        </Content>
        
      </>
    );
}
