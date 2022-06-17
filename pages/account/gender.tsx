import { Select } from 'antd';
const { Option } = Select;

const Gender = ({ value, onChange }:any)=>
  (<Select value={value} onChange={onChange} >
    <Option value="U">未知</Option>
    <Option value="M">男性</Option>
    <Option value="F">女性</Option>
    <Option value="N">非二元</Option>
  </Select>);

export default Gender;
