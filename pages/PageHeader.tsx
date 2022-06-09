import { Button, Layout, Menu, Space } from 'antd';
// import '../styles/globals.css';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

import { createLogout } from '../services/utils/log';
import { useAuth } from './context';

const { Header } = Layout;

const PageHeader  = () =>{
  const router = useRouter();
  //  全局数据 login_done, 需要传递到子组件中
  //  子组件中如果登录成功, 直接修改该值, 不需要通过localstorage进行修改
  

  //  下面的函数需要传递到子组件

  // window.localStorage;

  // getCookieParser();

  // let storage = window.localStorage;
  
  //  全局数据 login_done, 需要传递到子组件中
  //  子组件中如果登录成功, 直接修改该值, 不需要通过localstorage进行修改
  // const [login_done, setLoginDone] = useState(false);

  // //  下面的函数需要传递到子组件
  // const setLogin = () => {
  //   setLoginDone(true);
  // }

  const authProps = useAuth();

  const handleButtonClick = () => {
    if ( localStorage.getItem("token") == null ) { //  登录/注册
      router.push("/login");
    }
    else{       //  退出
      //  统一成一个数据包, 对应的格式都相同
      
      createLogout(JSON.stringify( localStorage.getItem("identity") ) )
      .then((response)=>{

        if ( response.errorCode == 200) { //  成功
          // setLoginDone(false);
          authProps.setLogout();

          alert("退出成功！");
          localStorage.removeItem("identity");
          localStorage.removeItem("token");
          router.push("/");
        }
        else {  //  失败,
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
        { useAuth().login_done ? "退出" : "登录/注册" }

      </Button>
      {/* </Link> */}
      </Space>
      <Menu theme={'dark'} mode={'horizontal'} />
    </Header>
  )
}
 
  
export default PageHeader;
  