import SiderMenu from '../component/SiderMenu';
import { Layout } from 'antd';
const { Content } = Layout;
export default function AccountPage() {
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
          <h1>用户信息页面</h1>
          <p>
            在 <code>pages/account</code> 目录下添加 <code>.tsx</code> 文件，
            即可在这个模块的路由下添加需要的二级路由。
          </p>
        </div>
      </Content>
    </>
  );
}
