import SiderMenu from '../component/SiderMenu';
import { Layout } from 'antd';
import { Popover, Button } from 'antd';

const { Content } = Layout;

const content1 = (
  <div>
    <p>where to place choice1</p>
    <p>where to place choice1</p>
  </div>
);

const content2 = (
  <div>
    <p>最近检测结果</p>
    <p>历史检测结果</p>
  </div>
);

export default function Covid19TestingPage() {
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
          <h1>一键式新冠检测平台</h1>
          <p>
          <Popover content={content1} title="预约选择">
            <Button type="primary">检测预约</Button>
          </Popover>
          <div>
            <Popover content={content2} title="历史记录">
              <Button type="primary">历史记录</Button>
            </Popover>
          </div>
          </p>
        </div>
      </Content>
    </>
  );
}
