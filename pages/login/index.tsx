import SiderMenu from '../component/SiderMenu';
import { createLogin, createDoctorSignup, createPatientSignup } from '../../services/utils/log';
import { useAuth } from '../_app';
import { Layout, Input, Button, Radio, Space, RadioChangeEvent } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';

const { Content } = Layout;

type Identity = 'doctor' | 'patient' | 'admin' | string // string -> default
export type { Identity };

export default function LoginPage() {
  const [signup, setSignup] = useState(false); //  true-sign up   false- sign in

  const [identity, setIdentity] = useState<Identity>(''); //  doctor patient admin

  const [account, setAccount] = useState(''); //  id(需要先转化为string)
  const [password, setPassword] = useState(''); //  password

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [personalID, setPersonalID] = useState('');
  const [medicalInsuranceID, setMedicalInsuranceID] = useState('');

  const [clinicID, setClinicID] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();
  const [logInfo, setLogInfo] = useState('');

  const [signupIdentity, setSignupIdentity] = useState(false); //  doctorSignup
  //         true      //  patientSignup

  const authProps = useAuth();

  //  现在本组件是父组件, 需要把这个函数传递给子组件 <PageHeader>
  // const [login_done, setLoginDone] = useState(false);
  // const setLogout = () =>{
  //   setLoginDone(false);
  // }

  // localStorage

  //  whether to display the info of failing in sign in or sign up

  // const [logInfoShow, setLogInfoShow] = useState('false');

  const handleSwitchClick = () => {
    setSignup(!signup);

    setIdentity('');
    setAccount('');
    setPassword('');

    setName('');
    setGender('');
    setPhone('');
    setEmail('');

    setPersonalID('');
    setMedicalInsuranceID('');

    setClinicID('');
    setTitle('');
    setDescription('');

    setSignupIdentity(false); //  默认为病人登录
    setLogInfo('');
  };

  const handleAccountInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setAccount(e.target.value);
    //  如果存在非数字的ID需要警告
  };

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setName(e.target.value);
  };

  const handlePersonalIDInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setPersonalID(e.target.value);
  };

  const handlePhoneInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setPhone(e.target.value);
  };

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setPassword(e.target.value);
  };

  const handleMedicalInsuranceIDInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setMedicalInsuranceID(e.target.value);
  };

  const handleIdentityChange = (e: RadioChangeEvent) =>{

    if(signup){ //  注册
      if(identity == e.target.value){ //  相当于没有变换身份, 不需要改变渲染项

      }

      else{ //  清空一些内容, 该边选项
        if (e.target.value == 'patient') setSignupIdentity(false);
        else setSignupIdentity(true);

        setPersonalID('');
        setMedicalInsuranceID('');

        setClinicID('');
        setTitle('');
        setDescription('');
      }
    }
    setIdentity(e.target.value); // 修改
  };

  const handleGenderChange = (e: RadioChangeEvent) =>{
    setGender(e.target.value);
  };

  const handleClinicIDChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setClinicID(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setDescription(e.target.value);
  };

  const judgeString = (str : string) => {
    for (let i =0; i<str.length;i++){
      if (str.charAt(i) < '0' || str.charAt(i) > '9')
        return false;
    }
    return true;
  };

  const handleButtonClick = () =>{

    // authProps.setLogin();
    if (signup) { //  注册, 医生/患者

      if (!signupIdentity) { //  病人注册
        if(account != '' && password != '' && identity != '' && name != '' && personalID != '' && gender != '' && phone != '' && email != '' && medicalInsuranceID != ''){

          //  判断ID 能否转化为number
          if(judgeString(account)){ //  可以封装数据包
            createPatientSignup(Number(account), password, name, personalID, gender, phone, email, medicalInsuranceID)
              .then((response)=>{

                if (response.errorCode == 200) { //  成功

                  authProps.setLogin();
                  alert('注册成功！');
                  localStorage.setItem('identity', identity);
                  localStorage.setItem('token', response.payload.token);

                  setIdentity('');
                  setAccount('');
                  setPassword('');

                  setName('');
                  setGender('');
                  setPhone('');
                  setEmail('');

                  setPersonalID('');
                  setMedicalInsuranceID('');

                  setClinicID('');
                  setTitle('');
                  setDescription('');

                  setLogInfo('');
                  router.push('/');
                }

                else { //  失败, 密码重设
                  setLogInfo(response.errorMsg);
                  setPassword('');
                }

              })
              .catch(()=>{
                setPassword('');
                setLogInfo('');
                alert('注册失败，请检查网络！');
              });
          }
          else{
            setLogInfo('请重新设置ID, 仅允许数字');
            setPassword('');
            setAccount('');
          }
        }

        else if (identity == ''){
          setLogInfo('请选择注册身份');
          setPassword('');
        }
        else if (account == ''){
          setLogInfo('请输入用户ID');
          setPassword('');
        }
        else if (password == ''){
          setLogInfo('请输入密码');
          setPassword('');
        }
        else if (name == ''){
          setLogInfo('请输入用户姓名');
          setPassword('');
        }
        else if (gender == ''){
          setLogInfo('请选择性别');
          setPassword('');
        }
        else if (phone == ''){
          setLogInfo('请输入手机号');
          setPassword('');
        }
        else if (email == ''){
          setLogInfo('请输入个人邮箱');
          setPassword('');
        }
        else if (personalID == ''){
          setLogInfo('请输入个人ID');
          setPassword('');
        }
        else{
          setLogInfo('请输入医保序号');
          setPassword('');
        }
      }

      else { //  医生注册
        if(account != '' && password != '' && identity != '' && name != '' && clinicID != '' && gender != '' && phone != '' && email != '' && title != '' && description != ''){

          //  判断ID 能否转化为number
          if(judgeString(account)){ //  判断两个ID是否合法

            if (judgeString(clinicID)) { //  可以封装数据包
              // createSignup(Number(account), md5(account+password), identity,name,personalID,gender,phone,email,medicalInsuranceID)
              createDoctorSignup(Number(account), password, name, Number(clinicID), gender, title, phone, email, description)
                .then((response)=>{
                // console.log("OK")

                  if (response.errorCode == 200) { //  成功

                    authProps.setLogin();
                    alert('注册成功！');
                    localStorage.setItem('identity', identity);
                    localStorage.setItem('token', response.payload.token);

                    setIdentity('');
                    setAccount('');
                    setPassword('');

                    setName('');
                    setGender('');
                    setPhone('');
                    setEmail('');

                    setPersonalID('');
                    setMedicalInsuranceID('');

                    setClinicID('');
                    setTitle('');
                    setDescription('');

                    setLogInfo('');
                    router.push('/');
                  }

                  else { //  失败, 密码重设
                    setLogInfo(response.errorMsg);
                    setPassword('');
                  }

                })
                .catch(()=>{
                  setPassword('');
                  setLogInfo('');
                  alert('注册失败，请检查网络！');
                });
            }

            else{
              setLogInfo('请重新设置门诊序号, 仅允许数字');
              setPassword('');
              setClinicID('');
            }
          }
          else{
            setLogInfo('请重新设置ID, 仅允许数字');
            setPassword('');
            setAccount('');
          }
        }

        else if (identity == ''){
          setLogInfo('请选择注册身份');
          setPassword('');
        }
        else if (account == ''){
          setLogInfo('请输入用户ID');
          setPassword('');
        }
        else if (password == ''){
          setLogInfo('请输入密码');
          setPassword('');
        }
        else if (name == ''){
          setLogInfo('请输入用户姓名');
          setPassword('');
        }
        else if (gender == ''){
          setLogInfo('请选择性别');
          setPassword('');
        }
        else if (phone == ''){
          setLogInfo('请输入手机号');
          setPassword('');
        }
        else if (email == ''){
          setLogInfo('请输入个人邮箱');
          setPassword('');
        }
        else if (clinicID == ''){
          setLogInfo('请输入门诊序号');
          setPassword('');
        }
        else if (title == ''){
          setLogInfo('请输入职称');
          setPassword('');
        }
        else{
          setLogInfo('请输入简介');
          setPassword('');
        }
      }

    }

    else{ //  登录, 医生/患者/管理员
      if(account != '' && password != '' && identity != ''){
        if(judgeString(account)){ //  可以封装数据包

          //  统一成一个数据包, 对应的格式都相同
          // createLogin(Number(account), md5(account+password), identity)
          createLogin(Number(account), password, identity)
            .then((response)=>{
              if (response.errorCode == 200) { //  成功
                authProps.setLogin();
                // useAuth().login_done = true;
                alert('登录成功！');
                localStorage.setItem('identity', identity);
                localStorage.setItem('token', response.payload.token);
                setIdentity('');
                setAccount('');
                setPassword('');
                setLogInfo('');
                router.push('/');
              }

              else { //  失败, 密码重设
                setLogInfo(response.errorMsg);
                setPassword('');
              }

            })
            .catch(()=>{
              setPassword('');
              setLogInfo('');
              alert('登录失败，请检查网络！');
            });
        }
        else{
          setLogInfo('请输入设置ID, 仅允许数字');
          setPassword('');
          setAccount('');
        }
      }
      else if (identity == ''){
        setLogInfo('请确定登录身份');
        setPassword('');
      }
      else if (account == ''){
        setLogInfo('请输入用户ID');
        setPassword('');
      }
      else{
        setLogInfo('请输入密码');
        setPassword('');
      }
    }

    // console.log(authProps.login_done);

  };

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

        <Space direction="vertical" className="LoginWrapper">
          <Space direction="horizontal">
            {
              signup ?
                <Radio.Group
                  style={{ marginTop: 16, marginLeft:300 }}
                  value={identity}
                  onChange={handleIdentityChange}
                >
                  <Radio.Button style ={{ width : 174, textAlign : 'center' }} value="patient">患者 Patient</Radio.Button>
                  <Radio.Button style ={{ width : 174, textAlign : 'center' }} value="doctor">医生 Doctor</Radio.Button>
                </Radio.Group>
                :
                <Radio.Group
                  style={{ marginTop: 16, marginLeft:300 }}
                  value={identity}
                  onChange={handleIdentityChange}
                >
                  <Radio.Button style ={{ width : 108, textAlign : 'center' }} value="patient">患者 Patient</Radio.Button>
                  <Radio.Button style ={{ width : 108, textAlign : 'center' }} value="doctor">医生 Doctor</Radio.Button>
                  <Radio.Button style ={{ width : 132, textAlign : 'center' }} value="admin">管理员 Manager</Radio.Button>
                </Radio.Group>
            }
          </Space>
          <Input
            style={{ marginLeft: 300, width: 348 }}
            className="InputBox"
            placeholder="ID 仅支持数字 ID (Number Only)"
            value={account}
            onChange={handleAccountInputChange}
          />
          <Input.Password
            style={{ marginLeft: 300, width: 348 }}
            className="InputBox"
            placeholder="密码 Password"
            value={password}
            onChange={handlePasswordInputChange}
          />
          {/* {useAuth().login_done ? 1 : 2} */}
          {
            signup
              ? <Space direction="vertical">
                <Input
                  style={{ marginLeft: 300, width: 348 }}
                  className="InputBox"
                  placeholder="姓名 Name"
                  value={name}
                  onChange={handleNameInputChange}
                />
                <Space direction="horizontal">
                  <Radio.Group
                    style={{ marginLeft:300 }}
                    value={gender}
                    onChange={handleGenderChange}
                  >
                    <Radio.Button style ={{ width : 174, textAlign : 'center' }} value="M">男 Male</Radio.Button>
                    <Radio.Button style ={{ width : 174, textAlign : 'center' }} value="F">女 Female</Radio.Button>
                  </Radio.Group>
                </Space>
                <Input
                  style={{ marginLeft: 300, width: 348 }}
                  className="InputBox"
                  placeholder="手机 Phone"
                  value={phone}
                  onChange={handlePhoneInputChange}
                />
                <Input
                  style={{ marginLeft: 300, width: 348 }}
                  className="InputBox"
                  placeholder="邮箱 Email"
                  value={email}
                  onChange={handleEmailInputChange}
                />
                {
                  signupIdentity //  true    医生
                    ? <>
                      <Input
                        style={{ marginLeft: 300, width: 348 }}
                        className="InputBox"
                        placeholder="门诊序号 Clinic ID (Number Only)"
                        value={clinicID}
                        onChange={handleClinicIDChange}
                      />
                      <Input
                        style={{ marginLeft: 300, width: 348 }}
                        className="InputBox"
                        placeholder="职称 Title"
                        value={title}
                        onChange={handleTitleChange}
                      />
                      <Input
                        style={{ marginLeft: 300, width: 348 }}
                        className="InputBox"
                        placeholder="简介 Description"
                        value={description}
                        onChange={handleDescriptionChange}
                      />
                    </>

                    : //  false   病人

                    <>
                      <Input
                        style={{ marginLeft: 300, width: 348 }}
                        className="InputBox"
                        placeholder="个人ID Personal ID"
                        value={personalID}
                        onChange={handlePersonalIDInputChange}
                      />
                      <Input
                        style={{ marginLeft: 300, width: 348 }}
                        className="InputBox"
                        placeholder="医保序号 Medical Insurance ID"
                        value={medicalInsuranceID}
                        onChange={handleMedicalInsuranceIDInputChange}
                      />
                    </>
                }

              </Space>
              :
              null
          }

          <h2 style={{ fontSize: 12, color: 'red', marginLeft: 420 }}>
            {logInfo}
          </h2>

          <Button
            style={{ width: '220px', height: '34px', fontSize: 16, marginLeft:363 }}
            type="primary"
            onClick={handleButtonClick}
          >
            {signup? '注册' : '登录'}
          </Button>

          <a
            style={{ fontSize: 12, color: 'blue', textDecorationColor: 'blue', textDecoration: 'underline', marginLeft: 420 }}
            onClick={handleSwitchClick}
          >
            {signup ? '已有账户，点击登录' : '没有账户，点击注册'}
          </a>

        </Space>

      </Content>
    </>
  );
}
