import { Table } from 'antd';

const day = [ "日", "一", "二", "三", "四", "五", "六" ]
const time = [ "下午", "上午" ]

type VisitType = {doctorID:number, visit_time:string, number_of_patients:number}
const Visit = ({value}:{value:VisitType[]}) => {
  console.log(value)
  const data = (value?.map(({doctorID, visit_time:t, number_of_patients}:VisitType)=>{
    return {
      id:doctorID,
      time:"星期"+day[Number(t[0])%7]+time[Number(t[1])%2],
      count:number_of_patients
    }
  }))
  const fixedColumns = [
    {
        title: '序号',
        dataIndex: 'id', 
    },
    {
        title: '出诊时间段',
        dataIndex: 'time',
    },
    {
        title: '人数',
        dataIndex: 'count'
    }
    ];
  return(<>
    <Table
      columns={fixedColumns}
      dataSource={data}
      pagination={false}
      rowKey='id'
      scroll={{y: 500 }}
    />
  </>) 
};

export default Visit;