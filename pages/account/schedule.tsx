import React, { useState } from 'react';
import { TimePicker , Table} from 'antd';


const Schedule = ({schedules, onChange}) => {
  const onAdd = ([begin, end]) => {
    const new_schedule = begin.toString()+" - "+end.toString()
    onChange([...schedules, new_schedule])
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
  return(<>
    <Table
      columns={fixedColumns}
      dataSource={schedules
        .map((date, index)=>({index, date}))
      }
      pagination={false}
      scroll={{y: 500 }}
    />
    <TimePicker.RangePicker onChange={onAdd}/>
  </>) 
};

export default Schedule;