import React, { useState } from 'react';
import { TimePicker } from 'antd';

const AddSchedule = () => {
  const [value, setValue] = useState(null);
  const onChange = time => {
    setValue(time);
  };

  return <TimePicker.RangePicker value={value} onChange={onChange} />;
};

export default AddSchedule;