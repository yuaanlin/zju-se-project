import SiderMenu from '../component/SiderMenu';
import { Layout, Input, Button, Radio, Space, notification, RadioChangeEvent } from 'antd';
import { Popover } from 'antd';

const { Content } = Layout;




export default function Covid19TestingPage() {
  const handleButtonClick = ()=>{

  }

  const content1 = (
    <div>
      <Button
                  style={{width: "150px", height: "34px", fontSize: 16, marginLeft:10}}
                  // style={{width: "220px", height: "30px", lineHeight: "30px", color: 'white', background: "#3194d0", borderra-radius: "15px", margin: "10px auto", text-align: "center"}}
                  type="primary"
                  // className='ButtonBox'
                  onClick={handleButtonClick}
      >
        一键预约
      </Button>
      <p>        </p>
      <p>
      <Button
                  style={{width: "150px", height: "34px", fontSize: 16, marginLeft:10}}
                  // style={{width: "220px", height: "30px", lineHeight: "30px", color: 'white', background: "#3194d0", borderra-radius: "15px", margin: "10px auto", text-align: "center"}}
                  type="primary"
                  // className='ButtonBox'
                  onClick={handleButtonClick}
      >
        查看结果
      </Button>
      </p>
    </div>
  );
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
        <div>
          <h1>新冠检测平台</h1>
          <p>
          <Popover content={content1} title="操作选择">
            <Button type="primary">一键式核酸检测</Button>
          </Popover>
          </p>
        </div>
      </Content>
    </>
  );
}
