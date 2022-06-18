import Avatar from './avatar';
import Gender from './gender';
import Visit from './visit';
import SiderMenu from '../component/SiderMenu';
import { Identity } from '../login/index';
import * as patient from '../../services/patient/info';
import * as doctor from '../../services/doctor/info';
import * as admin from '../../services/admin/info';
import { Form, Input, Button, Layout, message } from 'antd';
import { useEffect, useState } from 'react';

const { Content } = Layout;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};

const PatientInfo = ({ info }:{info:patient.Info})=>{
  const [form] = Form.useForm<patient.Info>();
  useEffect(()=>{ form.setFieldsValue(info); });

  const onFinish = async (info: patient.Info) => {
    try {
      await patient.updateInfo(info);
      message.success({ content: '修改成功！' });
    } catch (err) {
      console.error(err);
      message.error({ content: '发生错误！' });
    }
  };

  return (<>
    <SiderMenu />
    <Content
      className="site-layout-background"
      style={{
        background:'#fff',
        padding: 24,
        margin: 0,
        minHeight:480,
      }}
    >
      <Form
        {...layout}
        form={form}
        layout="horizontal"
        initialValues={info}
        onFinish={onFinish}
      >
        <Form.Item name="id" label="ID"><Input /></Form.Item>
        <Form.Item name="name" label="名字"><Input /></Form.Item>
        <Form.Item name="personalID" label="身份号码"><Input /></Form.Item>
        <Form.Item name="gender" label="性别"><Gender /></Form.Item>
        <Form.Item name="phone" label="电话号码"><Input /></Form.Item>
        <Form.Item name="email" label="邮件"><Input /></Form.Item>
        <Form.Item name="medical_insuranceID" label="医保ID"><Input /></Form.Item>
        <Button type="primary" htmlType="submit"> 修改 </Button>
      </Form>
    </Content>
  </>);
};

const DoctorInfo = ({ info }:{info:doctor.Info})=>{
  const [form] = Form.useForm<doctor.Info>();
  useEffect(()=>{ form.setFieldsValue(info); });

  const onFinish = async (info: doctor.Info) => {
    try {
      await doctor.updateInfo(info);
      message.success({ content: '修改成功！' });
    } catch (err) {
      console.error(err);
      message.error({ content: '发生错误！' });
    }
  };

  return (<>
    <SiderMenu />

    <Content
      className="site-layout-background"
      style={{
        background:'#fff',
        padding: 24,
        margin: 0,
        minHeight:480,
      }}
    >
      <Form
        {...layout}
        form={form}
        layout="horizontal"
        initialValues={info}
        onFinish={onFinish}
      >
        <Form.Item name="name" label="名字"><Input /></Form.Item>
        <Form.Item name="avatar" label="头像"><Avatar /></Form.Item>
        <Form.Item name="clinicID" label="科室"><Input /></Form.Item>
        <Form.Item name="gender" label="性别"><Gender /></Form.Item>
        <Form.Item name="title" label="职称"><Input /></Form.Item>
        <Form.Item name="phone" label="电话"><Input /></Form.Item>
        <Form.Item name="email" label="邮件"><Input /></Form.Item>
        <Form.Item name="description" label="描述"><Input /></Form.Item>
        <Visit value={info.visitTime} />
        <Button type="primary" htmlType="submit"> 修改 </Button>
      </Form>

    </Content>
  </>);
};

const AdminInfo = ({ info }:{info:admin.Info})=>{
  const [form] = Form.useForm<admin.Info>();
  useEffect(()=>{ form.setFieldsValue(info); });
  const onFinish = (info:admin.Info)=>
  {
    console.log('update', info);
    admin.updateInfo(info)
      .then(()=>console.log('done'))
      .catch(()=>console.log('fail'));
  };

  return (<>
    <SiderMenu />
    <Content
      className="site-layout-background"
      style={{
        background:'#fff',
        padding: 24,
        margin: 0,
        minHeight:480,
      }}
    >
      <Form
        {...layout}
        form={form}
        layout="horizontal"
        initialValues={info}
        onFinish={onFinish}
      >
        <Form.Item name="name" label="名字"><Input /></Form.Item>
        <Form.Item name="phone" label="电话"><Input /></Form.Item>
        <Form.Item name="email" label="邮件"><Input /></Form.Item>
        <Form.Item name="gender" label="性别"><Gender /></Form.Item>
        <Button type="primary" htmlType="submit"> 修改 </Button>
      </Form>
    </Content>
  </>);
};

const Info = ({ identity }:{identity:Identity})=>{
  const [info, setInfo] = useState<
        |patient.Info
        |doctor.Info
        |admin.Info
        >();

  useEffect(()=>{
    switch(identity)
    {
      case 'patient':
      {
        patient.getInfo()
          .catch(error=>{
            console.log(`patient info get ${error}`);
            console.log('patient info set default');
            const info : patient.Info =
                {
                  id                    : 2333
                  , name                  : 'Name'
                  , personaID             : 1234
                  , gender                : 'U'
                  , phone                 : '12345678901'
                  , email                 : '42@Q.com'
                  , medical_insuranceID   : '5678'
                };
            return info;
          })
          .then(setInfo);
        break;
      }
      case 'doctor':
      {
        doctor.getInfo()
          .catch(error=>{
            console.log(`doctor info get ${error}`);
            console.log('doctor info set default');
            const info : doctor.Info =
                {
                  name                  : '甲乙丙'
                  , avater                : 'BASE64' // BASE64!!!
                  , clinicID              : '11111'
                  , gender                : 'U'
                  , title                 : '??'
                  , phone                 : '12345678901'
                  , email                 : 'Doctor@Q.com'
                  , description           : 'XXXXX'
                  , visitTime             :
                    [
                      { doctorID: 1, visit_time: '71', number_of_patients: 12 },
                      { doctorID: 2, visit_time: '51', number_of_patients: 10 }
                    ]
                };
            return info;
          })
          .then(setInfo);

        break;
      }
      case 'admin':
      {
        admin.getInfo()
          .catch(error=>{
            console.log(`doctor info get ${error}`);
            console.log('doctor info set default');
            const info : admin.Info =
                {
                  name   : 'Hmmm'
                  , phone  : '123456788901'
                  , email  : 'admin@Q.com'
                  , gender : 'U'
                };
            return info;
          })
          .then(setInfo);
        break;
      }
      default: break;
    }
  }, [identity]);

  if(undefined==info) return <></>;

  switch(identity)
  {
    case 'patient': return <PatientInfo info={info as patient.Info}/>;
    case 'doctor': return <DoctorInfo info={info as doctor.Info}/>;
    case 'admin': return <AdminInfo info={info as admin.Info}/>;
    default: return <></>;
  }
};

export { Info };
export default ()=><></>;
