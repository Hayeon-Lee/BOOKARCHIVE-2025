import React from 'react';
import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';

interface MonthSelectorProps {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ value, onChange }) => {
  return (
    <DatePicker
      picker="month"
      value={value}
      onChange={(date) => date && onChange(date)}
      style={{ marginBottom: '15px', marginRight: '15px' }}
    />
  );
};

export default MonthSelector;
