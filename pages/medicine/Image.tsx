import React, { useState } from 'react';
import { Image } from 'antd';

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Image
        preview={{ visible: false }}
        width={60}
        src="https://cdn1.iconfinder.com/data/icons/dental-line-smile-maker/512/Dental_medicine-512.png"
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Image src="https://img2.baidu.com/it/u=94383748,1731527575&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=450" />
          <Image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.hzyao.cn%2Fimages%2F201702%2Fsource_img%2F12598_G_1487377636487.jpg&refer=http%3A%2F%2Fwww.hzyao.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655003945&t=7774c20cd67e60c13bb57c85a9965a24" />
          <Image src="https://img2.baidu.com/it/u=1505552085,650845614&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" />
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default App;