import React, { useState } from 'react';
import { TimePicker , Table} from 'antd';


const AddSchedule = (schedulelist) => {
  const [value, setValue] = useState(null);
  const onChange = time => {
    const newlist = [...schedulelist.value, time[0].toString()+" - "+time[1].toString()]
    schedulelist.onChange(newlist)
    setValue(time);
  };
  const fixedColumns = [
    {
        title: '序号',
        dataIndex: 'index',
        // fixed: true,    
    },
    {
        title: '出诊时间段',
        dataIndex: 'date',
        // fixed: true,    
    },
    ];
  const fixedData = []
  schedulelist.value.map((item,index) => {
      fixedData.push({index,
          date: item})
  })
  // console.log(fixedData)
  return(
    <div>
      <Table
        columns={fixedColumns}
        dataSource={fixedData}
        pagination={false}
        scroll={{y: 500 }}
      />
      <TimePicker.RangePicker value={value} onChange={onChange}/>
    </div>
  ) 
};

export default AddSchedule;