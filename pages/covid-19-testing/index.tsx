import SiderMenu from '../component/SiderMenu';
import { Layout, Input, Button, Radio, Space, notification, RadioChangeEvent } from 'antd';
import { Popover } from 'antd';
import AppointmentModal, { MODAL_STATUS } from '../component/AppointmentModal/index';
const { Content } = Layout;
import { useEffect, useState } from 'react';
import{getLatestCovidResultResponse,postCovidAppoitment,
  postCovidResult}from '../../services/covid/covidTest';


export default function Covid19TestingPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const handleButtonClick = ()=>{
    postCovidAppoitment().then(
      (response)=>{
        if ( response.errorCode == 200){
          alert("核酸注册成功！");
        }else{
          alert("核酸注册失败！");
        }
      }
    ).catch(()=>{
      alert("请检查网络！");
    })
  }

  const handleResultButtonClick = ()=>{

  }

  const onCreate = () => {
    setModalVisible(false);
  };

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
                  onClick={handleResultButtonClick}
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
        <AppointmentModal
            modalStatus={1}
            visible={false}
            consultationId={undefined}
            onCreate={onCreate}
            onCancel={()=>{setModalVisible(false);}}
          />
      </Content>
    </>
  );
}
