import { useAuth } from './_app';
import { createLogout } from '../services/utils/log';
import { useRouter } from 'next/router';
import 'antd/dist/antd.css';
import { Button, Layout, Menu, Space } from 'antd';
import { message } from 'antd';
import React from 'react';
import Link from 'next/link';

const { Header } = Layout;

const PageHeader = () =>{
  const router = useRouter();

  const authProps = useAuth();

  const handleButtonClick = () => {
    // if ( localStosrage.getItem("token") == null ) { //  登录/注册
    if (!authProps.login_done) { //  登录/注册
      router.push('/login');
    }
    else{ //  退出
      //  统一成一个数据包, 对应的格式都相同

      createLogout(String(localStorage.getItem('identity')))
        .then((response)=>{

          if (response.errorCode == 200) { //  成功
          // setLoginDone(false);
            authProps.setLogout();

            message.success('退出成功！');
            localStorage.removeItem('identity');
            localStorage.removeItem('token');
            router.push('/');
          }
          else { //  失败,
            message.error('退出失败！');
            message.error(response.errorMsg);
          }

        })
        .catch(()=>{
          message.error('退出失败，请检查网络！');
        });

    }
  };

  return (
    <Header className={'header'}>
      <div
        style={{
          display: 'flex', justifyContent: 'space-between',
          width: '100%', alignItems: 'center'
        }}>
        <div className={'logo'} >
          <Link href="/">
            <h1
              style={{ color:'#fff', cursor : 'pointer' }}
            >
              医用系统
            </h1>
          </Link>
        </div>
        <Button
          onClick={handleButtonClick}
          style={{
            textAlign : 'center', float : 'right',
            height : 38, borderRadius: 19, fontSize : 16
          }}
        >
          { authProps.login_done ? '退出' : '登录/注册' }
        </Button>
      </div>
      <Menu theme={'dark'} mode={'horizontal'} />
    </Header>
  );
};

export default PageHeader;
