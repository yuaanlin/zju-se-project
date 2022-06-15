import SiderMenu from '../component/SiderMenu';
import { Layout, Input, Button, Radio, Space, notification, RadioChangeEvent } from 'antd';
import { Popover } from 'antd';
import CovidModal,{ MODAL_STATUS } from'../component/CovidModal'
const { Content } = Layout;
import { useEffect, useState } from 'react';
import{getLatestCovidResultResponse,postCovidAppoitment,
  postCovidResult}from '../../services/covid/covidTest';


export default function Covid19TestingPage() {
  const [identity, setIdentity] = useState<string|null>('');
  const [modalStatus, setModalStatus] = useState(
    MODAL_STATUS.PATIENT_COVID_RESULT_VIEW
  );
  const [modalVisible, setModalVisible] = useState(false);
  const handleButtonClick = ()=>{
    postCovidAppoitment().then(
      (response)=>{
        //alert(response.errorCode+response.errorMsg);
        if ( response.errorCode == 200){
          alert("核酸预约成功！");
        }else{
          alert("核酸预约失败！");
        }
      }
    ).catch(()=>{
      alert("请检查网络！");
    })
  }

  const handleResultButtonClick = ()=>{
    getLatestCovidResultResponse().then(
      (response)=>{
        if ( response.errorCode == 200){
          alert("核酸查询成功！");
          //alert(response.errorCode+response.errorMsg);
          //alert(response.payload.report_time+' '+response.payload.state);
          setModalStatus(MODAL_STATUS.PATIENT_COVID_RESULT_VIEW);
          setModalVisible(true);
        }else{
          alert(response.errorCode + "无核酸记录！！");
        }
      }
    ).catch(()=>{
      alert("请检查网络！");
    }
    )
  }

  const handleAddButtonClick = ()=>{
          setModalStatus(MODAL_STATUS.DOCTOR_COVID_ADD_RESULT);
          setModalVisible(true);
  }

  const onCreate = () => {
    setModalVisible(false);
  };

  

  const content1 = (
    <div>
      {
        identity === 'patient' ?
        <Button
                  style={{width: "150px", height: "34px", fontSize: 16, marginLeft:10}}
                  // style={{width: "220px", height: "30px", lineHeight: "30px", color: 'white', background: "#3194d0", borderra-radius: "15px", margin: "10px auto", text-align: "center"}}
                  type="primary"
                  // className='ButtonBox'
                  onClick={handleButtonClick}
      >
        一键预约
      </Button>
        :
        <Button
                  style={{width: "150px", height: "34px", fontSize: 16, marginLeft:10}}
                  // style={{width: "220px", height: "30px", lineHeight: "30px", color: 'white', background: "#3194d0", borderra-radius: "15px", margin: "10px auto", text-align: "center"}}
                  type="primary"
                  // className='ButtonBox'
                  onClick={()=>{}}
      >
        当前用户不可预约
      </Button>
      }

      <p></p>
      <p>
      {
        identity === 'patient' ?
        <Button
        style={{width: "150px", height: "34px", fontSize: 16, marginLeft:10}}
        // style={{width: "220px", height: "30px", lineHeight: "30px", color: 'white', background: "#3194d0", borderra-radius: "15px", margin: "10px auto", text-align: "center"}}
        type="primary"
        // className='ButtonBox'
        onClick={handleResultButtonClick}
        >
          查看结果
        </Button>
        :null
      }
      {
        identity === 'doctor' ?
        <Button
        style={{width: "150px", height: "34px", fontSize: 16, marginLeft:10}}
        // style={{width: "220px", height: "30px", lineHeight: "30px", color: 'white', background: "#3194d0", borderra-radius: "15px", margin: "10px auto", text-align: "center"}}
        type="primary"
        // className='ButtonBox'
        onClick={handleAddButtonClick}
        >
          上传结果
        </Button>
        :null
      }
      
      </p>
    </div>
  );

  useEffect(() => {
    let i = localStorage.getItem('identity');
    setIdentity(i);
  }, []);

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
        <CovidModal
            modalStatus={modalStatus}
            visible={modalVisible}
            onCreate={onCreate}
            onCancel={()=>{setModalVisible(false);}}
          />
      </Content>
    </>
  );
}
