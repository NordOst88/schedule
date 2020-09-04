import React from 'react';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import './button.scss';
import { CrownOutlined, UserOutlined } from '@ant-design/icons';

const Button = () => {
  return (
    <>
      <Switch
        className="admin_button"
        checkedChildren={<CrownOutlined />}
        unCheckedChildren={<UserOutlined />}
      />
    </>
  );
};

export default Button;
