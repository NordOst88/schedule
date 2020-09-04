import React from 'react';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import './user-switcher.scss';
import { CrownOutlined, UserOutlined } from '@ant-design/icons';

const UserSwitcher = () => {
  return (
    <>
      <Switch
        className="switch"
        checkedChildren={<CrownOutlined />}
        unCheckedChildren={<UserOutlined />}
      />
    </>
  );
};

export default UserSwitcher;
