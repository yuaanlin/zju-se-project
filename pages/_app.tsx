import '../styles/globals.css';
import 'antd/dist/antd.css';
import { Button, Layout, Menu, Space } from 'antd';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import LoginPage from './login';
import { useRouter } from 'next/router';
import { request } from '../services';
import React, { useState } from 'react';
import { createLogout } from '../services/utils/log';
import { getCookieParser } from 'next/dist/server/api-utils';

const { Header, Footer } = Layout;

function MyApp({ Component, pageProps }: AppProps) {

  // window.localStorage;

  // getCookieParser();

  // let storage = window.localStorage;
  const router = useRouter();
  const [login_done, setLoginDone] = useState(false);

  const handleButtonClick = () => {

    //  存在问题？当登录之后，对应的identity会变化，但是该组件中的数据不会立刻变化
    setLoginDone(  JSON.stringify( localStorage.getItem("identity") ) === null );    
    // setAccount(e.target.value);
    //  登录 注册   路由跳转
    //  退出      
    // localStorage.setItem("login_done", "false");
    // console.log(localStorage);

    if (!login_done) { //  登录/注册
      router.push("/login");
      // console.log(storage);
    }
    else{       //  退出
      //  统一成一个数据包, 对应的格式都相同
      
      createLogout(JSON.stringify( localStorage.getItem("identity") ) )
      .then((response)=>{
        // console.log("OK")
        if ( response.errorCode == 200) { //  成功
          // setLoginDone(false);
          alert("退出成功！");
          localStorage.removeItem("identity");
          router.push("/");
        }
        else {  //  失败, 密码重设
          alert("退出失败！");
          alert(response.errorMsg);
        }

      })
      .catch(()=>{
        alert("退出失败，请检查网络！");
      });

    }
  }

  return (
    <Layout>
      <Header className={'header'}>
        <Space direction="horizontal">
          <div className={'logo'} >
            <Link href="/">
              <h1
                style={{ color:'#fff', cursor : 'pointer'}}
              >
                医用系统
              </h1>
            </Link>
          </div>
        {/* <Link href="/login"> */}
        <Button 
          onClick={handleButtonClick}
          style={{textAlign : 'center', float : 'right', height : 38, borderRadius: 19, fontSize : 16, marginLeft : 700}}
        >
          { login_done ? "退出" : "登录/注册" }
          {/* 登录/注册 */}
        </Button>
        {/* </Link> */}
        </Space>
        <Menu theme={'dark'} mode={'horizontal'} />
      </Header>
      <Layout
        style={{
          padding:'24px 24px',
          minHeight: 700
        }}>
        <Component {...pageProps} />
      </Layout>
      <Footer
        style={{ textAlign: 'center' }}
      >
        ZJU SE ©2022 Created by xxx
      </Footer>
    </Layout>
  );
}

export default MyApp;

