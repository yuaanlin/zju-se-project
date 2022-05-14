import SiderMenu from '../component/SiderMenu'
import { Form, Input, Button, Layout, DatePicker, TimePicker, Table, Space } from 'antd'
const { Content } = Layout
import { request } from '../../services'
import Avatar from "./avatar"
import Gender from "./gender"
import Addphase from "./schedule"
import AddSchedule from './schedule'

type patient_info = 
{   id                    : number
,   name                  : string
,   personaID             : number
,   gender                : string
,   phone                 : string
,   email                 : string
,   medical_insurance_id  : string
}

const patient : patient_info = 
{   id                    : 2333
,   name                  : "Name"
,   personaID             : 1234
,   gender                : "U"
,   phone                 : "12345678901"
,   email                 : "42@Q.com"
,   medical_insurance_id  : "5678"
}

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
}

const PatientInfo = ({info}:{info:patient_info})=>{
    const [form] = Form.useForm()
    const onFinish = (info:patient_info)=>
        console.log(info) // for Debug in Dev
        /* request( // for Production
        { method: 'PUT'
        , url:"/api/patient/info/updateInfo"
        , data:info
        })
        .then(()=>console.log("OK"))
        .catch(()=>alert("修改失败，检查网络"))
        */
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
    <Form.Item name="personaID" label="身份号码"><Input /></Form.Item>
    <Form.Item name="gender" label="性别"><Gender /></Form.Item>
    <Form.Item name="phone" label="电话号码"><Input /></Form.Item>
    <Form.Item name="email" label="邮件"><Input /></Form.Item>
    <Form.Item name="medical_insurance_id" label="医保ID"><Input /></Form.Item>
    <Button type="primary" htmlType="submit"> 修改 </Button>
    </Form>
    </Content>
    </>)
    }

type doctor_info = 
{   name                  : string
,   avater                : string
,   clinicID              : string 
,   gender                : string
,   title                 : string
,   phone                 : string
,   email                 : string
,   description           : string
,   visitTime             : []
}
const doctor : doctor_info = 
{   name                  : "甲乙丙"
,   avater                : "BASE64" // BASE64!!!
,   clinicID              : "11111"
,   gender                : "U"
,   title                 : "??"
,   phone                 : "12345678901"
,   email                 : "Doctor@Q.com"
,   description           : "XXXXX"
,   visitTime             : []
}

const DoctorInfo = ({info}:{info:doctor_info})=>{
    const [form] = Form.useForm()
    const onFinish = (info:patient_info)=>        
        console.log(info) // for Debug in Dev
        /* request( // for Production
        { method: 'PUT'
        , url:"/api/doctor/info/updateInfo"
        , data:info
        })
        .then(()=>console.log("OK"))
        .catch(()=>alert("修改失败，检查网络"))
        */
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
        <Form.Item name="visitTime" label="出诊时间" valuePropName="schedules"><AddSchedule /></Form.Item>
        <Button type="primary" htmlType="submit"> 修改 </Button>
        </Form>
        </Content>
        </>)
}

type admin_info = 
{   adminName             : string
,   phoneNumber           : string
,   emailAddress          : string
,   gender                : string
}

const admin : admin_info = 
{   adminName             : "Hmmm"
,   phoneNumber           : "123456788901"
,   emailAddress          : "admin@Q.com"
,   gender                : "U"
}

const AdminInfo = ({info}:{info:admin_info})=>{
    const [form] = Form.useForm()
    const onFinish = (info:patient_info)=>
        console.log(info) // for Debug in Dev
        /* request( // for Production
        { method: 'PUT'
        , url:"/api/admin/info/updateInfo"
        , data:info
        })
        .then(()=>console.log("OK"))
        .catch(()=>alert("修改失败，检查网络"))
        */

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
    <Form.Item name="adminName" label="名字"><Input /></Form.Item>
    <Form.Item name="phoneNumber" label="电话"><Input /></Form.Item>
    <Form.Item name="emailAddress" label="邮件"><Input /></Form.Item>
    <Form.Item name="gender" label="性别"><Gender /></Form.Item>
    <Button type="primary" htmlType="submit"> 修改 </Button>
    </Form>
    </Content>
    </>)
    }


/* As for get info
    const {payload:values} = await request<patient_info>({
            method: 'GET'
        ,   url: "/api/patient/info/getInfo"
        }) 
*/

const Demo = ()=>(
    
    // <PatientInfo info={patient}/>
    <DoctorInfo info={doctor}/>
    // <AdminInfo info={admin}/>
)

export default Demo