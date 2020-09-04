import React from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import './user-select.scss';

const { Option } = Select;

const UserSelect = () => {
  return (
    <>
      <Select defaultValue="Student" style={{ width: 120 }}>
        <Option value="Mentor">Mentor</Option>
        <Option value="Student">Student</Option>
      </Select>
    </>
  );
};

export default UserSelect;
